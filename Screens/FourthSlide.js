import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

import header from "./header_common.png";
import left from "./vehicle_left.png";
import right from "./vehicle_right.png";
import numberPlate from "./AB12.png";
import { TextInput } from "react-native-gesture-handler";
import phone from "./call.png";
import cross from "./cancel.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverNo,
  setLocationId,
  setLrNo,
  setProjectLocations,
  setSelectedFrom,
  setSelectedTo,
  setVehicleNo,
} from "../redux/mainDataSlice";
import { Snackbar } from "react-native-paper";

function FourthSlide({ navigation }) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [from, setFrom] = useState("Select from");
  const [select1, setSelect1] = useState("Search here");
  const [select2, setSelect2] = useState("Search here");
  const [to, setTo] = useState("Select to");
  const dispatch = useDispatch();
  const { projectSecurityId, projectLocations, vehicleNo, lrNo } = useSelector(
    (state) => state.mainReducer
  );
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
  const [visible3, setVisible3] = useState(false);
  const onToggleSnackBar3 = () => setVisible3(true);
  const onDismissSnackBar3 = setTimeout(() => {
    setVisible3(false);
  }, 2000);
  const [visible4, setVisible4] = useState(false);
  const onToggleSnackBar4 = () => setVisible4(true);
  const onDismissSnackBar4 = setTimeout(() => {
    setVisible4(false);
  }, 2000);
  const list = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);
      const lists = await axios.post(
        "http://vulcantunnel.com:5007/user/hub/hubslist",
        {
          customer_project_id: projectSecurityId,
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const hubslist = lists?.data;
      dispatch(setProjectLocations(hubslist));
    } catch (e) {
      Alert.alert(e);
    }
  };
  useEffect(() => {
    list();
  }, []);
  return (
    <Pressable onPress={()=>Keyboard.dismiss()}>
      <View
        width="100%"
        height="100%"
        style={{
          backgroundColor: "#F9F9F8",
          paddingBottom: 90,
        }}
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
              navigation.navigate("ThirdSlide");
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
              marginBottom: 15,
              borderWidth: 1,
              borderColor: "#AAAA9F",
              borderRadius: 15,
              backgroundColor: "white",
              padding: 5,
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
                    marginTop: 20,
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
                      <Text style={{ fontSize: 10, fontWeight: "200" }}>
                        From
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "200" }}>
                        {select1}
                      </Text>
                    </View>
                    <FlatList
                      data={projectLocations}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setFrom(item.location_name);
                              setSelect1(item.location_name);
                              dispatch(setSelectedFrom(item));
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
                                {item.location_name}
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
                  setOpen1(true);
                }}
              >
                <View
                  style={{
                    marginTop: 1,
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
                      marginLeft: 3,
                      marginTop: 8,
                      marginBottom: 5,
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
                    <Text style={{ fontSize: 15 }}>{to}</Text>
                  </View>
                </View>
                <Modal visible={open1}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen1(false);
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
                      <Text style={{ fontSize: 10, fontWeight: "400" }}>
                        to
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {select2}
                      </Text>
                    </View>
                    <FlatList
                      data={projectLocations}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setTo(item.location_name);
                              setSelect2(item.location_name);
                              dispatch(setSelectedTo(item));
                              setOpen1(false);
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
                                {item.location_name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    ></FlatList>
                  </View>
                </Modal>
              </TouchableOpacity>
              <View
                style={{
                  marginBottom: 5,
                  marginLeft: 5,
                  marginTop: 1,
                  marginRight: 5,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 10,
                  paddingTop: 3,
                  paddingBottom: 12,
                  paddingLeft: 6,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 35,
                    height: 14,
                    resizeMode: "stretch",
                    marginTop: 20,
                    alignSelf: "flex-start",
                  }}
                  source={numberPlate}
                ></Image>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 10,
                    }}
                  >
                    vehicle Number
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      fontSize: 16,
                    }}
                  >
                    <TextInput
                      style={{ fontSize: 16, width: "100%", fontWeight: "400" }}
                      value={vehicleNo}
                      placeholder="ex TN 1234"
                      onChangeText={(value) => {
                        dispatch(setVehicleNo(value));
                      }}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginBottom: 5,
                  marginLeft: 20,
                  marginTop: 1,
                  marginRight: 5,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 10,
                  paddingTop: 3,
                  paddingBottom: 12,
                  paddingLeft: 10,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 12,
                    alignSelf: "flex-start",
                  }}
                  source={phone}
                ></Image>
                <View style={{ paddingLeft: 15 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 10,
                    }}
                  >
                    Driver (optional)
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      fontSize: 16,
                    }}
                  >
                    <TextInput
                      style={{ fontSize: 16, width: "100%" }}
                      placeholder="ex: 1234567890"
                      keyboardType="number-pad"
                      maxLength={10}
                      onChangeText={(value) => {
                        dispatch(setDriverNo(value));
                      }}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginBottom: 15,
                  marginLeft: 5,
                  marginTop: 1,
                  marginRight: 5,
                  marginLeft: 5,
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  borderRadius: 15,
                  backgroundColor: "white",
                  paddingRight: 10,
                  paddingTop: 3,
                  paddingBottom: 12,
                  paddingLeft: 6,
                  flexDirection: "row",
                  backgroundColor: "#F9F9F8",
                }}
              >
                <Image
                  style={{
                    width: 35,
                    height: 14,
                    resizeMode: "stretch",
                    marginTop: 20,
                    alignSelf: "flex-start",
                  }}
                  source={numberPlate}
                ></Image>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 10,
                    }}
                  >
                    LR Number
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      fontSize: 16,
                    }}
                  >
                    <TextInput
                      style={{ fontSize: 16, width: "100%" }}
                      placeholder="ex: LR 12345 "
                      onChangeText={(value) => {
                        dispatch(setLrNo(value));
                      }}
                    ></TextInput>
                  </View>
                </View>
              </View>
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
              if (from === "Select from") {
                return onToggleSnackBar();
              } else if (to === "Select to") {
                return onToggleSnackBar1();
              } else if (vehicleNo == null||vehicleNo=="") {
                return onToggleSnackBar2();
              } else if (lrNo == null||lrNo=="") {
                return onToggleSnackBar3();
              }
              else if (from ==to) {
                return onToggleSnackBar4();
              }
              navigation.navigate("FifthSlide");
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
            Please Select from
          </Snackbar>
          <Snackbar visible={visible1} onDismiss={onDismissSnackBar1}>
            Please Select to
          </Snackbar>
          <Snackbar visible={visible2} onDismiss={onDismissSnackBar2}>
            Please Enter Vehicle No
          </Snackbar>
          <Snackbar visible={visible3} onDismiss={onDismissSnackBar3}>
            Please Enter LR No
          </Snackbar>
          <Snackbar visible={visible4} onDismiss={onDismissSnackBar4}>
            From and To locations should not same
          </Snackbar>
        </View>
      </View>
    </Pressable>
  );
}

export default FourthSlide;

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
