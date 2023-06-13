import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { getRestaurantTables } from "../services/apiCalls";

export default function TablesScreen() {
  //navigation
  const navigation = useNavigation();
  //state
  const [tables, setTables] = useState([]);
  //hooks
  useEffect(() => {
    (async () => setTables(await getRestaurantTables()))();
  }, []);

  //JSX
  const tableButton = (t) => {
    return (
      <Button
        textColor="black"
        buttonColor="#e6a756"
        mode="contained"
        icon="table-chair"
        contentStyle={{ flexDirection: "row-reverse" }}
        style={{ width: 100, margin: 4 }}
        key={t}
        onPress={() => navigation.navigate("Menu", { table: t })}
      >
        {t}
      </Button>
    );
  };

  return (
    <View style={{ backgroundColor: "#f6e1c5", flex: 1 }}>
      <View style={styles.container}>
        <Text variant="headlineSmall" style={{ color: "black" }}>
          Select the table
        </Text>
      </View>
      <View
        style={{
          margin: 1,
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {tables.map(tableButton)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: "#fff",
    //width: 400,
    //margin: 20,
    //padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
