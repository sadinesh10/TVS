import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import left from "./vehicle_left.png";
import right from "./vehicle_right.png";
import numberPlate from "./AB12.png";
import calendar from "./date-solid.png";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import { setHoldDispatch } from "../redux/mainDataSlice";

const array = [
  "S.No",
  "PE Category",
  "HSN Number",
  "Qauntity",
  "Rate",
  "Weight(KG)",
];
const array3 = [
  "S.No",
  "Assert Number",
  "Quantity",
  "Reference 1",
  "reference 2",
];

function SeventhSlide({ navigation }) {
  const [open, SetOpen] = useState(true);

  const {
    userData,
    projectSecurityId,
    selectedFrom,
    selectedTo,
    date_time,
    vehicleNo,
    driverNo,
    lrNo,
    assetsProjectName,
    assetsSelectedProjectName,
    assetDetails,
    transaction_id,
  } = useSelector((state) => state.mainReducer);
  console.log(userData)
  console.log("Details" + JSON.stringify(assetDetails));
  const total_qunatity = assetDetails.reduce((total, current) => {
    return total + current.asset.quantity;
  }, 0);
  const total_cost = assetDetails.reduce((total, current) => {
    return total + current.asset.cost;
  }, 0);
  const total_weight = assetDetails.reduce((total, current) => {
    return total + current.asset.asset_weight;
  }, 0);
  const array2 = ["Total", total_qunatity, total_cost, total_weight];

  const generate = async () => {
    try {
      SetOpen(true)
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
      formData.append("current_status", 1);
      formData.append("transaction_type", "m");
      formData.append("created_by", userData.security_id);
      formData.append("update_date_time", date_time);
      formData.append("remark", "");
      formData.append("driver_no", driverNo);
      formData.append("challan_file", "");
      formData.append("transaction_id", transaction_id ? transaction_id : "");
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
      if (hold.errMessage) {
        Alert.alert(JSON.stringify(hold?.errMessage));
      } else {
        null;
      }
      //dispatch(setHoldDispatch([...holdDispatch, hold]));

      console.log("Dispatch_Hold" + JSON.stringify(hold));
      console.log("String" + JSON.stringify(hold));
      SetOpen(false)
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  return (
    <ScrollView
      width="100%"
      height="100%"
      style={{ backgroundColor: "#F9F9F8" }}
      contentContainerStyle={{
        paddingBottom: 80,
      }}
    >
      <StatusBar translucent={false} style="auto" backgroundColor="#F9F9F8" />

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            navigation.navigate("FifthSlide");
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
            paddingRight: 10,
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
                  {selectedFrom.location_name}
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
                <Text style={{ fontSize: 15, fontWeight: "800" }}>
                  {selectedTo.location_name}
                </Text>
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
                    {vehicleNo}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row", paddingRight: 35 }}>
                <Image
                  style={{
                    width: 23,
                    height: 20,
                    marginTop: 13,
                    marginBottom: 10,
                    marginHorizontal: 23,
                    marginLeft: 10,
                  }}
                  source={calendar}
                ></Image>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontWeight: "400", color: "#1b2b99" }}>
                    OC Date
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "800" }}>
                    {date_time}
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
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingVertical: 6,
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
                      flex: 1,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "300" }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View>
              {assetDetails.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{ flexDirection: "row", paddingVertical: 5 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        paddingRight: 20,
                        paddingLeft: 40,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.asset.asset_name}
                      </Text>
                    </View>
                    {item.assettype[0].hsn_code != null ? (
                      <View
                        style={{
                          flex: 1,

                          paddingLeft: 25,
                          paddingRight: 40,
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ fontWeight: "300", textAlign: "left" }}>
                          {item.assettype[0].hsn_code}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flex: 1,

                          paddingLeft: 25,
                          paddingRight: 40,
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ fontWeight: "300", textAlign: "left" }}>
                          {item.asset_type.hsn_code}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.asset.quantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 35,
                        paddingRight: 20,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.asset.cost*item.asset.quantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 60,
                        paddingRight: 20,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.asset.asset_weight}
                      </Text>
                    </View>
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
                borderBottomRightRadius: 20,
                paddingVertical: 5,
              }}
            >
              {array2.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingLeft: 34,
                      paddingRight: 37,
                      paddingTop: 5,
                      paddingBottom: 5,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "300",
                        textAlign: "left",
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
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  paddingVertical: 6,
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
              <View>
                {assetDetails.map((item, index) => {
                  return (
                    <View key={index} style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          flex: 1,
                          paddingRight: 20,
                          paddingLeft: 35,
                          paddingTop: 10,
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ fontWeight: "300", textAlign: "left" }}>
                          {index + 1}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,

                          paddingLeft: 50,
                          paddingRight: 30,
                          paddingTop: 10,
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ fontWeight: "300", textAlign: "left" }}>
                          {item.asset.asset_name}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,

                          paddingLeft: 30,
                          paddingRight: 30,
                          paddingTop: 10,
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ fontWeight: "300", textAlign: "left" }}>
                          {item.asset.quantity}
                        </Text>
                      </View>
                      <TextInput
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          width: 100,
                          borderRadius: 10,
                          paddingVertical: 6,
                        }}
                      ></TextInput>
                      <TextInput
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          width: 100,
                          borderRadius: 10,
                          paddingVertical: 6,
                        }}
                      ></TextInput>
                    </View>
                  );
                })}
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
            marginBottom: 5,
            marginRight: 15,
            borderWidth: 1,
            borderColor: "#AAAA9F",
            backgroundColor: "white",
            borderRadius: 8,
            paddingBottom: 150,
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
            marginHorizontal: 30,
          }}
          onPress={() => {
            generate();
            navigation.pop(4);
            navigation.navigate("EightSlide");
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
        {!open ? (
          <Modal visible={open} transparent={true} style={{}}>
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
                  borderRadius: 16,
                  elevation: 8,
                  backgroundColor: "white",
                }}
              >
                <ActivityIndicator
                  size={"large"}
                  color="blue"
                ></ActivityIndicator>
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
    </ScrollView>
  );
}

export default SeventhSlide;

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
