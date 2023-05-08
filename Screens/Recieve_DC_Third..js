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
import calendar from "./date-solid.png";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../AsyncStorageKeys";
import axios from "axios";

const array = [
  "S.No",
  "PE Category",
  "HSN Number",
  "Qauntity",
  "Rate",
  "Weight(KG)",
];
const array1 = ["1", "FMC-MBA", "73102990", "2", "35000", "210.00"];
const array3 = [
  "S.No",
  "Assert Number",
  "Quantity",
  "Reference 1",
  "reference 2",
];
const array4 = ["1", "FMC-MB400002", "8"];

function Recieve_DC_Third({ navigation }) {
  const [open, SetOpen] = useState(true);

  const {
    recieve_dc_number,
    transaction_id,
    recieve_date_time,
    projectSecurityId,
    userData,
  } = useSelector((state) => state.mainReducer);
  console.log("data" + recieve_dc_number);

  const total_qunatity = recieve_dc_number.reduce((total, current) => {
    return total + current.dispatchitems[0].asset.quantity;
  }, 0);
  const total_cost = recieve_dc_number.reduce((total, current) => {
    return total + current.dispatchitems[0].asset.cost;
  }, 0);
  const total_weight = recieve_dc_number.reduce((total, current) => {
    return total + current.dispatchitems[0].asset.asset_weight;
  }, 0);
  const array2 = ["Total", total_qunatity, total_cost, total_weight];

  const generate = async () => {
    try {
      SetOpen(true);
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );

      const assetsString = JSON.stringify(
        recieve_dc_number.map((value, index) => {
          return {
            transaction_item_id: value.dispatchitems[0].transaction_item_id,
            asset_ref_no: value.dispatchitems[0].asset.asset_name,
            quantity: value.dispatchitems[0].asset.quantity,
            is_valid: 1,
            cost: value.dispatchitems[0].asset.cost,
            subassets: value.dispatchitems[0].subassets.map((element, key) => {
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
      console.log("AssetData" + assetsString);

      const userData = JSON.parse(userDataString);
      console.log(
        JSON.stringify({
          challan_data: "",
          customer_security_id: recieve_dc_number[0].customer_security_id,
          from_location_id: recieve_dc_number[0].from_location_id,
          to_location_id: recieve_dc_number[0].to_location_id,
          transaction_status_id: 2,
          transaction_type: "M",
          created_by: userData.security_id,
          update_date_time: "2023-05-02 10:09:00",
          remark: "",
          transaction_id: recieve_dc_number[0]?.transaction_id,
          assets: recieve_dc_number.map((value, index) => {
            return {
              // transaction_item_id: value.dispatchitems[0].transaction_item_id,
              // asset_ref_no: value.dispatchitems[0].asset.asset_name,
              // quantity: value.dispatchitems[0].asset.quantity,
              // is_valid: "1",
              // cost: value.dispatchitems[0].asset.cost,
              asset_id: 4,
              asset_name: "BD-0003",
              asset_type_id: 2,
              index_no: 3,
              asset_ref_no: "BD-0003",
              quantity: 1,
              asset_format: "S",
              purchase_date_time: "2023-04-18 14:51:00",
              expiry_time: "2023-10-18",
              item_name: "",
              no_of_cycles: 0,
              status: "1",
              create_date_time: "2023-04-18 14:52:43",
              org_id: 0,
              created_by: 1,
              barcode_status: "0",
              asset_weight: 23,
              cost: 100,
              qrlabel_url:
                "https://traklyt-dev.s3.ap-south-1.amazonaws.com/qrlabel_BD-0003_17682285.png",
              deleted_by: 0,
              updated_by: 0,
              updated_date_time: null,
              deleted_date_time: null,
              migrate_yes: "0",
              active_status: "1",
              auto_expiry: "0",
              active_updated_by: 0,
              active_updated_date_time: null,
              subassets: value.dispatchitems[0].subassets.map(
                (element, key) => {
                  return {
                    // sub_asset: element.sub_asset,
                    // quantity: element.quantity,
                    // actual_quantity: element.actual_quantity,
                    // subasset_hsn_code: element.subasset_hsn_code,
                    // subasset_rate: element.subasset_rate,
                    // transaction_item_id:element.transaction_item_id
                    id: 31,
                    transaction_item_id: 31,
                    sub_item: "paracetmol powder",
                    quantity: 50,
                    subasset_hsn_code: "PC23132",
                    subasset_rate: 100,
                    actual_quantity: 50,
                    status: "1",
                    deleted_by: 0,
                    deleted_date_time: null,
                    sub_asset: "paracetmol powder",
                  };
                }
              ),
            };
          }),
        })
      );
      console.log(
        JSON.stringify({
          "x-access-token": userData?.token,
          "device-type": "MOBILE",
        })
      );
      const Recieve = await axios.post(
        "http://vulcantunnel.com:5007/user/transaction/receipt/add",
        {
          challan_data: "",
          customer_security_id: recieve_dc_number[0].customer_security_id,
          from_location_id: recieve_dc_number[0].from_location_id,
          to_location_id: recieve_dc_number[0].to_location_id,
          transaction_status_id: 2,
          transaction_type: "m",
          created_by: userData.security_id,
          update_date_time: "2023-05-02 12:43:00",
          remark: "",
          transaction_id: recieve_dc_number[0]?.transaction_id,
          assets: JSON.stringify(
            recieve_dc_number.map((value, index) => {
              return {
                transaction_item_id: value.dispatchitems[0].transaction_item_id,
                asset_ref_no: value.dispatchitems[0].asset.asset_name,
                quantity: value.dispatchitems[0].asset.quantity,
                is_valid: "1",
                cost: value.dispatchitems[0].asset.cost,
                subassets: value.dispatchitems[0].subassets.map(
                  (element, key) => {
                    return {
                      id: element.id,
                      sub_item: element.sub_item,
                      sub_asset: element.sub_asset,
                      quantity: element.quantity,
                      actual_quantity: element.actual_quantity,
                      subasset_hsn_code: element.subasset_hsn_code,
                      subasset_rate: element.subasset_rate,
                      transaction_item_id: element.transaction_item_id,
                      status: element.status,
                      deleted_by: element.deleted_by,
                      deleted_date_time: element.deleted_date_time,
                    };
                  }
                ),
              };
            })
          ),
        },
        {
          headers: {
            "x-access-token": userData?.token,
            "device-type": "MOBILE",
          },
        }
      );
      console.log("DC_Recieve: ", JSON.stringify(Recieve));

      let DC_Recieve = Recieve.data;
      console.log("DC_Recieve: ", DC_Recieve);

      // if (DC_Recieve.errMessage) {
      //   Alert.alert(JSON.stringify(DC_Recieve?.errMessage));
      // } else {
      //   null;
      // }
      //dispatch(setHoldDispatch([...holdDispatch, hold]));

      console.log("Recieve" + JSON.stringify(DC_Recieve));
      SetOpen(false);
    } catch (e) {
      const response = e.response;
      console.log("Error : ", e?.response?.errMessage);
      Alert.alert(e.message + ":" + e);
      console.log(Alert.alert(e.message + ":" + e))
    }
  };
  return (
    <ScrollView
      width="100%"
      height="100%"
      style={{ backgroundColor: "#F9F9F8" }}
      contentContainerStyle={{
        paddingBottom: 90,
      }}
    >
      <StatusBar translucent={false} style="auto" backgroundColor="white" />
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            navigation.navigate("Recieve_DC_Second");
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
            fontWeight: "800",
            marginTop: 28,
            marginLeft: 15,
          }}
        >
          Good Recieve Notes
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "#AAAA9F",
            backgroundColor: "white",
            margin: 20,
            paddingBottom: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}
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
                  {recieve_dc_number[0].from_location_name}
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
                <Text
                  style={{ fontSize: 15, fontWeight: "800", paddingRight: 30 }}
                >
                  {recieve_dc_number[0].to_location_name}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 13,
                    marginBottom: 10,
                    marginHorizontal: 10,
                    marginLeft: 10,
                  }}
                  source={calendar}
                ></Image>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontWeight: "400", color: "#1b2b99" }}>
                    OC Date
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "800" }}>
                    {recieve_date_time}
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
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              {array.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingLeft: 30,
                      paddingRight: 30,
                      paddingTop: 13,
                      paddingBottom: 13,
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
              {recieve_dc_number.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 40,
                        paddingRight: 37,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 0,
                        paddingRight: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.dispatchitems[0].asset.asset_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 40,
                        paddingRight: 40,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.dispatchitems[0].asset_type.hsn_code}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 60,
                        paddingRight: 37,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.dispatchitems[0].asset.quantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 40,
                        paddingRight: 37,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.dispatchitems[0].asset.cost}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,

                        paddingLeft: 40,
                        paddingRight: 37,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "300", textAlign: "left" }}>
                        {item.dispatchitems[0].asset.asset_weight}
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
                borderBottomRightRadius: 10,
              }}
            >
              {array2.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingLeft: 30,
                      paddingRight: 40,
                      paddingTop: 10,
                      paddingBottom: 10,
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

        <View style={{}}>
          <View
            style={{
              marginTop: 30,
              marginLeft: 15,
              marginBottom: 50,
              marginRight: 15,
              borderWidth: 1,
              borderColor: "#AAAA9F",
              backgroundColor: "white",
              borderRadius: 8,
              paddingBottom:80,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <TextInput placeholder="Remarks (Optional"></TextInput>
          </View>
          <View>
            <Pressable
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 10,
                backgroundColor: "#243a70",
                marginTop: 40,
                marginHorizontal: 30,
              }}
              onPress={() => {
                generate();
                navigation.pop(2);
                navigation.navigate("Recieve_DC_Fourth");
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
        </View>
      </View>
    </ScrollView>
  );
}

export default Recieve_DC_Third;

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
