const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
    name: IS_DEV ? "scaffold Dev" : "scaffold",
    slug:  "scaffold-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "scaffold",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: IS_DEV ? 'com.scaffold.app.dev' : 'com.scaffold.app',
      supportsTablet: true
    },
    android: {
      package: IS_DEV ? 'com.scaffold.app.dev' : 'com.scaffold.app',
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true
    },
    plugins: ["expo-router", "sentry-expo"],
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "nolte-io",
            project: "scaffold-app"
          }
        }
      ]
    },
    extra: {
      eas: {
        projectId: "a88d48b7-320d-4238-8b52-71cc231131ca"
      }
    },
    updates: {
      url: "https://u.expo.dev/a88d48b7-320d-4238-8b52-71cc231131ca"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    owner: "nolte-io"
}
