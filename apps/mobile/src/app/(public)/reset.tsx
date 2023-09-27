import React, { useState } from "react";
import { Button, View } from "react-native";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import TextInput from "~/components/TextInput";

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(err.errors[0].message);
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={setEmailAddress}
            className="mb-4"
          />

          <Button
            onPress={onRequestReset}
            title="Send Reset Email"
            color={"#6c47ff"}
          ></Button>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Input code..."
              onChangeText={setCode}
              className="mb-4"
            />
            <TextInput
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="mb-4"
            />
          </View>
          <Button
            onPress={onReset}
            title="Set new Password"
            color={"#6c47ff"}
          ></Button>
        </>
      )}
    </View>
  );
};

export default PwReset;
