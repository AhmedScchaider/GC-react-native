import { View, Text } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  return (
    <View>
      <TextInput></TextInput>
      <TextInput></TextInput>
      <TouchableOpacity>login</TouchableOpacity>
    </View>
  );
};

export default Login;
