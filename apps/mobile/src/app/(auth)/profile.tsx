import { useState } from "react";
import { Button, Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import TextInput from "~/components/TextInput";

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  return (
    <View className="flex-1 justify-center p-10">
      <Text className="text-center">
        Good morning {user?.firstName} {user?.lastName}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        className="my-4"
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Button
        onPress={onSaveUser}
        title="Update account"
        color={"#6c47ff"}
      ></Button>
    </View>
  );
};

export default Profile;
