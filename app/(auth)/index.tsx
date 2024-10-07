import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { btnStyle } from "@/shared/styledComponents/btnComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/store/store";
import { userSignup } from "@/shared/store/slices/user";
import TextInputComponent from "@/components/TextInputComponent";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState({} as any);

  const handleLogin = () => {
    dispatch(userSignup(user))?.then((thenData: any) => {
      router.push("/dashboard");
    });
  };

  const handleOnChange = (name: any, value: any) => {
    setUser({ ...user, [name]: value });
  };
  console.log(user);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInputComponent
        onChangeText={handleOnChange}
        placeholder="login"
        value={user.username}
        textContentType="emailAddress"
      ></TextInputComponent>
      <TextInputComponent
        onChangeText={handleOnChange}
        placeholder="password"
        value={user.password}
        textContentType="password"
      ></TextInputComponent>
      <TouchableOpacity style={btnStyle.loginBtn} onPress={handleLogin}>
        <Text style={btnStyle.loginText}>To DashBoard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
