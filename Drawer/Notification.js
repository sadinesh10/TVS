import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

function Notifications() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#F9F9F8", flex: 1 }}>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "900" }}>Notifications</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Notifications are not avaiable</Text>
      </View>
      <StatusBar translucent={false} style="auto" backgroundColor="#F9F9F8" />
    </View>
  );
}

export default Notifications;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "900",
    paddingLeft: 4,
    paddingTop: 7,
  },
  container: {
    marginLeft: 10,
    marginTop: 20,
    orderWidth: 2,
    borderColor: "#AAAA9F",
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
