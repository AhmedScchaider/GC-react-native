import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const router = useRouter();
  return (
    <View>
      <Text>statistics</Text>
      <TouchableOpacity
        onPress={() => {
          router.dismissAll();
        }}
      >
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
