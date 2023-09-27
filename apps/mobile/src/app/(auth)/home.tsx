import React from "react";
import { Text, View } from "react-native";
import { useCurrentUserQuery } from "@scaffold/graphql-types/src/graphql";

const Home = () => {
  const { data } = useCurrentUserQuery({ fetchPolicy: "network-only" });

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Welcome, {data?.me.email} 🎉</Text>
    </View>
  );
};

export default Home;