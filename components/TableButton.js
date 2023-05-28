import * as React from "react";
import { Button } from "react-native-paper";

export default function TableButton({ navigation, params }) {
  return (
    <Button
      icon="table-chair"
      mode="contained"
      contentStyle={{ flexDirection: "row-reverse" }}
      style={{ width: 100, margin: 4 }}
    ></Button>
  );
}
