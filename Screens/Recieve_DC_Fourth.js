import React from "react";
import { StatusBar } from "expo-status-bar";

import { Image, Text, TouchableOpacity, View } from "react-native";
import success from "./success-standard-solid.png";
import cross from "./cancel.png";

function Recieve_DC_Fourth({ navigation }) {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#243a72" }}>
      <View
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderRadius: 10,
          paddingTop: 15,
          paddingBottom: 30,
          marginVertical: "80%",
          marginHorizontal: "27%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.pop(3);
          }}
        >
          <Image
            style={{
              alignSelf: "flex-end",
              width: 13,
              height: 13,
              paddingBottom: 10,
              marginRight: 13,
            }}
            source={cross}
          ></Image>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={success}
          ></Image>
          <Text style={{ paddingTop: 35, fontWeight: "800" }}>
            GRN Generated
          </Text>
        </View>
      </View>
      <StatusBar translucent={false} style="auto" backgroundColor="#243a72" />
    </View>
  );
}

export default Recieve_DC_Fourth;
