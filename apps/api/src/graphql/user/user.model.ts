import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GENDER } from '@prisma/client';

registerEnumType(GENDER, {
  name: 'GENDER',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => GENDER, { nullable: true })
  gender?: GENDER;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  createdAt?: Date;

  @Field({ nullable: true })
  deviceToken?: string;
}
