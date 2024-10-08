import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import { tokenHeader } from "@/shared/helpers/auth-header";

const Dashboard = () => {
  const router = useRouter();
  return (
    <View>
      <Text>statistics</Text>
      <TouchableOpacity
        onPress={() => {
          tokenHeader();
          router.dismissAll();
        }}
      >
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
