import { useSignUp } from "@clerk/clerk-expo";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { Button, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Stack } from "expo-router";
import { OAuthButtons } from "~/components/OAuthButtons";
import TextInput from "~/components/TextInput";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Sentry.Native.captureException(err);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <View>
            <OAuthButtons />
          </View>
          <>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={setEmailAddress}
              className="mb-4"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="mb-4"
            />

            <Button
              onPress={onSignUpPress}
              title="Sign up"
              color={"#6c47ff"}
            ></Button>
          </>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
            />
          </View>
          <Button
            onPress={onPressVerify}
            title="Verify Email"
            color={"#6c47ff"}
          ></Button>
        </>
      )}
    </View>
  );
};

export default Register;