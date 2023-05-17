import { StyleSheet } from "react-native";
import Home from "./src/home";
import Chat from "./src/chat";
import ProfileScreen from "./src/profile";
import Regis from "./src/regis";
import History from "./src/history";
import NewsDetail from "./src/news";
import Login from "./src/login";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "react-native-vector-icons";
import { auth } from "./config";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Regis" component={Regis} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "#a6d0dd",
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign name="home" size={size} color={"#fff9de"} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign name="message1" size={size} color={"#fff9de"} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign name="user" size={size} color={"#fff9de"} />
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      {/* <StatusBar style="auto" /> */}
    </Tab.Navigator>
    // <View style={styles.container}>
    //   <Home />
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
