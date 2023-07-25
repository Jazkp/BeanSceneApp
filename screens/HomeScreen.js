import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Button } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";

export default function HomeScreen() {
  const navigation = useNavigation();

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  return (
    <View style={{ backgroundColor: "#f6e1c5", flex: 1 }}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text
          style={{ marginBottom: 100, fontSize: 20, textAlign: "center" }}
          theme={{ colors: { primary: "#212529" } }}
        >
          Bean Scene Ordering App {"\n"}
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Tables")}
          theme={{ colors: { primary: "#e6a756" } }}
          textColor="black"
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
    //backgroundColor: "#212529",
    //width: 400,
    color: "#212529",
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
