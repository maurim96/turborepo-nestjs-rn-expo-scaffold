import * as Sentry from "sentry-expo";
import { ActivityIndicator, View } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import env from "~/config/env";

const executionEnvironment: string =
  Constants.expoConfig?.ios?.bundleIdentifier ??
  Constants.expoConfig?.android?.package ??
  "";

Sentry.init({
  dsn: env.EXPO_PUBLIC_SENTRY_DNS,
  enableInExpoDevelopment: true,
  debug: executionEnvironment === "com.scaffold.app.dev" ? true : false,
  environment:
    executionEnvironment === "com.scaffold.app.dev"
      ? "development"
      : "production",
});

const App = () => {
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
