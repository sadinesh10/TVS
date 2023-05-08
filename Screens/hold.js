import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import {
  setAssetDetails,
  setDateTime,
  setHoldList,
  setProjectSecurityId,
  setSelectedFrom,
  setSelectedTo,
  setTransactionId,
  setVehicleNo,
} from "../redux/mainDataSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function Hold() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { projectSecurityId, holdList, selectedFrom, date_time, userData } =
    useSelector((state) => state.mainReducer);
  const holdListPrase = JSON.parse(holdList);
  const dispatch = useDispatch();
  //console.log(holdList);

  const [open, SetOpen] = useState(false);

  useEffect(() => {
    holdListInfo();
  }, [isFocused]);

  const holdListInfo = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);
      SetOpen(true);
      const holdList = await axios.post(
        "http://vulcantunnel.com:5007/user/transaction/list",
        {
          customer_security_id: projectSecurityId,
          current_status: 1,
          hold_list: 1,
          index: "",
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      SetOpen(false);
      const details = holdList.data;
      dispatch(setHoldList(JSON.stringify(details)));
      console.log("sub" + JSON.stringify(details));
    } catch (e) {
      Alert.alert(e?.message);
    }
  };

  const holdDetails = async ({ transaction_id, vechicle_no }) => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);

      const holdDetails = await axios.post(
        "http://vulcantunnel.com:5007/user/transaction/getdetails",
        {
          transaction_id: transaction_id,
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      const details = holdDetails?.data;
      console.log(details);

      dispatch(setTransactionId(transaction_id));
      dispatch(
        setAssetDetails(
          details?.dispatchitems.map((value) => {
            return {
              ...value,
              assettype: [
                {
                  assettype: value.asset_type,
                },
              ],
            };
          })
        )
      );
      console.log(
        JSON.stringify({
          location_id: details.from_location_id,
          location_name: details.from_location_name,
        })
      );
      dispatch(
        setSelectedFrom({
          location_id: details.from_location_id,
          location_name: details.from_location_name,
        })
      );
      dispatch(setVehicleNo(vechicle_no));
      dispatch(setDateTime(details.update_date_time));
      dispatch(setProjectSecurityId(details.customer_security_id));
      dispatch(
        setSelectedTo({
          location_name: details.to_location_name,
        })
      );
      navigation.navigate("FifthSlide");
    } catch (e) {
      Alert.alert(e?.message);
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#F9F9F8" }}>
        {open ? (
          <Modal visible={open} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  padding: 15,
                  backgroundColor: "white",
                  elevation: 8,
                  borderRadius: 16,
                }}
              >
                <ActivityIndicator
                  size={"large"}
                  color="blue"
                ></ActivityIndicator>
              </View>
            </View>
          </Modal>
        ) : (
          <View style={{ flex: 1, backgroundColor: "#F9F9F8" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={styles.menu}
                onPress={() => {
                  navigation.navigate("FirstSlide");
                  console.log("hello");
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
            <Text style={{ fontSize: 22, fontWeight: "900", margin: 20 }}>
              Hold List
            </Text>
            {holdListPrase?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    margin: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: "white",
                    padding: 9,
                    borderColor: "#AAAA9F",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 23,
                      fontWeight: "800",
                      paddingTop: 10,
                    }}
                  >
                    {item?.reference_number}
                  </Text>
                  <View style={{ marginTop: 15 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          marginHorizontal: 10,
                          width: "50%",
                        }}
                      >
                        <Image
                          source={require("../Screens/vehicle_right.png")}
                          style={{
                            width: 30,
                            height: 30,
                            marginTop: 5,
                            marginRight: 15,
                          }}
                        />
                        <View>
                          <Text style={{ color: "#243a72", fontWeight: "800" }}>
                            From
                          </Text>
                          <Text style={{ fontSize: 15, fontWeight: "800" }}>
                            {item.from_location_name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "flex-start",
                          width: "50%",
                        }}
                      >
                        <Image
                          source={require("../Screens/vehicle_left.png")}
                          style={{
                            width: 30,
                            height: 30,
                            marginTop: 5,
                            marginRight: 15,
                          }}
                        />
                        <View>
                          <Text style={{ color: "#243a72", fontWeight: "800" }}>
                            To
                          </Text>
                          <Text style={{ fontSize: 15, fontWeight: "800" }}>
                            {item.to_location_name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 2,
                        paddingTop: 25,
                        paddingBottom: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "#243a72",
                          fontWeight: "800",
                          fontSize: 16,
                          marginTop: 2,
                        }}
                      >
                        {item.transaction_status}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            borderRadius: 6,
                            marginRight: 15,
                            borderColor: "#AAAA9F",
                          }}
                          onPress={() => {
                            console.log("hello");
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "900",
                              padding: 3,
                            }}
                          >
                            Delete
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            borderRadius: 6,
                            marginRight: 5,
                            borderColor: "#AAAA9F",
                          }}
                          onPress={() => {
                            console.log("hello");

                            try {
                              const transaction_id = item.transaction_id;
                              const vechicle_no = item.vehicle_no;
                              holdDetails({
                                transaction_id: transaction_id,
                                vechicle_no: vechicle_no,
                              });
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "900",
                              padding: 3,
                            }}
                          >
                            Resume
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}

            <View style={{ paddingBottom: 60 }}></View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

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
