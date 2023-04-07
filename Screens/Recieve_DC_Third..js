import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import left from "./vehicle_left.png";
import right from "./vehicle_right.png";
import numberPlate from "./AB12.png";
import calendar from "./date-solid.png";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const array = [
  "S.No",
  "PE Category",
  "HSN Number",
  "Qauntity",
  "Rate",
  "Weight(KG)",
];
const array1 = ["1", "FMC-MBA", "73102990", "2", "35000", "210.00"];
const array2 = ["Total", "2", "30000", "210.00"];
const array3 = [
  "S.No",
  "Assert Number",
  "Quantity",
  "Reference 1",
  "reference 2",
];
const array4 = ["1", "FMC-MB400002", "8"];

function Recieve_DC_Third({navigation}) {
  return (
    <ScrollView
      width="100%"
      height="100%"
      style={{ backgroundColor: "#F9F9F8" }}
    >
      <StatusBar translucent={false} style="auto" backgroundColor="white" />
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            navigation.navigate("Recieve_DC_Second");
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
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            marginTop: 28,
            marginLeft: 15,
          }}
        >
          Good Recieve Notes
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "#AAAA9F",
            backgroundColor: "white",
            margin: 20,
            paddingBottom: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}
            >
              <Image
                style={{
                  width: 35,
                  height: 35,
                  marginTop: 19,
                  marginLeft: 3,
                }}
                source={right}
              ></Image>
              <View style={{ marginTop: 5, marginLeft: 7, marginRight: 20 }}>
                <Text style={{ fontWeight: "400", color: "#1b2b99" }}>
                  From
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "800" }}>
                  HYDERABAD
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row", paddingRight: 35 }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  marginTop: 19,
                  marginHorizontal: 10,
                }}
                source={left}
              ></Image>
              <View style={{ marginTop: 5 }}>
                <Text style={{ fontWeight: "400", color: "#1b2b99" }}>To</Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "800", paddingRight: 30 }}
                >
                  VISAKHAPATNAM
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 13,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    marginLeft: 10,
                  }}
                  source={calendar}
                ></Image>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontWeight: "400", color: "#1b2b99" }}>
                    OC Date
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "800" }}>
                    2023-03-31
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          scrollEventThrottle={16}
          horizontal={true}
          style={{
            marginHorizontal: 15,
          }}
        >
          <View style={{ justifyContent: "space-evenly" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#243a70",
                borderTopRightRadius:10,
                borderTopLeftRadius:10,
              }}
            >
              {array.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingLeft: 30,
                      paddingRight: 30,
                      paddingTop: 5,
                      paddingBottom: 5,
                      flex: 1,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "300" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {array1.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,

                      paddingLeft: 40,
                      paddingRight: 37,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ fontWeight: "300", textAlign: "left" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {array1.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,

                      paddingLeft: 40,
                      paddingRight: 37,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ fontWeight: "300", textAlign: "left" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#243a72",
                marginLeft: 250,
                borderBottomRightRadius:10
              }}
            >
              {array2.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingLeft: 40,
                      paddingRight: 37,
                      paddingTop: 5,
                      paddingBottom: 5,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "300",
                        textAlign: "left",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={{}}>
          <View
            style={{
              marginTop: 30,
              marginLeft: 15,
              marginBottom: 0,
              marginRight: 15,
              borderWidth: 1,
              borderColor: "#AAAA9F",
              backgroundColor: "white",
              borderRadius: 8,
              paddingBottom: 100,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <TextInput placeholder="Remarks (Optional"></TextInput>
          </View>
          <View>
            <Pressable
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 10,
                backgroundColor: "#243a70",
                marginTop: 35,
                margin: 20,
              }}
              onPress={() => {
                navigation.navigate("Recieve_DC_Fourth");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 21,
                  fontWeight: "bold",
                  letterSpacing: 0.25,
                  color: "white",
                }}
              >
                Generate
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
}

export default Recieve_DC_Third;

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
