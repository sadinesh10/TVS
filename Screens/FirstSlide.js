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
      <View style={{marginBottom:130, marginTop: 15}}>
        <Image style={styles.Image} source={header}></Image>
        <Text style={styles.adminText}>admin admin</Text>
      </View>
      <View
        style={{ flex: 5, alignItems: "center" }}
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 15,
                  marginVertical: 8,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Dispatch
              </Text>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginHorizontal:10,
                  marginVertical: 5,
                  resizeMode:"stretch"
                }}
                source={right}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Recieve_DC_First");
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 20,
                  marginVertical: 10,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Recieve
              </Text>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginHorizontal:10,
                  marginLeft:10,
                  resizeMode:"stretch",
                  marginVertical: 5,
                }}
                source={left}
              ></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar translucent={false} style="auto" backgroundColor="#f5f5f5" />
    </View>
  );
};

export default FirstSlide;

const styles = StyleSheet.create({
  adminText: {
    fontWeight: "700",
    fontSize: 18,
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
