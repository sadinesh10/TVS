import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import pause from "./pause-outline-filled.png";
import edit from "./edit-solid-1.png";
import { BarCodeScanner } from "expo-barcode-scanner";
import solidcancel from "./android-cancel.png";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles } from "../util";
import {
  setAssetDetails,
  setAssetsSelectedProjectName,
  setHoldDispatch,
  setRecievedSelectedDCAssets,
  setRecievedSelectedDCDetails,
} from "../redux/mainDataSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import cross from "./cancel.png";
import { Snackbar } from "react-native-paper";

const SCREEN_WIDTH = Dimensions.get("window").width;

function Scan_Third({ navigation }) {
  const dispatch = useDispatch();
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
    recieve_selected_dc_number,
    recieve_selected_dc_details,
    recieve_selected_dc_assets

  } = useSelector((state) => state.mainReducer);
  console.log("Asset Details"+recieve_selected_dc_assets)
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [assert, setAssert] = useState([]);
  const [edited, seteEdited] = useState(false);
  const [manual, setManual] = useState("");
  const [open4, setOpen4] = useState(false);
  const [duplicateAsset, setDuplicateAsset] = useState(null);
  const [showBackModel, setBackModel] = useState(false);
  const [dispatcholdButton, setDispatchholdButton] = useState(false);
  const [AssetScanned, setAssetScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = setTimeout(() => {
    setVisible(false);
  }, 2000);
  const handleAddAssert = (scannedAssetId) => {
    const updatedArray = [...assert, scannedAssetId];
    setAssert(updatedArray);
    seteEdited(false);
  };

  const handledelete = (i) => {
    const deleteassert = [...assetDetails];
    deleteassert.splice(i, 1);
    //setAssert(deleteassert);
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    handleAddAssert(data);
    dispatch(setAssetsSelectedProjectName(data));
    assetsQunatity(data);

    // setAssert([...assert, data])
    const assetDetailsIncludes = assetDetails?.some((value, index) => {
      return value.asset.asset_ref_no == data;
    });
    if (assetDetailsIncludes) {
      setDuplicateAsset(data);
    } else {
      assetsQunatity();
    }
    console.log("hello");
  };

  // const assetsQunatity = async (dupasset, modifiedAssets) => {
  //   console.log("asset quantity: " + dupasset);

  //   try {
  //     const userDataString = await AsyncStorage.getItem(
  //       AsyncStorageKeys.userData
  //     );
  //     const userData = JSON.parse(userDataString);

  //     const SelectedAssetQuantity = await axios.post(
  //       "http://vulcantunnel.com:5007/user/assets/assetdata",
  //       {
  //         asset_ref_no: dupasset || assetsSelectedProjectName,
  //         customer_security_id: projectSecurityId,
  //         from_location_id: selectedFrom.location_id,
  //         create_date_time: date_time,
  //       },
  //       {
  //         headers: {
  //           "x-access-token": userData?.token,
  //           "device-type": "MOBILE",
  //         },
  //       }
  //     );
  //     const details = SelectedAssetQuantity?.data;
  //     if (modifiedAssets) {
  //       dispatch(setAssetDetails([...modifiedAssets, details]));
  //     } else {
  //       dispatch(setAssetDetails([...assetDetails, details]));
  //     }
  //     console.log("sub" + JSON.stringify(details));
  //     setTimeout(() => {
  //       setScanned(false);
  //     }, 4000);
      
  //   } catch (e) {
  //     Alert.alert(e?.message);
  //   }
  // };
  const DCDetails = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);

      const Recieve_Details = await axios.post(
        "http://vulcantunnel.com:5007/user/transaction/getDetails",
        {
          reference_number: recieve_selected_dc_number,
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
      dispatch(setRecievedSelectedDCDetails(details))
      RecieveAsset()
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  const RecieveAsset = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);

      const Recieve_Details = await axios.post(
        "http://vulcantunnel.com:5007/user/transaction/getDetails",
        {
          transaction_id:recieve_selected_dc_details.dispatchitems[0].transaction_id,
          asset_ref_no:recieve_selected_dc_details.dispatchitems[0].asset_ref_no
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const details = Recieve_Details?.data;
      console.log("Recieve Assets"+JSON.stringify(details));
      dispatch(setRecievedSelectedDCAssets(details))
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  useEffect(() => {
    DCDetails()
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
      formData.append("current_status", "4");
      formData.append("transaction_type", "q");
      formData.append("created_by", projectSecurityId);
      formData.append("update_date_time", date_time);
      formData.append("remark", "");
      formData.append("driver_no", driverNo);
      formData.append("challan_file", "");
      formData.append("transaction_id",transaction_id? transaction_id : "" );
      formData.append("assets", assetsString);
     
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
  return (
    <ScrollView
      // width="100%"
      // height="100%"
      style={{ backgroundColor: "#F9F9F8" }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles1.menu}
          onPress={() => {
            if (assetDetails.length != 0) {
              return setBackModel(true);
            }
            navigation.navigate("Recieve_Scan_First");
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
                          navigation.pop(1);
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
                          setDispatchholdButton(false);
                          setAssetScanned(true)
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
                          navigation.pop(2);
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
      <View style={{ marginTop: 18, flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "900",
            marginLeft: 120,
            marginRight: 30,
          }}
        >
          Scan QR
        </Text>
        <TouchableOpacity onPress={()=>{
            setDispatchholdButton(true)

        }}>
          <Image
            style={{
              width: 20,
              height: 20,
              marginTop: 6,
              marginLeft: 18,
              marginRight: 5,
              justifyContent: "flex-end",
            }}
            source={pause}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            seteEdited(true);
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              marginTop: 6,
              marginLeft: 18,
              marginRight: 5,
              justifyContent: "flex-end",
            }}
            source={edit}
          ></Image>
          <Modal visible={edited} style={{ elevation: 8 }} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
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
                  Add assert
                </Text>

                <View
                  style={{
                    borderWidth: 1,
                    paddingTop: 5,
                    paddingLeft: 10,
                    paddingBottom: 5,
                    paddingRight: 80,
                    borderColor: "#AAAA9F",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      justifyContent: "flex-start",
                    }}
                  >
                    Add assert
                  </Text>

                  <TextInput
                    onChangeText={(value) => {
                      setManual(value);
                    }}
                    style={{ alignSelf: "center" }}
                    placeholder="ex: MDA- A00000589"
                    value={manual}
                  ></TextInput>
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
                      seteEdited(false);
                    }}
                  >
                    <Text style={{ marginHorizontal: 5, color: "#243a70" }}>
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
                          handleAddAssert(manual);
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
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <View
          style={{
            // width: "100%",
            // alignItems: "center",
            // paddingTop: 180,
            // paddingBottom: 180,
            // marginTop: 20,
            // marginBottom: 20,
            // marginHorizontal: 19,
            // marginVertical: 15,
            // paddingLeft: 320,
            // paddingTop: 320,
            // alignSelf: "flex-start",
            alignItems: "center",
            justifyContent: "center",
            height: 370,
            width: 330,
            overflow: "hidden",
            borderRadius: 15,
            backgroundColor: "tomato",
          }}
        >
          {/* <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              // width: SCREEN_WIDTH * 0.9,
              // height: SCREEN_WIDTH * 1.0,
              height: 400,
              width: 400,
            }}
          /> */}
        </View>
        <Modal visible={!!duplicateAsset} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              borderRadius: 5,
            }}
          >
            <View
              style={{
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
                  The Asset with ID {duplicateAsset}. has already added. Do you
                  really want to replace it
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
      </View>

      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          paddingBottom: 5,
          paddingRight: 5,
          paddingTop: 4,
        }}
        onPress={() => {
          setOpen4(true);
        }}
      >
        <Text style={{ color: "#1b2b99", marginBottom: 5, marginRight: 15 }}>
          view all
        </Text>
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
                          handledelete(index);
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
      <View style={{ paddingBottom: 40, alignItems: "center" }}>
        <FlatList
          data={assetDetails.slice(0, 4)}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginHorizontal: 5,
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
                        handledelete(index);
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
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
            There are no assets entered.
          </Snackbar>
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
          if (assetDetails.length==0) {
            return onToggleSnackBar();
          }
          navigation.navigate("Recieve_Scan_Third");
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
      <StatusBar translucent={false} style="auto" backgroundColor="#F9F9F8" />
    </ScrollView>
  );
}

export default Scan_Third;

const styles1 = StyleSheet.create({
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
