import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import header from "./header_common.png";
import right from "./vehicle_right.png";
import left from "./vehicle_left.png";
import logo from "./1280px-TVS_SCS_Logo-removebg-preview.png";

const FirstSlide = ({ navigation, route }) => {
  return (
    <View width="100%" height="100%" style={{ backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginEnd: 35,
          marginVertical: 15,
        }}
      >
        <TouchableOpacity style={styles.menu}>
          <Ionicons name={"ios-menu"} size={30} />
        </TouchableOpacity>
        <Image style={{ width: 50, height: 50 }} source={logo}></Image>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image style={styles.Image} source={header}></Image>
        <Text style={styles.adminText}>admin admin</Text>
      </View>
      <View
        style={{ flex: 2, justifyContent: "flex-start", alignItems: "center" }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SecondSlide");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "#AAAA9F",
                flexDirection: "row",
                marginBottom: 10,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  paddingTop: 23,
                  paddingLeft: 15,
                  paddingRight: 30,
                  paddingBottom: 23,
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                Dispatch
              </Text>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 15,
                  marginLeft: 5,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                source={right}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Recieve_DC_First")
          }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "#AAAA9F",
                flexDirection: "row",

                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  paddingTop: 23,
                  paddingLeft: 15,
                  paddingRight: 37,
                  paddingBottom: 23,
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                Recieve
              </Text>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 15,
                  marginLeft: 5,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                source={left}
              ></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar translucent={false} style="auto" backgroundColor="white" />
    </View>
  );
};

export default FirstSlide;

const styles = StyleSheet.create({
  text: {},
  adminText: {
    fontWeight: "900",
    fontSize: 20,
    alignSelf: "center",
  },
  Image: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  menu: {
    marginStart: 20,
  },
});
