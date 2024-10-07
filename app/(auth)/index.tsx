import { View, Text } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput></TextInput>
      <TextInput></TextInput>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 12,
          borderRadius: 12,
        }}
        onPress={() => {
          router.push("/dashboard/");
        }}
      >
        <Text style={{ color: "white" }}>To DashBoard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
