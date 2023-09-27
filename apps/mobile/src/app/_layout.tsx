import { ApolloProvider } from "@apollo/client";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useMemo } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useValidateUserAndUpdateDeviceTokenMutation } from "@scaffold/graphql-types/src/graphql";
import { tokenCache } from "~/config/auth";
import env from "~/config/env";
import { getApolloClient } from "~/graphql/client";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [validateUserAndUpdateDeviceToken] =
    useValidateUserAndUpdateDeviceTokenMutation();

  const validateUser = async () => {
    //  TODO: fetch user real device token
    await validateUserAndUpdateDeviceToken({
      variables: { deviceToken: "test" },
    });

    const inTabsGroup = segments[0] === "(auth)";

    if (!inTabsGroup) {
      router.replace("/home");
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      void validateUser();
    } else if (!isSignedIn) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return <Slot />;
};

const ApolloInitialization = () => {
  const { getToken } = useAuth();
  const client = useMemo(() => getApolloClient(getToken), [getToken]);

  return (
    <ApolloProvider client={client}>
      <InitialLayout />
    </ApolloProvider>
  );
};

export default function Layout() {
  return (
    <ClerkProvider
      publishableKey={env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ApolloInitialization />
    </ClerkProvider>
  );
}
