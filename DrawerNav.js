import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import FirstSlide from "./Screens/FirstSlide";
import Recent_Transactions from "./Drawer/Recent_Transactions";
import Damaged_Assets from "./Drawer/Damaged_Assets";
import Repaired_Assets from "./Drawer/Repaired_Assets";
import Damaged_Repaired_GRN from "./Drawer/Damaged-Repaired_GRN";
import Help_Support from "./Drawer/Help_Support";
import About from "./Drawer/About";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import logo from "./Screens/1280px-TVS_SCS_Logo-removebg-preview.png";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./Screens/header_common.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "./AsyncStorageKeys";
import Notifications from "./Drawer/Notification";

const Drawer = createDrawerNavigator();

export const DrawerNav = ({ route }) => {
  const navigation = useNavigation();
  const { menus } = useSelector((state) => state.mainReducer);

  const logout = async () => {
    await AsyncStorage.removeItem(AsyncStorageKeys.userData);
    navigation.replace("Login");
  };

  return (
    <Drawer.Navigator
      initialRouteName="TabHome"
      drawerContent={(props) => (
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
          <DrawerItem
            onPress={() => {
              logout();
            }}
            label={"Logout"}
            icon={() => {
              return (
                <Image
                  style={{
                    width: 29,
                    height: 25,
                    marginLeft: 1,
                  }}
                  source={require("./icons/account-logout.png")}
                ></Image>
              );
            }}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        options={({ navigation }) => ({
          header: () => {
            return (
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  >
                    <Ionicons
                      name={"ios-menu"}
                      size={25}
                      style={{ margin: 5 }}
                    />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      marginTop: 5,
                      marginRight: 30,
                    }}
                    source={logo}
                  ></Image>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return <Entypo name="home" size={30} color="#636363"></Entypo>;
          },
          drawerItemStyle: {
            display: menus.some((val) => val.menu_app_url == "home")
              ? `flex`
              : `none`,
          },
        })}
        name="Home"
        style={{ marginTop: 20, fontWeight: "600" }}
        component={FirstSlide}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Recent Transactions"
        component={Recent_Transactions}
        options={({ navigation }) => ({
          header: () => {
            return (
              <View style={{ backgroundColor: "#F9F9F8" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <TouchableOpacity
                    style={menustyles.menu}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <MaterialIcons name={"arrow-back-ios"} size={25} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 5,
                    }}
                    source={header}
                  ></Image>

                  <Text style={{ fontSize: 20, marginTop: 7 }}>
                    admin admin
                  </Text>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 4,
                }}
                source={require("./icons/tasks-solid.png")}
              ></Image>
            );
          },
          drawerItemStyle: {
            display: menus.some(
              (val) => val.menu_app_url == "recenttransaction"
            )
              ? `flex`
              : `none`,
          },
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Damaged Assets"
        component={Damaged_Assets}
        options={({ navigation }) => ({
          header: () => {
            return (
              <View style={{ backgroundColor: "#F9F9F8" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <TouchableOpacity
                    style={menustyles.menu}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <MaterialIcons name={"arrow-back-ios"} size={25} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 5,
                    }}
                    source={header}
                  ></Image>

                  <Text style={{ fontSize: 20, marginTop: 7 }}>
                    admin admin
                  </Text>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 4,
                }}
                source={require("./icons/broken-image.png")}
              ></Image>
            );
          },
          drawerItemStyle: {
            display: menus.some((val) => val.menu_app_url == "damagedassets")
              ? `flex`
              : `none`,
          },
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Repaired Assets"
        component={Repaired_Assets}
        options={({ navigation }) => ({
          header: () => {
            return (
              <View style={{ backgroundColor: "#F9F9F8" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <TouchableOpacity
                    style={menustyles.menu}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <MaterialIcons name={"arrow-back-ios"} size={25} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 5,
                    }}
                    source={header}
                  ></Image>

                  <Text style={{ fontSize: 20, marginTop: 7 }}>
                    admin admin
                  </Text>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 4,
                }}
                source={require("./icons/broken-image.png")}
              ></Image>
            );
          },
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Damaged / Repaired GRN"
        component={Damaged_Repaired_GRN}
        options={({ navigation }) => ({
          header: () => {
            return (
              <View style={{ backgroundColor: "#F9F9F8" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <TouchableOpacity
                    style={menustyles.menu}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <MaterialIcons name={"arrow-back-ios"} size={25} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 5,
                    }}
                    source={header}
                  ></Image>

                  <Text style={{ fontSize: 20, marginTop: 7 }}>
                    admin admin
                  </Text>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 4,
                }}
                source={require("./icons/broken-image.png")}
              ></Image>
            );
          },
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Help / Support"
        component={Help_Support}
        options={({ navigation }) => ({
          header: () => {
            return (
              <View style={{ backgroundColor: "#F9F9F8" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <TouchableOpacity
                    style={menustyles.menu}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <MaterialIcons name={"arrow-back-ios"} size={25} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 5,
                    }}
                    source={header}
                  ></Image>

                  <Text style={{ fontSize: 20, marginTop: 7 }}>
                    admin admin
                  </Text>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 4,
                }}
                source={require("./icons/information-filled.png")}
              ></Image>
            );
          },
          drawerItemStyle: {
            display: menus.some((val) => val.menu_app_url == "help-support")
              ? `flex`
              : `none`,
          },
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={({ navigation }) => ({
          header: () => {
            return (
              <View style={{ backgroundColor: "#F9F9F8" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <TouchableOpacity
                    style={menustyles.menu}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <MaterialIcons name={"arrow-back-ios"} size={25} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 5,
                    }}
                    source={header}
                  ></Image>

                  <Text style={{ fontSize: 20, marginTop: 7 }}>
                    admin admin
                  </Text>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return (
              <Ionicons
                name="notifications-sharp"
                size={30}
                color="#636363"
              ></Ionicons>
            );
          },
          drawerItemStyle: {
            display: menus.some((val) => val.menu_app_url == "notifications")
              ? `flex`
              : `none`,
          },
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="About"
        component={About}
        options={({ navigation }) => ({
          header: () => {
            return (
              <View style={{ backgroundColor: "#F9F9F8" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <TouchableOpacity
                    style={menustyles.menu}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <MaterialIcons name={"arrow-back-ios"} size={25} />
                  </TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 5,
                    }}
                    source={header}
                  ></Image>

                  <Text style={{ fontSize: 20, marginTop: 7 }}>
                    admin admin
                  </Text>
                </View>
              </View>
            );
          },
          drawerIcon: () => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 4,
                }}
                source={require("./icons/users-solid.png")}
              ></Image>
            );
          },
        })}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const menustyles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "900",
    borderWidth: 1,
    borderColor: "#AAAA9F",
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    backgroundColor: "white",
  },
  menu: {
    marginStart: 30,
    marginTop: 10,
  },
  Image: {
    width: 20,
    height: 20,
  },
});
