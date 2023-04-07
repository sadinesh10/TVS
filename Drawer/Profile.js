// import React from "react";
// import {
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { JumpingTransition } from "react-native-reanimated";
// import { useSelector } from "react-redux";
// import MyRecipes from "./MyRecipes.png";
// import profile from "./profile.png";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorageKeys from "../AsyncStorageKeys";
// import { useNavigation } from "@react-navigation/native";
// import { ScrollView } from "react-native-gesture-handler";

// export default function Profile({}) {
//   const navigation = useNavigation();

//   const logout = async () => {
//     await AsyncStorage.removeItem(AsyncStorageKeys.userData);
//     navigation.replace("Login");
//   };
//   const { userData, recipes } = useSelector((state) => state.mainReducer);
//   return (
//     <View>
//       <View style={{ backgroundColor: "#c7b5b3" }} width="100%" height="50%">
//         <Text style={styles.heading}>Profile</Text>
//         <View
//           style={{
//             flexDirection: "row",
//             <View style={{ backgroundColor: "#c7b5b3" }} width="100%" height="50%">
//             justifyContent: "space-between",
//             margin: 10,
//             marginRight: 20,
//             marginLeft: 20,
//           }}
//         >
//           <Text style={{ fontSize: 20 }}>Photo</Text>
//           <Image
//             style={styles.image}
//             source={{ uri: userData.image_uri }}
//           ></Image>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             margin: 10,
//             marginRight: 20,
//             marginLeft: 20,
//           }}
//         >
//           <Text style={{ fontSize: 20 }}>UserName</Text>
//           <Text style={{ fontSize: 20 }}>{userData.name}</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             margin: 10,
//             marginRight: 20,
//             marginLeft: 20,
//           }}
//         >
//           <Text style={{ fontSize: 20 }}>Gender</Text>
//           <Text style={{ fontSize: 20 }}>{userData.gender}</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             margin: 10,
//             marginRight: 20,
//             marginLeft: 20,
//           }}
//         >
//           <Text style={{ fontSize: 20 }}>Contact</Text>
//           <Text style={{ fontSize: 20 }}>{userData.phone_number}</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             margin: 10,
//             marginRight: 20,
//             marginLeft: 20,
//           }}
//         >
//           <Text style={{ fontSize: 20 }}>Email</Text>
//           <Text style={{ fontSize: 20 }}>{userData.email}</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             margin: 10,
//             marginRight: 20,
//             marginLeft: 20,
//           }}
//         >
//           <Text style={{ fontSize: 20 }}>Coins</Text>
//           <View style={{ flexDirection: "row" }}>
//             <Text style={{ fontSize: 20, paddingRight: 7 }}>
//               {userData.coins}
//             </Text>
//             <FontAwesome5 name="coins" size={23} color="orange"></FontAwesome5>
//           </View>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "flex-end",
//             justifyContent: "flex-end",
//             paddingRight: 40,
//             marginVertical: 50,
//           }}
//         >
//           <Text style={{ fontSize: 35, fontWeight: "bold" }}>LogOut</Text>
//           <TouchableOpacity
//             onPress={() => {
//               logout();
//             }}
//             style={{
//               padding: 5,
//               backgroundColor: "#f2e3e1",
//               borderRadius: 100,
//             }}
//           >
//             <MaterialIcons
//               style={{ paddingLeft: 3 }}
//               name={"logout"}
//               size={35}
//               color="grey"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={{ backgroundColor: "white" }} width="100%" height="0%">

//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   heading: {
//     fontWeight: "bold",
//     fontSize: 40,
//     padding: 20,
//   },
//   image: {
//     width: 55,
//     height: 55,
//     borderRadius: 100,
//   },
// });
