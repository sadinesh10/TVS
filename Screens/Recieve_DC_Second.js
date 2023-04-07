import React, { useState } from "react";
import { FlatList, Modal, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import left from "./vehicle_left.png";
import right from "./vehicle_right.png";
import group from "./Group 2296.png";
import { TextInput } from "react-native-gesture-handler";
import phone from "./call.png";
import cross from "./cancel.png";
import { AntDesign } from "react-native-vector-icons";
import calendar from "./date-solid.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";



function Recieve_DC_Second({ navigation }) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState("Select from");
  const [select1, setSelect1] = useState("Select here");
  const [select2, setSelect2] = useState("Select here");
  const [text, settext] = useState("YYYY/MM/DD HH:MM");

  const [to, setTo] = useState("Select to");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, time) => {
    settext(
      date.getFullYear() +
        "/" +
        date.getMonth() +
        "/" +
        date.getDate() +
        "  " +
        date.getHours() +
        ":" +
        date.getMinutes()
    );
    hideDatePicker();
  };

  const array = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Vadodara	",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Visakhapatnam",
    "Chandigarh",
    "Ranchi",
    "Vijayawada	",
    "Raipur",
    "Gurgaon",
    "Bhubaneswar",
    "Bhiwandi",
    "Jamshedpur	",
    "Nellore",
    "Srikakulam",
    "Vizainagaram",
  ];
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
            navigation.navigate("Recieve_DC_First");
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
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View
          style={{
            marginLeft: 10,
            marginTop: 25,
            marginRight: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#AAAA9F",
            borderRadius: 15,
            backgroundColor: "white",
            padding: 16,
          }}
        >
          <Text style={styles.text}>Receive</Text>
          <View>
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 20,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 80,
                  paddingTop: 3,
                  paddingBottom: 16,
                  paddingLeft: 10,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 12,
                    alignSelf: "flex-start",
                  }}
                  source={require("./Group 2296.png")}
                ></Image>
                <View style={{ paddingLeft: 14 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    DC Number
                  </Text>
                  <TextInput
                    style={{ fontSize: 16 }}
                    placeholder="ex: 1234567890"
                  ></TextInput>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:30, marginLeft:10,}}>
              <AntDesign name="rightcircle" size={40} color="#243a72"></AntDesign>
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
            >
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  marginRight: 5,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 10,
                  paddingTop: 3,
                  paddingBottom: 14,
                  paddingLeft: 6,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 39,
                    height: 35,
                    marginTop: 13,
                    alignSelf: "flex-start",
                  }}
                  source={right}
                ></Image>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    From
                  </Text>
                  <Text style={{ fontSize: 18 }}>{from}</Text>
                </View>
              </View>
              <Modal visible={open}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setOpen(false);
                    }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: 11,
                        alignSelf: "flex-end",
                        marginTop: 20,
                        marginRight: 30,
                      }}
                      source={cross}
                    ></Image>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 12,
                      marginStart: 15,
                      marginRight: 15,
                      marginTop: 20,
                      marginBottom: 20,
                      paddingTop: 1,
                      paddingLeft: 20,
                      paddingRight: 10,
                      paddingBottom: 15,
                      borderColor: "#AAAA9F",
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: "400" }}>
                      From
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      {select1}
                    </Text>
                  </View>
                  <FlatList
                    data={array}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setFrom(item.toUpperCase());
                            setSelect1(item.toUpperCase());
                          }}
                        >
                          <View style={{ marginLeft: 15, paddingBottom: 20 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "500",
                                color: "#1b2b99",
                              }}
                            >
                              {item.toUpperCase()}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  ></FlatList>
                </View>
              </Modal>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
            >
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  marginRight: 5,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 14,
                  paddingTop: 3,
                  paddingBottom: 14,
                  paddingLeft: 6,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 39,
                    height: 35,
                    marginTop: 13,
                    alignSelf: "flex-start",
                  }}
                  source={left}
                ></Image>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    To
                  </Text>
                  <Text style={{ fontSize: 18 }}>{to}</Text>
                </View>
              </View>
              <Modal visible={open}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setOpen(false);
                    }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: 11,
                        alignSelf: "flex-end",
                        marginTop: 20,
                        marginRight: 30,
                      }}
                      source={cross}
                    ></Image>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 12,
                      marginStart: 15,
                      marginRight: 15,
                      marginTop: 20,
                      marginBottom: 20,
                      paddingTop: 1,
                      paddingLeft: 20,
                      paddingRight: 10,
                      paddingBottom: 15,
                      borderColor: "#AAAA9F",
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: "400" }}>
                      From
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      {select2}
                    </Text>
                  </View>
                  <FlatList
                    data={array}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setTo(item.toUpperCase());
                            setSelect2(item.toUpperCase());
                          }}
                        >
                          <View style={{ marginLeft: 15, paddingBottom: 20 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "500",
                                color: "#1b2b99",
                              }}
                            >
                              {item.toUpperCase()}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  ></FlatList>
                </View>
              </Modal>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
            >
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  marginRight: 5,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 14,
                  paddingTop: 3,
                  paddingBottom: 14,
                  paddingLeft: 14,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 11,
                    alignSelf: "flex-start",
                  }}
                  source={calendar}
                ></Image>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    Date Time
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity>
                      
                      <Text style={{ fontSize: 18 }}>{text}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <StatusBar translucent={false} style="auto" backgroundColor="white" />
        </View>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 10,
            backgroundColor: "#243a70",
            margin: 20,
          }}
          onPress={() => {
            navigation.navigate("Recieve_DC_Third");
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
            Proceed
          </Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default Recieve_DC_Second;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "900",
    paddingLeft: 4,
    paddingTop: 2,
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
