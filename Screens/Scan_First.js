import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
import Entypo from "react-native-vector-icons/Entypo";

import header from "./header_common.png";
import list from "./list.png";
import calendar from "./date-solid.png";
import cross from "./cancel.png";
import tick from "./success-standard-solid.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorageKeys from "../AsyncStorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  setDateTime,
  setProjectList,
  setProjectSecurityId,
} from "../redux/mainDataSlice";
import { Snackbar } from "react-native-paper";

function ThirdSlide({ navigation }) {
  const [project, setProject] = useState("Select Project");
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("Search here");
  const [text, settext] = useState("YYYY-MM-DD HH:MM");
  const [scrollModal, setScrollModal] = useState(true);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = setTimeout(() => {
    setVisible(false);
  }, 2000);
  const [visible1, setVisible1] = useState(false);
  const onToggleSnackBar1 = () => setVisible1(true);
  const onDismissSnackBar1 = setTimeout(() => {
    setVisible1(false);
  }, 2000);
  const { projectsLiat } = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();

  const Project_List = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);
      const project = await axios.post(
        "http://vulcantunnel.com:5007/user/project/list",
        {},
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const Project_List = project?.data;
      dispatch(setProjectList(Project_List));
    } catch (e) {
      Alert.alert(e);
    }
  };

  useEffect(() => {
    Project_List();
    dispatch(setDateTime(text));
  }, [text]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const a = parseInt(date.getMonth()) + 1;
    let b = null;
    if (a < 9) {
      b = "0" + a.toString();
    } else {
      b = a;
    }
    let c = parseInt(date.getDate());
    let d = null;
    if (c < 9) {
      d = "0" + c.toString();
    } else {
      d = c;
    }
    let e = parseInt(date.getHours());
    let f = null;
    if (e < 9) {
      f = "0" + e.toString();
    } else {
      f = e;
    }
    let g = parseInt(date.getMinutes());
    let h = null;
    if (g < 9) {
      h = "0" + g.toString();
    } else {
      h = g;
    }
    settext(
      date.getFullYear() + "-" + b + "-" + d + " " + f + ":" + h + ":" + "00"
    );
    hideDatePicker();
  };

  return (
    <View
      width="100%"
      height="100%"
      style={{ backgroundColor: "#F9F9F8", paddingBottom: 90 }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            navigation.navigate("SecondSlide");
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
            marginTop: 30,
            marginRight: 10,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "#AAAA9F",
            borderRadius: 15,
            backgroundColor: "white",
            padding: 5,
            paddingBottom: 10,
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
                  marginBottom: 5,
                  marginLeft: 5,
                  marginTop: 18,
                  marginRight: 5,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 10,
                  paddingTop: 3,
                  paddingBottom: 8,
                  paddingLeft: 12,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 35,
                    resizeMode: "stretch",
                    marginTop: 10,
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
                  <Text style={{ fontSize: 15 }}>{project}</Text>
                </View>
              </View>
              <Modal visible={open}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setOpen(false);
                    }}
                  >
                    <Entypo
                      style={{
                        alignSelf: "flex-end",
                        marginTop: 25,
                        marginRight: 20,
                      }}
                      name={"cross"}
                      size={25}
                      color="#AAAA9F"
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginStart: 15,
                      marginRight: 15,
                      marginTop: 12,
                      marginBottom: 15,
                      paddingTop: 3,
                      paddingLeft: 20,
                      paddingRight: 10,
                      paddingBottom: 17,
                      borderColor: "#AAAA9F",
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: "100" }}>
                      Project
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: "200" }}>
                      {select}
                    </Text>
                  </View>
                  <FlatList
                    data={projectsLiat}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setSelect(item.company_name);
                            setProject(item.company_name);
                            dispatch(setProjectSecurityId(item.security_id));
                            setOpen(false);
                          }}
                        >
                          <View style={{ marginLeft: 15, paddingBottom: 25 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                color: "#1b2b99",
                              }}
                            >
                              {item.company_name}
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
              onPress={(text) => {
                showDatePicker();
              }}
            >
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  marginRight: 5,
                  marginBottom: 2,
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
                    width: 23,
                    height: 23,
                    marginTop: 15,
                    alignSelf: "flex-start",
                  }}
                  source={calendar}
                ></Image>
                <View style={{ paddingLeft: 15 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    Date Time
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 15 }}>{text}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <StatusBar
            translucent={false}
            style="auto"
            backgroundColor="#F9F9F8"
          />
        </View>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 10,
            backgroundColor: "#243a70",
            marginHorizontal: 30,
          }}
          onPress={() => {
            if (project === "Select Project") {
              return onToggleSnackBar();
            }
            else if(text==="YYYY-MM-DD HH:MM"){
              return onToggleSnackBar1()
            }
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
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          Please Select Project
        </Snackbar>
        <Snackbar visible={visible1} onDismiss={onDismissSnackBar1}>
            Please Select Data and Time
          </Snackbar>
      </View>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="default"
      />
      
    </View>
  );
}

export default ThirdSlide;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: 20,
    paddingTop: 20,
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
