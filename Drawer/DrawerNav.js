// import { createDrawerNavigator } from "@react-navigation/drawer";
// import FirstSlide from "../Screens/FirstSlide";
// import Damaged_Assets from "./Damaged_Assets";
// import Recent_Transactions from "./Recent_Transactions";
// import Repaired_Assets from "./Repaired_Assets";
// import Damaged_Repaired_GRN from "./Damaged-Repaired_GRN";
// import Help_Support from "./Help_Support";
// import Notifications from "../Screens/Notifications";
// import About from "./About";
// import { useNavigation } from "@react-navigation/native";
// import { Image, TouchableOpacity, View } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { StatusBar } from "expo-status-bar";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import AsyncStorageKeys from "../AsyncStorageKeys";

// const Drawer = createDrawerNavigator();

// export const DrawerNav = ({ route }) => {
//   const navigation = useNavigation();

//   const AsyncStorage = useAsyncStorage();

//   const Logout = async () => {
//     await AsyncStorage.removeItem(AsyncStorageKeys.userData);
//     navigation.replace("Login");
//   };

//   return (
//     <Drawer.Navigator initialRouteName="TabHome">
//       <Drawer.Screen
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View
//                 style={{
//                   paddingLeft: 10,
//                   paddingRight: 10,
//                   paddingTop: 5,
//                   paddingBottom: 5,
//                   backgroundColor: "#f5f5f5",
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 5,
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => {
//                       navigation.toggleDrawer();
//                     }}
//                   >
//                     <Ionicons
//                       name={"ios-menu"}
//                       size={25}
//                       style={{ margin: 5 }}
//                     />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 45,
//                       height: 45,
//                       marginTop: 5,
//                       marginRight: 30,
//                     }}
//                     source={logo}
//                   ></Image>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return <Entypo name="home" size={30} color="#636363"></Entypo>;
//           },
//         })}
//         name="Home"
//         style={{ marginTop: 20, fontWeight: "600" }}
//         component={FirstSlide}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Recent Transactions"
//         component={Recent_Transactions}
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View style={{ backgroundColor: "#F9F9F8" }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 10,
//                     backgroundColor: "#F9F9F8",
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={menustyles.menu}
//                     onPress={() => {
//                       navigation.navigate("Home");
//                     }}
//                   >
//                     <MaterialIcons name={"arrow-back-ios"} size={25} />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 20,
//                       height: 20,
//                       marginTop: 13,
//                       marginLeft: 18,
//                       marginRight: 5,
//                     }}
//                     source={header}
//                   ></Image>

//                   <Text style={{ fontSize: 20, marginTop: 7 }}>
//                     admin admin
//                   </Text>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return (
//               <Image
//                 style={{
//                   width: 25,
//                   height: 25,
//                   marginLeft: 4,
//                 }}
//                 source={require("./icons/tasks-solid.png")}
//               ></Image>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Damaged Assets"
//         component={Damaged_Assets}
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View style={{ backgroundColor: "#F9F9F8" }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 10,
//                     backgroundColor: "#F9F9F8",
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={menustyles.menu}
//                     onPress={() => {
//                       navigation.navigate("Home");
//                     }}
//                   >
//                     <MaterialIcons name={"arrow-back-ios"} size={25} />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 20,
//                       height: 20,
//                       marginTop: 13,
//                       marginLeft: 18,
//                       marginRight: 5,
//                     }}
//                     source={header}
//                   ></Image>

//                   <Text style={{ fontSize: 20, marginTop: 7 }}>
//                     admin admin
//                   </Text>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return (
//               <Image
//                 style={{
//                   width: 25,
//                   height: 25,
//                   marginLeft: 4,
//                 }}
//                 source={require("./icons/broken-image.png")}
//               ></Image>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Repaired Assets"
//         component={Repaired_Assets}
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View style={{ backgroundColor: "#F9F9F8" }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 10,
//                     backgroundColor: "#F9F9F8",
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={menustyles.menu}
//                     onPress={() => {
//                       navigation.navigate("Home");
//                     }}
//                   >
//                     <MaterialIcons name={"arrow-back-ios"} size={25} />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 20,
//                       height: 20,
//                       marginTop: 13,
//                       marginLeft: 18,
//                       marginRight: 5,
//                     }}
//                     source={header}
//                   ></Image>

//                   <Text style={{ fontSize: 20, marginTop: 7 }}>
//                     admin admin
//                   </Text>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return (
//               <Image
//                 style={{
//                   width: 25,
//                   height: 25,
//                   marginLeft: 4,
//                 }}
//                 source={require("./icons/broken-image.png")}
//               ></Image>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Damaged / Repaired GRN"
//         component={Damaged_Repaired_GRN}
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View style={{ backgroundColor: "#F9F9F8" }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 10,
//                     backgroundColor: "#F9F9F8",
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={menustyles.menu}
//                     onPress={() => {
//                       navigation.navigate("Home");
//                     }}
//                   >
//                     <MaterialIcons name={"arrow-back-ios"} size={25} />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 20,
//                       height: 20,
//                       marginTop: 13,
//                       marginLeft: 18,
//                       marginRight: 5,
//                     }}
//                     source={header}
//                   ></Image>

//                   <Text style={{ fontSize: 20, marginTop: 7 }}>
//                     admin admin
//                   </Text>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return (
//               <Image
//                 style={{
//                   width: 25,
//                   height: 25,
//                   marginLeft: 4,
//                 }}
//                 source={require("./icons/broken-image.png")}
//               ></Image>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Help / Support"
//         component={Help_Support}
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View style={{ backgroundColor: "#F9F9F8" }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 10,
//                     backgroundColor: "#F9F9F8",
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={menustyles.menu}
//                     onPress={() => {
//                       navigation.navigate("Home");
//                     }}
//                   >
//                     <MaterialIcons name={"arrow-back-ios"} size={25} />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 20,
//                       height: 20,
//                       marginTop: 13,
//                       marginLeft: 18,
//                       marginRight: 5,
//                     }}
//                     source={header}
//                   ></Image>

//                   <Text style={{ fontSize: 20, marginTop: 7 }}>
//                     admin admin
//                   </Text>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return (
//               <Image
//                 style={{
//                   width: 25,
//                   height: 25,
//                   marginLeft: 4,
//                 }}
//                 source={require("./icons/information-filled.png")}
//               ></Image>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Notifications"
//         component={Notifications}
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View style={{ backgroundColor: "#F9F9F8" }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 10,
//                     backgroundColor: "#F9F9F8",
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={menustyles.menu}
//                     onPress={() => {
//                       navigation.navigate("Home");
//                     }}
//                   >
//                     <MaterialIcons name={"arrow-back-ios"} size={25} />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 20,
//                       height: 20,
//                       marginTop: 13,
//                       marginLeft: 18,
//                       marginRight: 5,
//                     }}
//                     source={header}
//                   ></Image>

//                   <Text style={{ fontSize: 20, marginTop: 7 }}>
//                     admin admin
//                   </Text>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return (
//               <Ionicons
//                 name="notifications-sharp"
//                 size={30}
//                 color="#636363"
//               ></Ionicons>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="About"
//         component={About}
//         options={({ navigation }) => ({
//           header: () => {
//             return (
//               <View style={{ backgroundColor: "#F9F9F8" }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginTop: 10,
//                     backgroundColor: "#F9F9F8",
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={menustyles.menu}
//                     onPress={() => {
//                       navigation.navigate("Home");
//                     }}
//                   >
//                     <MaterialIcons name={"arrow-back-ios"} size={25} />
//                   </TouchableOpacity>
//                   <Image
//                     style={{
//                       width: 20,
//                       height: 20,
//                       marginTop: 13,
//                       marginLeft: 18,
//                       marginRight: 5,
//                     }}
//                     source={header}
//                   ></Image>

//                   <Text style={{ fontSize: 20, marginTop: 7 }}>
//                     admin admin
//                   </Text>
//                 </View>
//               </View>
//             );
//           },
//           drawerIcon: () => {
//             return (
//               <Image
//                 style={{
//                   width: 25,
//                   height: 25,
//                   marginLeft: 4,
//                 }}
//                 source={require("./icons/users-solid.png")}
//               ></Image>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Logout"
//         component={Logout}
//         options={() => ({
//           drawerIcon: () => {
//             return (
//               <Image
//                 style={{
//                   width: 29,
//                   height: 26,
//                   marginLeft: 1,
//                 }}
//                 source={require("./icons/account-logout.png")}
//               ></Image>
//             );
//           },
//         })}
//       ></Drawer.Screen>
//     </Drawer.Navigator>
//   );
// };
