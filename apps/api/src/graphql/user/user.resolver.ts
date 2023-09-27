import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(ClerkAuthGuard)
  async me(@Context() context): Promise<User> {
    try {
      const userId = context.req.user.id;

      const user = await this.userService.findOne(userId);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`Internal server error ${error}`);
    }
  }

  @Mutation(() => User)
  @UseGuards(ClerkAuthGuard)
  async validateUserAndUpdateDeviceToken(
    @Args('deviceToken') deviceToken: string,
    @Context() context,
  ): Promise<User> {
    try {
      const userId = context.req.user.id;
      const email = context.req.user.email;

      const user = await this.userService.validateUserAndUpdateDeviceToken({
        email,
        userId,
        deviceToken: deviceToken,
      });

      if (!user) {
        throw new Error('Error validating user');
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`Internal server error ${error}`);
    }
  }
}
