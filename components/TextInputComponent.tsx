import React from "react";
import { TextInput } from "react-native-gesture-handler";

const TextInputComponent = ({ value, onChangeText, name, ...props }: any) => (
  <TextInput
    value={value}
    onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
    {...props}
  />
);
export default TextInputComponent;
