import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useWamUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export function OAuthButtons() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWamUpBrowser();
  const { startOAuthFlow: startOAuthFlowGoogle } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startOAuthFlowApple } = useOAuth({
    strategy: "oauth_apple",
  });

  const onPress = React.useCallback(
    async (type: "google" | "apple") => {
      try {
        const { createdSessionId, setActive } =
          type === "google"
            ? await startOAuthFlowGoogle()
            : await startOAuthFlowApple();

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    },
    [startOAuthFlowGoogle, startOAuthFlowApple],
  );

  return (
    <>
      <TouchableOpacity className="mb-4" onPress={() => onPress("google")}>
        <Text>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mb-4" onPress={() => onPress("apple")}>
        <Text>Continue with Apple</Text>
      </TouchableOpacity>
    </>
  );
}