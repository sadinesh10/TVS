import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import list from "./list.png";
import calendar from "./date-solid.png";
import cross from "./cancel.png";
import tick from "./success-standard-solid.png";
import { DateTimePicker, DateTimePickerAndroid } from "@react-native-community/datetimepicker";

function Scan_First({navigation}) {
  const [project, setProject] = useState("Select Project");
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("Select Here");
  const [text, settext] = useState("YYYY/MM?DD");
  const [time, setTime] = useState("00:00");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "android");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getDate();
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    settext(fDate);
    setTime(fTime);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const array = [
    "Optima Construction",
    "Outdoor Building Concepts",
    "Pepper Construction Group",
    "Pomping services limited",
    "Prestige Luxury Condo Development",
    "ProBlue Resources",
    "Proof Contractors",
    "Proterre Contractors",
    "RediNex Resources",
    "Regency Construction",
    "Remarkable Remodelling",
    "Rennova Construction",
    "Renovate Construction",
    "Revoxon General Contractors",
    "Rivers Edge Construction",
    "Ecologic Concrete",
    "Epic Real Designs",
    "Evergreen Homes",
    "Magic Hammer",
    "Mamais Construction",
    "Modern Muse Builders",
    "Monarch Design Industries",
    "Monumental Construction",
    "Pinnacle Builders",
    "Pizzarotti LLC",
    "Plaza Construction",
    "Reef Construction",
    "Reuse Bricks Technology",
    "Rhino Construction",
    "Rock Foundation",
    "Royal Concrete Construction",
    "Trends Company",
    "Tribe Builders & Construction",
  ];
  return (
    <View width="100%" height="100%" style={{ backgroundColor: "#F9F9F8" }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity style={styles.menu} onPress={() => {
              navigation.navigate("SecondSlide");
            }}>
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
            marginTop: 20,
            marginRight: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#AAAA9F",
            borderRadius: 15,
            backgroundColor: "white",
            padding: 16,
          }}
        >
          <Text style={styles.text}>Dispatch</Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
            >
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 20,
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
                    width: 36,
                    height: 36,
                    marginTop: 11,
                    alignSelf: "flex-start",
                  }}
                  source={list}
                ></Image>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    Project
                  </Text>
                  <Text style={{ fontSize: 18 }}>{project}</Text>
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
                      Project
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      {select}
                    </Text>
                  </View>
                  <FlatList
                    data={array}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setSelect(item.toUpperCase());
                            setProject(item.toUpperCase());
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
            <TouchableOpacity>
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
                    width: 36,
                    height: 36,
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
                    <TouchableOpacity
                      onPress={() => {
                        show("date");
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>{text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        show("time");
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>{time}</Text>
                      {/* {show&&{
                      <DateTimePickerAndroid
                      textID="dateTimerPicker"
                      value={text, time}
                      mode={mode}
                      is24Hours={true}
                      display="default"
                      onChange={onChange}
                      />
                    }} */}
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
            navigation.navigate("Scan_Second");
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
    </View>
  );
}

export default Scan_First;

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
