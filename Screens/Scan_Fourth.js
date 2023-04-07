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
const array1 = ["1", "FMC-MBA", "73102990", "2", "15000", "210.00"];
const array2 = ["Total", "2", "30000", "210.00"];
const array3 = [
  "S.No",
  "Assert Number",
  "Quantity",
  "Reference 1",
  "reference 2",
];
const array4 = ["1", "FMC-MB400002", "8"];
function Scan_Fourth({ navigation }) {
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
            navigation.navigate("Scan_Third");
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
            fontWeight: "900",
            marginTop: 10,
            marginLeft: 15,
          }}
        >
          Delivery Challan
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "#AAAA9F",
            backgroundColor: "white",
            margin: 15,
            paddingBottom: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", paddingHorizontal: 5 }}
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
                  Braken India Private Limited Sitarganj
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
                <Text style={{ fontSize: 15, fontWeight: "800" }}>MBA</Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", paddingHorizontal: 5 }}
              >
                <Image
                  style={{
                    width: 35,
                    height: 17,
                    marginTop: 19,
                    marginLeft: 3,
                  }}
                  source={numberPlate}
                ></Image>
                <View style={{ marginTop: 5, marginLeft: 7, marginRight: 25 }}>
                  <Text style={{ fontWeight: "400", color: "#1b2b99" }}>
                    Vechile No.
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "800" }}>
                    AP 39 3939
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row", paddingRight: 35 }}>
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
                    <Text
                      style={{ fontWeight: "300", alignSelf: "flex-start" }}
                    >
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
              }}
            >
              {array2.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingLeft: 38,
                      paddingRight: 40,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "300",
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
        <ScrollView
          scrollEventThrottle={16}
          horizontal={true}
          style={{
            marginTop: 30,
            marginHorizontal: 15,
          }}
        >
          <View>
            <View style={{ justifyContent: "space-evenly" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#243a70",
                }}
              >
                {array3.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        paddingLeft: 30,
                        paddingRight: 25,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "300" }}>
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ justifyContent: "space-evenly" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {array4.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        paddingLeft: 25,
                        paddingRight: 25,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "300" }}>{item}</Text>
                    </View>
                  );
                })}
                <TextInput
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    paddingHorizontal: 40,
                    borderRadius: 10,
                  }}
                ></TextInput>
                <TextInput
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 40,
                    borderRadius: 10,
                  }}
                ></TextInput>
              </View>
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {array4.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        paddingLeft: 25,
                        paddingRight: 25,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "300" }}>{item}</Text>
                    </View>
                  );
                })}
                <TextInput
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    paddingHorizontal: 40,
                    borderRadius: 10,
                  }}
                ></TextInput>
                <TextInput
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 40,
                    borderRadius: 10,
                  }}
                ></TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ margin: 15 }}>
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#AAAA9F",
                borderRadius: 8,
                backgroundColor: "white",
                padding: 6,
              }}
            >
              <Text style={{ alignSelf: "center", fontWeight: "300" }}>
                Select Eway Bill / Customer Invoice (Optional)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: 15,
            marginBottom: 15,
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
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 10,
            backgroundColor: "#243a70",
            margin: 12,
          }}
          onPress={() => {
            navigation.navigate("Scan_Fifth");
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
    </ScrollView>
  );
}

export default Scan_Fourth;

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
