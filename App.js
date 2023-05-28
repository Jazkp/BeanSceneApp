import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuButton from "./components/MenuButton";
import {HomeScreen,TablesScreen,MenuScreen} from "./screens";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: { backgroundColor: "#20788d" } }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title:"Home",headerTitleStyle:{color:"white"},headerTintColor:"white", headerRight:() => <MenuButton /> }} />
          <Stack.Screen name="Tables" component={TablesScreen} options={{ title:"Table Selection",headerTitleStyle:{color:"white"},headerTintColor:"white" }} />    
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title:"Menu",headerTitleStyle:{color:"white"},headerTintColor:"white" }} />   
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}