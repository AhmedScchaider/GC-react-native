import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { btnStyle } from "@/shared/styledComponents/btnComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/store/store";
import { userLogin, userSignup } from "@/shared/store/slices/user";
import TextInputComponent from "@/components/TextInputComponent";
import { inputStyle } from "@/shared/styledComponents/inputComponent";
import { containerStyle } from "@/shared/styledComponents/containerComponent";
import { tokenHeader } from "@/shared/helpers/auth-header";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState({} as any);

  const handleLogin = () => {
    dispatch(userLogin(user))?.then((thenData: any) => {
      console.log(tokenHeader());
      router.push("/dashboard");
    });
  };

  const handleOnChange = (name: any, value: any) => {
    setUser({ ...user, [name]: value });
  };
  console.log(tokenHeader());
  return (
    <View style={containerStyle.authContainer}>
      <TextInputComponent
        onChangeText={handleOnChange}
        placeholder="login"
        value={user.username}
        style={inputStyle.authInput}
        name="username"
        textContentType="emailAddress"
      />
      <TextInputComponent
        onChangeText={handleOnChange}
        placeholder="password"
        name="password"
        value={user.password}
        style={inputStyle.authInput}
        textContentType="password"
      />
      <TouchableOpacity style={btnStyle.loginBtn} onPress={handleLogin}>
        <Text style={btnStyle.loginText}>To DashBoard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
