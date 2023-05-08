import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
  BackHandler,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

import header from "./header_common.png";
import left from "./vehicle_left.png";
import right from "./vehicle_right.png";
import cross from "./cancel.png";
import tick from "./check.png";
import numberlist from "./list-ol.png";
import line from "./list-line.png";
import pause from "./pause-outline-filled.png";
import qr from "./qr-code.png";
import solidcancel from "./android-cancel.png";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import calendar from "./date-solid.png";

import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import axios from "axios";
import {
  setAssetDetails,
  setAssetsProjectName,
  setAssetsSelectedProjectName,
  setChangedSubAssetsQuantity,
  setHoldDispatch,
  setSubAssets,
} from "../redux/mainDataSlice";
import { Snackbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

function FifthSlide({ navigation }) {
  const {
    projectSecurityId,
    selectedFrom,
    selectedTo,
    date_time,
    assetsProjectName,
    assetsSelectedProjectName,
    assetDetails,
    vehicleNo,
    driverNo,
    lrNo,
    holdDispatch,
    transaction_id,
  } = useSelector((state) => state.mainReducer);
  const total_qunatity = assetDetails.reduce((total, current) => {
    return total + current.asset.quantity;
  }, 0);
  const dispatch = useDispatch();

  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [select3, setSelect3] = useState("");
  const [assertNumber, setAssertNumber] = useState(0);
  const [quantityNumber, setQuantityNumber] = useState(0);
  const [list, setList] = useState(false);
  const [assert, setAssert] = useState([]);
  const [subArray, setSubArray] = useState(false);
  const [duplicateAsset, setDuplicateAsset] = useState(null);
  const [showBackModel, setBackModel] = useState(false);
  const [dispatcholdButton, setDispatchholdButton] = useState(false);
  const [AssetScanned, setAssetScanned] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = setTimeout(() => {
    setVisible(false);
  }, 2000);
  const onToggleSnackBar1 = () => setVisible1(true);
  const onDismissSnackBar1 = setTimeout(() => {
    setVisible1(false);
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
    settext(
      date.getFullYear() +
        "-" +
        b +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
    );
    hideDatePicker();
  };

  const handleAddAssert = () => {
    const updatedArray = [...assert, select3];
    setAssert(updatedArray);
  };

  const handleDelete = (i) => {
    const deleteassert = [...assetDetails];

    deleteassert.splice(i, 1);
    dispatch(setAssetDetails(deleteassert));
  };

  const handleReplace = (i) => {
    console.log(i);
    const deleteassert = [...assetDetails];
    deleteassert.forEach((value, index) => {
      console.log("h");
      if (value.asset.asset_ref_no == i) {
        console.log(value);
        deleteassert.splice(index, 1);
        return;
      }
    });
    // dispatch(setAssetDetails(deleteassert));
    assetsQunatity(duplicateAsset, deleteassert);

    setDuplicateAsset(null);
  };

  const assets = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);

      console.log(
        JSON.stringify({
          customer_id: projectSecurityId,
          location_id: selectedFrom.location_id,
          create_date_time: date_time,
        })
      );

      const ApiAssets = await axios.post(
        "http://vulcantunnel.com:5007/user/assets/project/location/list",
        {
          customer_id: projectSecurityId,
          location_id: selectedFrom.location_id,
          create_date_time: date_time,
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const GetedAssets = ApiAssets?.data;
      dispatch(setAssetsProjectName(GetedAssets));
    } catch (e) {
      Alert.alert(e.message, e?.respose?.errMessage);
    }
  };

  const assetsQunatity = async (dupasset, modifiedAssets) => {
    console.log("asset quantity: " + dupasset);

    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);

      const SelectedAssetQuantity = await axios.post(
        "http://vulcantunnel.com:5007/user/assets/assetdata",
        {
          asset_ref_no: dupasset || assetsSelectedProjectName,
          customer_security_id: projectSecurityId,
          from_location_id: selectedFrom.location_id,
          create_date_time: date_time,
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const details = SelectedAssetQuantity?.data;
      if (modifiedAssets) {
        dispatch(setAssetDetails([...modifiedAssets, details]));
      } else {
        dispatch(setAssetDetails([...assetDetails, details]));
      }
      // assetDetails?.asset?.map((value, index) => {
      //   value.some((val) => val.aaser_ref_no == select3)
      //     ? setAlertModel(true)
      //     : setAlertModel(false);
      // });
    } catch (e) {
      Alert.alert(e?.message);
    }
  };

  const addDispatchHold = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      console.log("my asset" + assetDetails);

      const assetsString = JSON.stringify(
        assetDetails?.map((value, index) => {
          console.log(value);
          return {
            asset_ref_no: value.asset.asset_ref_no,
            quantity: value.asset.quantity,
            is_valid: 1,
            cost: value.asset.cost,
            subassets: value.subassets.map((element, key) => {
              return {
                sub_asset: element.sub_asset,
                quantity: element.quantity,
                actual_quantity: element.actual_quantity,
                subasset_hsn_code: element.subasset_hsn_code,
                subasset_rate: element.subasset_rate,
              };
            }),
          };
        })
      );

      const userData = JSON.parse(userDataString);

      const formData = new FormData();
      formData.append("customer_security_id", projectSecurityId);
      formData.append("from_location_id", selectedFrom.location_id);
      formData.append("to_location_id", selectedTo.location_id);
      formData.append("vehicle_no", vehicleNo);
      formData.append("lr_number", lrNo);
      formData.append("current_status", "3");
      formData.append("transaction_type", "m");
      formData.append("created_by", projectSecurityId);
      formData.append("update_date_time", date_time);
      formData.append("remark", "");
      formData.append("driver_no", driverNo);
      formData.append("challan_file", "");
      formData.append("transaction_id", transaction_id ? transaction_id : "");
      formData.append("assets", assetsString);
      // const DispatchHold = await axios.post(
      //   "http://vulcantunnel.com:5007/user/transaction/dispatch/add",
      //   // {
      //   //   customer_security_id: projectSecurityId,
      //   //   created_by: projectSecurityId,
      //   //   from_location_id: selectedFrom.location_id,
      //   //   to_location_id: selectedTo.location_id,
      //   //   create_date_time: date_time,
      //   //   driver_no: driverNo,
      //   //   vehicle_no: vehicleNo,
      //   //   lr_number: lrNo,
      //   //   current_status: 3,
      //   //   transaction_type: "m",
      //   //   assets: assetsString,
      //   //   updated_data_time: date_time,
      //   // },
      //   formData,
      //   {
      //     headers: {
      //       "x-access-token": userData?.token,
      //       "device-type": "MOBILE",
      //       "Content-Type": "multipart/form-data"
      //     },
      //   }
      // );
      const DispatchHold = await fetch(
        "http://vulcantunnel.com:5007/user/transaction/dispatch/add",
        {
          method: "POST",
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      const hold = await DispatchHold?.json();
      dispatch(setHoldDispatch([...holdDispatch, hold]));

      console.log("Dispatch_Hold" + hold);
      console.log("String" + JSON.stringify(hold));
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  useEffect(() => {
    assets();
    console.log("Details" + projectSecurityId, selectedFrom.location_id);
  }, []);

  // 
  return (
    <ScrollView
      width="100%"
      height="100%"
      style={{ backgroundColor: "#F9F9F8" }}
      contentContainerStyle={{
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
            if (assetDetails.length != 0) {
              return setBackModel(true);
            }
            navigation.navigate("FourthSlide");
          }}
        >
          <MaterialIcons name={"arrow-back-ios"} size={25} />
          <Modal visible={showBackModel} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  elevation: 10,
                  backgroundColor: "white",
                  padidingTop: 5,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                  borderRadius: 13,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    marginTop: 10,
                    padding: 5,
                  }}
                >
                  Confirm Reset
                </Text>

                <View
                  style={{
                    paddingTop: 0,
                    paddingLeft: 5,
                    paddingRight: 40,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      justifyContent: "flex-start",
                    }}
                  >
                    Do you really want to reset , and go to begining?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{ marginTop: 5 }}
                    onPress={() => {
                      setBackModel(false);
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 5,
                        color: "#243a70",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        marginHorizontal: 10,
                        borderRadius: 8,
                        backgroundColor: "#243a70",
                      }}
                    >
                      <Text
                        style={{
                          paddingTop: 4,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingBottom: 4,
                          color: "white",
                        }}
                        onPress={() => {
                          dispatch(setAssetDetails([]));
                          setBackModel(false);
                          navigation.goBack()
                        }}
                      >
                        OK
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal visible={dispatcholdButton} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  elevation: 10,
                  backgroundColor: "white",
                  padidingTop: 5,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                  borderRadius: 13,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    marginTop: 10,
                    padding: 5,
                  }}
                >
                  Confirm Hold
                </Text>

                <View
                  style={{
                    paddingTop: 0,
                    paddingLeft: 5,
                    paddingRight: 100,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      justifyContent: "flex-start",
                    }}
                  >
                    Do you really want to hold?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{ marginTop: 5 }}
                    onPress={() => {
                      setDispatchholdButton(false);
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 5,
                        color: "#243a70",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        marginHorizontal: 10,
                        borderRadius: 8,
                        backgroundColor: "#243a70",
                      }}
                    >
                      <Text
                        style={{
                          paddingTop: 4,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingBottom: 4,
                          color: "white",
                        }}
                        onPress={() => {
                          setAssetScanned(true);
                          setDispatchholdButton(false);
                        }}
                      >
                        OK
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal visible={AssetScanned} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 30,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  elevation: 10,
                  backgroundColor: "white",
                  padidingTop: 5,
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                  borderRadius: 13,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    marginTop: 10,
                  }}
                >
                  Order Status
                </Text>

                <View
                  style={{
                    paddingTop: 5,
                    paddingLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      justifyContent: "flex-start",
                    }}
                  >
                    A total of {assetDetails.length} Dispatch hold item has been
                    scanned
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        paddingHorizontal: 30,
                        borderWidth: 1,
                        borderRadius: 20,
                        marginHorizontal: 5,
                        borderRadius: 8,
                        backgroundColor: "#243a70",
                      }}
                    >
                      <Text
                        style={{
                          paddingTop: 8,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingBottom: 8,
                          color: "white",
                        }}
                        onPress={() => {
                          addDispatchHold();
                          navigation.pop(3);
                        }}
                      >
                        OK
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingBottom: 100 }}
      >
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
            padding: 3,
            paddingTop: 10,
            paddingBottom: 35,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text style={styles.text}>Dispatch</Text>
            <View style={{ flexDirection: "row", paddingRight: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SixthSlide");
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 20,
                    marginLeft: 18,
                  }}
                  source={qr}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDispatchholdButton(true);
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 20,
                    marginLeft: 18,
                    marginRight: 7,
                  }}
                  source={pause}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View>
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

                  marginTop: 7,
                  marginBottom: 7,
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
                <Text style={{ fontSize: 15 }}>
                  {selectedFrom.location_name}
                </Text>
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

                  marginTop: 7,
                  marginBottom: 7,
                  marginLeft: 2,
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
                <Text style={{ fontSize: 15 }}>{selectedTo.location_name}</Text>
              </View>
            </View>

            {transaction_id ? (
              <TouchableOpacity
                onPress={(text) => {
                  showDatePicker();
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
                      height: 20,
                      alignSelf: "flex-start",
                      resizeMode: "stretch",

                      marginTop: 15,
                      marginBottom: 14,
                      marginLeft: 3,
                    }}
                    source={calendar}
                  ></Image>
                  <View style={{ paddingLeft: 10 }}>
                    <Text
                      style={{
                        fontWeight: "200",
                        fontSize: 10,
                      }}
                    >
                      Date Time
                    </Text>
                    <Text style={{ fontSize: 15, paddingTop: 3 }}>
                      {date_time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                setOpen3(true);
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
                <View style={{ paddingLeft: 13 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    Assert Number
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                    }}
                  >
                    {assetDetails.length}
                  </Text>
                </View>
              </View>
              <Modal visible={open3}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setOpen3(false);
                        setList(false);
                      }}
                    >
                      <Entypo
                        style={{
                          marginTop: 8,
                          marginLeft: 25,
                        }}
                        name={"cross"}
                        size={25}
                        color="#AAAA9F"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setList(false);

                        setOpen3(false);
                        setQuantityNumber(assetDetails[0]?.asset?.quantity);
                        setAssertNumber(assetDetails.length);
                      }}
                    >
                      <Entypo
                        style={{
                          marginTop: 8,
                          marginRight: 25,
                        }}
                        name={"check"}
                        size={25}
                        color="#AAAA9F"
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginStart: 15,
                      marginTop: 20,
                      marginBottom: 15,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 12,
                        paddingTop: 1,
                        paddingLeft: 20,
                        paddingRight: 100,
                        paddingBottom: 15,
                        borderColor: "#AAAA9F",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            marginTop: 15,
                            paddingLeft: 2,
                            alignSelf: "flex-start",
                          }}
                          source={numberlist}
                        ></Image>
                        <View style={{ paddingLeft: 10 }}>
                          <Text style={{ fontSize: 10, fontWeight: "400" }}>
                            Assert Number
                          </Text>
                          <TextInput
                            value={select3}
                            onChangeText={(text) => {
                              setSelect3(text);
                            }}
                            onFocus={() => {
                              setList(true);
                            }}
                            placeholder="ex: FLC-1234567"
                            style={{ fontSize: 15, fontWeight: "400" }}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        if (select3 == "") {
                          return onToggleSnackBar();
                        }
                        const assetDetailsIncludes = assetDetails?.some(
                          (value, index) => {
                            return value.asset.asset_ref_no == select3;
                          }
                        );
                        if (assetDetailsIncludes) {
                          setDuplicateAsset(select3);
                        } else {
                          assetsQunatity();
                        }
                        setList(false);
                        console.log("hello");
                      }}
                    >
                      <Ionicons
                        style={{ marginLeft: 10 }}
                        name="add-circle"
                        color="#1b2b99"
                        size={50}
                      ></Ionicons>
                    </TouchableOpacity>
                  </View>
                </View>

                {list ? (
                  <View>
                    <Text style={{ marginLeft: 15, paddingVertical: 5 }}>
                      Select assert number
                    </Text>
                    <FlatList
                      data={assetsProjectName}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setSelect3(item.toUpperCase());
                              dispatch(setAssetsSelectedProjectName(item));

                              setList(false);
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
                ) : (
                  <View></View>
                )}
                <Modal visible={!!duplicateAsset} transparent={true}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 20,
                      borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        elevation: 10,
                        backgroundColor: "white",
                        padidingTop: 5,
                        paddingHorizontal: 10,
                        paddingBottom: 20,
                        borderRadius: 13,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "900",
                          marginBottom: 10,
                          marginTop: 10,
                        }}
                      >
                        Alert
                      </Text>

                      <View
                        style={{
                          paddingTop: 5,
                          paddingLeft: 10,
                          paddingBottom: 5,
                          paddingRight: 80,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "400",
                            justifyContent: "flex-start",
                          }}
                        >
                          The Asset with ID {duplicateAsset}. has already added.
                          Do you really want to replace it
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "flex-end",
                          marginTop: 20,
                        }}
                      >
                        <TouchableOpacity
                          style={{ marginTop: 9 }}
                          onPress={() => {
                            setDuplicateAsset(null);
                          }}
                        >
                          <Text
                            style={{
                              marginHorizontal: 5,
                              color: "#243a70",
                            }}
                          >
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View
                            style={{
                              borderWidth: 1,
                              borderRadius: 20,
                              marginHorizontal: 10,
                              borderRadius: 15,
                              backgroundColor: "#243a70",
                            }}
                          >
                            <Text
                              style={{
                                paddingTop: 8,
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingBottom: 8,
                                color: "white",
                              }}
                              onPress={() => {
                                handleReplace(duplicateAsset);
                              }}
                            >
                              OK
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                <FlatList
                  data={assetDetails}
                  renderItem={({ item, index }) => {
                    return (
                      <View>
                        <View key={index}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderRadius: 12,
                              marginStart: 15,
                              marginRight: 15,
                              marginTop: 20,
                              paddingTop: 5,
                              paddingLeft: 20,
                              paddingRight: 20,
                              paddingBottom: 3,
                              borderColor: "#AAAA9F",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ fontSize: 18, marginTop: 20 }}>
                              {item.asset.asset_ref_no}
                            </Text>

                            <View
                              style={{ flexDirection: "column", width: "65%" }}
                            >
                              <View
                                style={{
                                  borderWidth: 1,
                                  borderRadius: 12,
                                  marginLeft: 50,
                                  marginTop: 5,
                                  marginBottom: 0,
                                  paddingTop: 5,
                                  paddingLeft: 20,
                                  paddingRight: 50,
                                  paddingBottom: 8,
                                  borderColor: "#AAAA9F",
                                }}
                              >
                                <Text>Quantity</Text>

                                <TextInput
                                  value={item.asset?.quantity.toString()}
                                  onChangeText={(value) => {
                                    if (value) {
                                      return;
                                    }
                                    dispatch(
                                      setAssetDetails(
                                        assetDetails?.map((v, i) => {
                                          return i == index
                                            ? {
                                                ...v,
                                                asset: {
                                                  ...v.asset,
                                                  quantity: parseInt(value, 10),
                                                },
                                              }
                                            : v;
                                        })
                                      )
                                    );
                                  }}
                                />
                              </View>
                              <View>
                                {subArray ? (
                                  item.subassets.map((element, key) => {
                                    return (
                                      <View
                                        style={{
                                          width: "120%",
                                          marginTop: 10,
                                          borderWidth: 1,
                                          borderRadius: 12,
                                          borderColor: "#AAAA9F",
                                          flexDirection: "row",
                                          justifyContent: "space-evenly",
                                          paddingVertical: 5,
                                        }}
                                        key={key}
                                      >
                                        <Text
                                          style={{
                                            marginRight: 20,
                                            marginTop: 10,
                                            width: "30%",
                                          }}
                                        >
                                          {element.sub_asset}
                                        </Text>
                                        <View
                                          style={{
                                            borderWidth: 1,
                                            borderRadius: 12,
                                            paddingTop: 5,
                                            paddingLeft: 20,
                                            paddingRight: 50,
                                            paddingBottom: 8,
                                            borderColor: "#AAAA9F",
                                          }}
                                        >
                                          <Text>Quantity</Text>
                                          <TextInput
                                            value={
                                              element?.quantity?.toString()
                                                ? element?.quantity?.toString()
                                                : 0
                                            }
                                            ṁ
                                            onChangeText={(value) => {
                                              dispatch(
                                                setAssetDetails(
                                                  assetDetails?.map((v, i) => {
                                                    return i == index
                                                      ? {
                                                          ...v,
                                                          subassets:
                                                            v.subassets.map(
                                                              (e, k) => {
                                                                return k == i
                                                                  ? {
                                                                      ...e,

                                                                      actual_quantity:
                                                                        e?.actual_quantity
                                                                          ? e?.actual_quantity
                                                                          : e.quantity,
                                                                      quantity:
                                                                        parseInt(
                                                                          value
                                                                        ),
                                                                    }
                                                                  : e;
                                                              }
                                                            ),
                                                        }
                                                      : v;
                                                  })
                                                )
                                              );
                                            }}
                                          />
                                        </View>
                                      </View>
                                    );
                                  })
                                ) : (
                                  <View></View>
                                )}

                                {!subArray && item.subassets ? (
                                  <TouchableOpacity
                                    style={{ marginLeft: 30 }}
                                    onPress={() => {
                                      setSubArray(true);
                                    }}
                                  >
                                    <Entypo
                                      name={"chevron-down"}
                                      size={30}
                                      color="#AAAA9F"
                                    />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    style={{ marginLeft: 30 }}
                                    onPress={() => {
                                      setSubArray(false);
                                    }}
                                  >
                                    <Entypo
                                      name={"chevron-up"}
                                      size={30}
                                      color="#AAAA9F"
                                    />
                                  </TouchableOpacity>
                                )}
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                handleDelete(index);
                              }}
                            >
                              <Entypo
                                style={{
                                  marginTop: 20,
                                  marginLeft: 15,
                                  transform: [{ rotateY: "180deg" }],
                                }}
                                name={"cross"}
                                size={25}
                                color="#AAAA9F"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                ></FlatList>
                <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
                  Please Provide valid value
                </Snackbar>
              </Modal>
            </TouchableOpacity>
            <TouchableOpacity>
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
                    width: 22,
                    height: 30,
                    resizeMode: "stretch",

                    marginTop: 11,
                    marginBottom: 11,
                    marginLeft: 8,
                    alignSelf: "flex-start",
                  }}
                  source={line}
                ></Image>
                <View style={{ paddingLeft: 12 }}>
                  <Text
                    style={{
                      fontWeight: "200",
                      fontSize: 12,
                    }}
                  >
                    Quantity
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                    }}
                  >
                    {total_qunatity}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              paddingBottom: 10,
              paddingRight: 10,
              paddingTop: 4,
            }}
            onPress={() => {
              setOpen4(true);
            }}
          >
            <Text style={{ color: "#1b2b99", marginBottom: 0 }}>view all</Text>
            <Modal visible={open4}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setOpen4(false);
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
              </View>

              <FlatList
                data={assetDetails}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        marginHorizontal: 25,
                        marginVertical: 15,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          textAlign: "center",
                          borderWidth: 1,
                          borderColor: "#AAAA9F",
                          backgroundColor: "#F9F9F8",
                          borderRadius: 10,
                          padding: 3,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View>
                            <Text>{item.asset.asset_ref_no}</Text>
                            <Text>({item.asset.quantity})</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              handleDelete(index);
                            }}
                          >
                            <Image
                              style={{
                                width: 20,
                                height: 20,
                                marginTop: 10,
                                marginLeft: 37,
                              }}
                              source={solidcancel}
                            ></Image>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              ></FlatList>
            </Modal>
          </TouchableOpacity>
          <FlatList
            data={assetDetails.slice(0, 4)}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    marginHorizontal: 12,
                    marginVertical: 5,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      textAlign: "center",
                      borderWidth: 1,
                      borderColor: "#AAAA9F",
                      backgroundColor: "#F9F9F8",
                      borderRadius: 10,
                      padding: 3,
                    }}
                  >
                    <View style={{ flexDirection: "row", padding: 5 }}>
                      <View style={{ flexDirection: "row", padding: 1 }}>
                        <Text>{item.asset.asset_ref_no}</Text>
                        <Text> </Text>
                        <Text>({item.asset.quantity})</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          handleDelete(index);
                        }}
                      >
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            marginTop: 2,
                            marginLeft: 30,
                          }}
                          source={solidcancel}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </View>
        <Snackbar visible={visible1} onDismiss={onDismissSnackBar1}>
          There are no assets provided
        </Snackbar>
      </View>

      <StatusBar translucent={false} style="auto" backgroundColor="#F9F9F8" />

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
          if (assetDetails.length == 0) {
            return onToggleSnackBar1();
          }
          navigation.navigate("SeventhSlide");
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

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="default"
      />
    </ScrollView>
  );
}

export default FifthSlide;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "700",
    paddingLeft: 15,
    paddingTop: 15,
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
