import { Pressable } from "react-native";
import { Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable onPress={doLogout} className="mr-2">
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
