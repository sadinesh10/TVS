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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import left from "./vehicle_left.png";
import right from "./vehicle_right.png";
import group from "./Group 2296.png";
import cross from "./cancel.png";
import calendar from "./date-solid.png";
import list from "./list.png";
import tick from "./check.png";
import Entypo from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecieveProjectList,
  setRecieveSelectedProjectName,
  setRecieveSelectedProjectSecurityId,
  setRecieveHubsList,
  setSelectedFrom,
  setRecieveSelectedFrom,
  setRecieveSelectedTo,
  setRecieveDCNumbers,
  setRecievedSelectedDCNumber,
} from "../redux/mainDataSlice";
import { Snackbar } from "react-native-paper";

function Recieve_Scan_First({ navigation }) {
  const dispatch = useDispatch();
  const {
    recieve_project_list,
    recieve_selected_project_security_id,
    recieve_hublists,
    recieve_selected_from,
    recieve_selected_to,
    recieve_dc_numbers,
    recieve_selected_dc_number
  } = useSelector((state) => state.mainReducer);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("Select Project");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [select, setSelect] = useState("Select Here");

  const [from, setFrom] = useState("Select from");
  const [select1, setSelect1] = useState("Select here");
  const [select2, setSelect2] = useState("Select here");
  const [select3, setSelect3] = useState("Select here");

  const [text, settext] = useState("YYYY-MM-DD HH:MM:SS");

  const [to, setTo] = useState("Select to");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
      // console.log(Project_List);
      dispatch(setRecieveProjectList(Project_List));
    } catch (e) {
      Alert.alert(e);
    }
  };
  const RoutesList = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);
      const lists = await axios.post(
        "http://vulcantunnel.com:5007/user/hub/hubslist",
        {
          customer_project_id: recieve_selected_project_security_id,
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const hubslist = lists?.data;
      //dispatch(setProjectLocations(hubslist));
      // console.log("hubsList" + JSON.stringify(hubslist));
      dispatch(setRecieveHubsList(hubslist));
    } catch (e) {
      Alert.alert(e);
    }
  };
  const DCNumberList = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);
      const lists = await axios.post(
        "http://vulcantunnel.com:5007/user/transaction/dcnumberslist",
        {
          customer_security_id: userData.security_id,
          from_location_id: recieve_selected_from.location_id,
          to_location_id: recieve_selected_to.location_id,
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const dcnumberlist = lists?.data;
      //dispatch(setProjectLocations(hubslist));
      // console.log("hubsList" + JSON.stringify(hubslist));
      //dispatch(setRecieveHubsList(hubslist));
      dispatch(setRecieveDCNumbers(dcnumberlist));
    } catch (e) {
      Alert.alert(e);
    }
  };
  const DCDetails = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);
      console/log("debug")
      const lists = await axios.post(
        "http://vulcantunnel.com:5007/user/tramsaction/getdetails",
        {
          reference_number:recieve_selected_dc_number
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const dcdetails = lists?.data;
      //dispatch(setProjectLocations(hubslist));
      // console.log("hubsList" + JSON.stringify(hubslist));
      console.log("Detaills"+dcdetails)
    } catch (e) {
      Alert.alert(e);
    }
  };
  useEffect(() => {
    Project_List();
    //dispatch(setDateTime(text));
    RoutesList();
  }, [project]);

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

  const array1 = [
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

  const array2 = ["MF4-A000000567", "MF4-A000000545", "MF4-A000000533"];
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
                  paddingBottom: 10,
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
                    marginTop: 7,
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
                    data={recieve_project_list}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            dispatch(
                              setRecieveSelectedProjectName(item.company_name)
                            );
                            dispatch(
                              setRecieveSelectedProjectSecurityId(
                                item.security_id
                              )
                            );
                            setProject(item.company_name);
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
              onPress={() => {
                setOpen1(true);
              }}
            >
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
                    <Text style={{ fontSize: 10, fontWeight: "200" }}>
                      From
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "200" }}>
                      {select1}
                    </Text>
                  </View>
                  <FlatList
                    data={recieve_hublists}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setFrom(item.location_name);
                            dispatch(setRecieveSelectedFrom(item));
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
            <TouchableOpacity
              onPress={() => {
                setOpen2(true);
              }}
            >
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
              <Modal visible={open2}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setOpen2(false);
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
                    <Text style={{ fontSize: 10, fontWeight: "400" }}>to</Text>
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      {select2}
                    </Text>
                  </View>
                  <FlatList
                    data={recieve_hublists}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setTo(item.location_name);
                            dispatch(setRecieveSelectedTo(item));
                            setOpen2(false);
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
                  paddingBottom: 17,
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
              } else if (from === "Select from") {
                return onToggleSnackBar1();
              } else if (to === "Select to") {
                return onToggleSnackBar2();
              } else if (text === "YYYY-MM-DD HH:MM:SS") {
                return onToggleSnackBar3();
              } else if (from == to) {
                return onToggleSnackBar4();
              }
              DCNumberList();
              setOpen3(true);
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
            <Modal visible={open3}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setOpen3(false);
                }}
              >
                <Entypo
                        style={{
                          marginTop: 25,
                          marginRight: 25,
                          alignSelf:"flex-end"
                        }}
                        name={"cross"}
                        size={25}
                        color="#AAAA9F"
                      />
                <View
                  style={{
                    flexDirection: "row",
                    marginStart: 15,
                    marginTop: 10,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 12,
                      paddingTop: 1,
                      paddingLeft: 10,
                      paddingRight: 220,
                      paddingBottom: 15,
                      borderColor: "#AAAA9F",
                    }}
                  >
                    <View style={{ paddingLeft: 10 }}>
                      <Text style={{ fontSize: 10, fontWeight: "100" }}>
                        Assert Number
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "200" , paddingBottom:5}}>
                        Search here
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 5 }}>
                <FlatList
                  data={recieve_dc_numbers}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          dispatch(setRecievedSelectedDCNumber(item)),
                          setOpen3(false),
                          navigation?.navigate("Recieve_Scan_Second")

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
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                ></FlatList>
              </View>
            </View>
          </Modal>


          
        </Pressable>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          Please Select a Project
        </Snackbar>
        <Snackbar visible={visible1} onDismiss={onDismissSnackBar1}>
          Please Select from
        </Snackbar>
        <Snackbar visible={visible2} onDismiss={onDismissSnackBar2}>
          Please Select to
        </Snackbar>
        <Snackbar visible={visible3} onDismiss={onDismissSnackBar3}>
          Please Select Data and Time
        </Snackbar>
        <Snackbar visible={visible4} onDismiss={onDismissSnackBar4}>
          from and to should be different
        </Snackbar>
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

export default Recieve_Scan_First;
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
