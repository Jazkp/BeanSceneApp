import * as React from "react";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native";
import TableSelection from "../screens/TablesScreen";

export default function MenuButton() {
  return (
    <Button
      icon="login-variant"
      textColor="white"
      mode="text"
      onPress={() => alert("Test")}
      //contentStyle={innerWidth}
    ></Button>
  );
}
