import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorageKeys from "../AsyncStorageKeys";
import axios from "axios";
import { setRecentTransactions } from "../redux/mainDataSlice";
import { useIsFocused } from "@react-navigation/native";

export default function Recent_Transactions() {
  const { projectSecurityId, recentTransactions } = useSelector(
    (state) => state.mainReducer
  );
  //const data = JSON?.parse(recentTransactions);
  const [open, SetOpen] = useState(true);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    RecentTransactions();
  }, [isFocused]);

  const RecentTransactions = async () => {
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
          current_status: "",
          hold_list: 0,
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
      const details = holdList?.data;
      dispatch(setRecentTransactions(details));
      console.log(details)
    } catch (e) {
      Alert.alert(e?.message);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "#F9F9F8" }}>
      {open ? (
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
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: "900", margin: 20 }}>
            Recent Transactions
          </Text>
          {recentTransactions.map((item, index) => {
            return (
              <View
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "white",
                  padding: 9,
                  borderColor: "#AAAA9F",
                }}
                key={index}
              >
                {item.company_name ? (
                  <Text
                    style={{
                      color: "#243a72",
                      fontSize: 14,
                      fontWeight: "900",
                    }}
                  >
                    {item.company_name}
                  </Text>
                ) : null}

                <View
                  style={{
                    marginTop: 3,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {item.challan_number ? (
                    <View>
                      <Text
                        style={{
                          color: "#243a72",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        DC Number
                      </Text>
                      <Text style={{ fontSize: 16, fontWeight: "900" }}>
                        {item.challan_number}
                      </Text>
                    </View>
                  ) : null}
                  {item.grn_challan_number ? (
                    <View>
                      <Text
                        style={{
                          color: "#243a72",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        GRN Number
                      </Text>
                      <Text style={{ fontSize: 16, fontWeight: "900" }}>
                        {item.grn_challan_number}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={{ marginTop: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {item.from_location_name ? (
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
                    ) : null}
                    {item.to_location_name ? (
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
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <View style={{ marginTop: 10, width: "50%" }}>
                      <View>
                      <Text style={{ color: "#243a72", fontWeight: "800" }}>
                          Dispatch Date
                        </Text>
                        {item.current_status == 1 ||
                        item.current_status == 3 ? (
                        <View>
                          <Text style={{ fontWeight: "300" }}>
                            {item.update_date_time}
                          </Text>
                        </View>
                          
                        ) : (
                          <Text style={{ fontWeight: "300" }}>
                            {item.create_date_time}
                          </Text>
                        )}
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#243a72", fontWeight: "800" }}>
                          Quantity
                        </Text>
                        <Text style={{ fontWeight: "300", marginLeft: 3 }}>
                          {item.quantity}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: 0,
                        marginTop: 10,
                        marginBottom: 8,
                        marginRight: 15,
                        width: "50%",
                        alignSelf: "flex-start",
                        paddingRight: 10
                      }}
                    >
                      {item.current_status == 2 || item.current_status == 4 ? (
                        <View>
                          <Text style={{ color: "#243a72", fontWeight: "800" }}>
                            Recieve Date
                          </Text>
                          <Text style={{ fontWeight: "300" }}>
                            {item.create_date_time}
                          </Text>
                        </View>
                      ) : null}
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#243a72", fontWeight: "800" }}>
                          Vehicle Number
                        </Text>
                        <Text style={{ fontWeight: "300", marginLeft: 3 }}>
                          {item.vehicle_no}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginRight: 10,
                    }}
                  >
                    {item.dc_report_url ? (
                      <Pressable
                        style={{
                          borderRadius: 6,
                          backgroundColor: "#243a70",
                          padding: 7,
                          width: "30%",
                        }}
                        onPress={() => {
                          {
                            item.dc_report_url;
                          }
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: "900",
                            color: "white",
                          }}
                        >
                          Download DC
                        </Text>
                      </Pressable>
                    ) : null}

                    {item.grn_report_url ? (
                      <Pressable
                        style={{
                          borderRadius: 6,
                          backgroundColor: "#243a70",
                          padding: 7,
                          width: "35%",
                          marginLeft: 15,
                        }}
                        onPress={() => {
                          {
                            item.grn_report_url;
                            console.log(item.grn_report_url);
                          }
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: "900",
                            color: "white",
                          }}
                        >
                          Download GRN
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
                <Text
                  style={{
                    color: "#243a72",
                    fontWeight: "800",
                    margin: 5,
                    marginTop: 10,
                  }}
                >
                  {item.transaction_status}
                </Text>
              </View>
            );
          })}

          <View style={{ padding: 60 }}></View>
        </ScrollView>
      )}
    </ScrollView>
  );
}
