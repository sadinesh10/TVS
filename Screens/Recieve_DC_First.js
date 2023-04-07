import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  LogBox,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import pen from "./edit-solid-1.png";
import qr from "./qr-code.png";
import header from "./header_common.png";
import success from "./success-standard-solid.png";


function Recieve_DC_First({navigation}) {
  return (
    <View width="100%" height="100%" style={{ backgroundColor: "#F9F9F8" }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            navigation.navigate("FirstSlide");
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

        <Text style={{ fontSize: 20, marginTop: 7 }}>admin admin</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
        <TouchableOpacity onPress={() => {
              navigation.navigate("Recieve_DC_Second");
            }}
        >
          <View
            style={{
              borderWidth: 1,
              borderRadius: 15,
              borderColor: "#AAAA9F",
              flexDirection: "row",
              marginBottom:10,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                paddingTop: 21,
                paddingLeft: 15,
                paddingRight: 30,
                paddingBottom: 23,
                fontSize: 20,
                fontWeight: "800",
              }}
            >
              With DC Number
            </Text>
            <Image
              style={{
                width: 30,
                height: 30,
                marginRight: 15,
                marginLeft: 5,
                marginTop: 22,
                marginBottom: 20,
              }}
              source={success}
            ></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{
            navigation.navigate("Recieve_DC_Second")
          }}
        >
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
                paddingLeft: 20,
                paddingRight: 53,
                paddingBottom: 23,
                fontSize: 20,
                fontWeight: "800",
              }}
            >
              Scan QR Code
            </Text>
            <Image
              style={{
                width: 25,
                height: 25,
                marginRight: 15,
                marginLeft: 1,
                marginTop: 23,
                marginBottom: 20,
              }}
              source={qr}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>

      <StatusBar translucent={false} style="auto" backgroundColor="white" />
    </View>
    )
}

export default Recieve_DC_First

const styles = StyleSheet.create({
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
  