import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import type { GetToken } from "@clerk/types";
import env from "~/config/env";

const httpLink = new HttpLink({
  uri: `${env.EXPO_PUBLIC_API_URL}/graphql`,
});

const createAuthLink = (getToken: GetToken) =>
  setContext(async (_, { headers }) => {
    try {
      const token = await getToken({ template: "regular-jwt" });
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
          ...headers,
          ...(token && { authorization: `Bearer ${token}` }),
        },
      };
    } catch (error) {
      console.log(error);
    }
  });

export const getApolloClient = (getToken: GetToken) => {
  const authLink = createAuthLink(getToken);

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};