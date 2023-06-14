import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { postOrder } from "../services/apiCalls";

export default function ConfirmationScreen() {
  //navigation
  const navigation = useNavigation();
  const route = useRoute();

  // hooks

  const [totalOrder, setTotalOrder] = useState(route?.params?.totalOrder);
  const [table, setTable] = useState(route?.params?.table);
  const [currentSelection, setCurrentSelection] = useState(
    route?.params?.currentSelection
  );

  //functions
  let finalPrice = 0;
  let priceTotalOne = 0;
  let priceTotalTwo = 0;
  let text = "";

  function displayText() {
    currentSelection.forEach((p) => {
      text += `${p.item.name} x ${p.qty} - $${p.item.prices * p.qty} \n`;
    });
  }

  function totalPrice() {
    currentSelection.forEach((element) => {
      if (element.qty > 1) {
        priceTotalOne = priceTotalOne + element.item.prices * element.qty;
      } else {
        priceTotalTwo = Number(priceTotalTwo) + Number(element.item.prices);
      }
    });
    return (finalPrice = Number(priceTotalOne) + Number(priceTotalTwo));
  }

  totalPrice();

  return (
    <View style={{ backgroundColor: "#f6e1c5", flex: 1, padding: 40 }}>
      <View>
        <Text variant="titleMedium" style={{ color: "black" }}>
          The order has been confirmed for table {table} {"\n"}
        </Text>
        <Text variant="titleMedium" style={{ color: "black" }}>
          Items selected:
          {"\n"}
          {displayText()}
          {text}
          {"\n"}
          Total: ${finalPrice}
        </Text>
      </View>
      <Button
        textColor="black"
        buttonColor="#e6a756"
        onPress={() => {
          postOrder(table, currentSelection, finalPrice);
          navigation.navigate("Home");
        }}
        mode="contained"
      >
        Send to Kitchen
      </Button>
    </View>
  );
}
