import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{}}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={{ marginBottom: 100, fontSize: 20 }}>
          This is the Bean Scene Ordering App!
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Tables")}
        >
          Start Order
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: "#fff",
    //width: 400,
    margin: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

const theme = {
  colors: {
    main: "#20788d",
    complementary: "#ffdb99",
    analogous: "#208d6b",
    complementary2: "#8d3420",
  },
};

// colors:
// main: #20788d
// complementary: #FFDB99
// analogous: #208d6b
// complementary 2: #8d3420
