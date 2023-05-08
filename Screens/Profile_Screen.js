import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

function Profile_Screen() {
  const { userData } = useSelector((state) => state.mainReducer);
  //console.log(userData);
  const navigation = useNavigation();
  return (
    <View>
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
      <Text
        style={{
          fontSize: 22,
          fontWeight: "900",
          marginTop: 20,
          marginLeft: 20,
          marginBottom: 10,
        }}
      >
        Profile
      </Text>

      <View width="100%" height="100%">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 2,
          }}
        >
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "800" }}>
            Full Name
          </Text>
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "300" }}>
            {userData.first_name} {userData.last_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 2,
          }}
        >
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "800" }}>
            Phone Number
          </Text>
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "300" }}>
            {userData.phone_number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 2,
          }}
        >
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "800" }}>
            Email
          </Text>
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "300" }}>
            {userData.email}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 2,
          }}
        >
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "800" }}>
            address
          </Text>
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "300" }}>
            {userData.address},{userData.address_line_1},
            {userData.address_line_2},{userData.address_line_3},{userData.city},
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 5,
          }}
        >
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "800" }}>
            App Version
          </Text>
          <Text style={{ width: "50%", fontSize: 16, fontWeight: "300" }}>
            2.3.3
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Profile_Screen;

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
