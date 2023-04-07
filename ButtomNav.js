import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "react-native-vector-icons";
import DrawerNav from "./Drawer/DrawerNav";
import Profile from "./Drawer/Profile";

const Tab = createBottomTabNavigator();
export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNav}
        options={{
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
