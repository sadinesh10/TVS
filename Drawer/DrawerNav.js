import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "./Settings";
import Profile from "./Profile";
import Message from "./Message";
import Moments from "./Moments";
import HomeScreen from "../Home";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const logout = async (navigation) => {
    await AsyncStorage.removeItem(AsyncStorageKeys.userData);
    navigation.replace("Login");
  };
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: () => {
          return (
            <View
              style={{
                paddingLeft:10,
                paddingRight:10,
                paddingTop:5,
                paddingBottom:5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                >
                  <Ionicons
                    name={"ios-menu"}
                    size={35}
                    style={{ paddingRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                food2fork
              </Text>

              <TouchableOpacity
                onPress={() => {
                  logout(navigation);
                }}
              >
                <MaterialIcons name={"logout"} size={26} />
              </TouchableOpacity>
            </View>
          );
        },
      })}
      initialRouteName="TabHome"
    >
      <Drawer.Screen
        name="TabHome"
        options={{
          drawerLabel: "Home"
        }}
        component={HomeScreen}
      ></Drawer.Screen>
      <Drawer.Screen name="Messages" component={Message}></Drawer.Screen>
      <Drawer.Screen name="Moments" component={Moments}></Drawer.Screen>
      <Drawer.Screen name="Settings" component={Settings}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNav;
