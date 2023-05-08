import React, { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard, Modal, Text } from "react-native";
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
import list from "./list.png";
import numberlist from "./list-ol.png";
import { TextInput } from "react-native-gesture-handler";
import phone from "./call.png";
import cross from "./cancel.png";
import { AntDesign } from "react-native-vector-icons";
import calendar from "./date-solid.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRecieveDCNumber, setRecieveDateTime } from "../redux/mainDataSlice";
import { Snackbar } from "react-native-paper";

function Recieve_DC_Second({ navigation }) {
  const { recieve_dc_number } = useSelector((state) => state.mainReducer);
  console.log("data" + JSON.stringify(recieve_dc_number));

  const [from, setFrom] = useState("from");

  const [text, settext] = useState("YYYY-MM-DD HH:MM:SS");
  const [refNo, setRefNo] = useState("");
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
  const [visible2, setVisible2] = useState(false);
  const onToggleSnackBar2 = () => setVisible2(true);
  const onDismissSnackBar2 = setTimeout(() => {
    setVisible2(false);
  }, 2000);

  const [to, setTo] = useState("to");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (!refNo) {
      return;
    }
    const fetcheTimer = setTimeout(() => {
      RecieveDetails();
    }, 2000);

    return () => {
      clearTimeout(fetcheTimer);
    };
  }, [refNo]);
  useEffect(() => {
    if (!text) {
      return;
    }
    dispatch(setRecieveDateTime(text));
  }, [text]);
  const RecieveDetails = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);

      const Recieve_Details = await axios.post(
        "http://vulcantunnel.com:5007/user/transaction/getDetails",
        {
          reference_number: refNo,
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const details = Recieve_Details?.data;
      console.log(details);
      dispatch(setRecieveDCNumber([details]));
    } catch (e) {
      if(recieve_dc_number==null){
        setRefNo("")
        return onToggleSnackBar1();
      }
      Alert.alert(e?.message);
    }
  };

  return (
    <Pressable onPress={()=>{
      Keyboard.dismiss()
    }}>
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
            <Text style={styles.text}>Receive</Text>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    marginBottom: 5,
                    marginLeft: 5,
                    marginTop: 15,
                    marginRight: 5,
                    marginLeft: 5,
                    borderWidth: 1,
                    borderColor: "#AAAA9F",
                    borderRadius: 15,
                    backgroundColor: "white",
                    paddingRight: 50,
                    paddingTop: 3,
                    paddingBottom: 5,
                    paddingLeft: 6,
                    flexDirection: "row",
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: "stretch",

                      marginTop: 14,
                      marginBottom: 14,
                      marginLeft: 8,
                      alignSelf: "flex-start",
                    }}
                    source={numberlist}
                  ></Image>
                  <View style={{ paddingLeft: 10 }}>
                    <Text
                      style={{
                        fontWeight: "200",
                        fontSize: 8,
                      }}
                    >
                      DC Number
                    </Text>
                    <View style={{ flexDirection: "row", fontSize: 16 }}>
                      <TextInput
                        value={refNo}
                        style={{ fontSize: 14, width: "70%" }}
                        placeholder="ex: 1234567890"
                        onChangeText={(text) => {
                          setRefNo(text);
                        }}
                      ></TextInput>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: 23,
                  }}
                  onPress={() => {
                    {
                      recieve_dc_number?.map((item, index) => {
                        return (
                          setFrom(item?.from_location_name),
                          setTo(item?.to_location_name)
                        );
                      });
                    }
                  }}
                >
                  <AntDesign
                    name="rightcircle"
                    size={40}
                    color="#243a72"
                  ></AntDesign>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 5,
                  marginRight: 5,
                  marginLeft: 5,
                  marginBottom: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 14,
                  paddingTop: 3,
                  paddingBottom: 4,
                  paddingLeft: 6,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 35,
                    resizeMode: "stretch",

                    marginTop: 8,
                    marginBottom: 5,
                    marginLeft: 3,
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
                  <Text style={{ fontSize: 15 }}>{from}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginRight: 5,
                  marginLeft: 5,
                  marginBottom: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 14,
                  paddingTop: 3,
                  paddingBottom: 4,
                  paddingLeft: 6,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 35,
                    resizeMode: "stretch",

                    marginTop: 8,
                    marginBottom: 5,
                    marginLeft: 3,
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
                    to
                  </Text>
                  <Text style={{ fontSize: 15 }}>{to}</Text>
                </View>
              </View>

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
                      width: 20,
                      height: 20,
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
                      <Text style={{ fontSize: 15, marginBottom: 2 }}>
                        {text}
                      </Text>
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
              if (refNo === "") {
                return onToggleSnackBar();
              }else if(recieve_dc_number==null){
                return onToggleSnackBar1();
              }
              else if(text==="YYYY-MM-DD HH:MM:SS"){
                return onToggleSnackBar2()
              }
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

          <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
            Please Enter DC Number
          </Snackbar>
          <Snackbar visible={visible1} onDismiss={onDismissSnackBar1}>
            No data available with procided dc number 
          </Snackbar>
          <Snackbar visible={visible2} onDismiss={onDismissSnackBar2}>
            Please Select date and time
          </Snackbar>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </Pressable>
  );
}

export default Recieve_DC_Second;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: 10,
    paddingTop: 10,
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
