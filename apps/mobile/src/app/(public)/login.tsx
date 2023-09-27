import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Link } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { OAuthButtons } from "~/components/OAuthButtons";
import TextInput from "~/components/TextInput";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Spinner visible={loading} />

      <View>
        <OAuthButtons />
      </View>

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

      <Button onPress={onSignInPress} title="Login" color={"#6c47ff"}></Button>

      <Link href="/reset" asChild>
        <Pressable className="items-center m-2">
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable className="items-center m-2">
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;
