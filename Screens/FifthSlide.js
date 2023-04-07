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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
import { Ionicons } from "react-native-vector-icons";

import { StatusBar } from "expo-status-bar";

function FifthSlide({ navigation }) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [from, setFrom] = useState("Select from");
  const [select1, setSelect1] = useState("Select here");
  const [select2, setSelect2] = useState("Select here");
  const [select3, setSelect3] = useState("");
  const [assertNumber, setAssertNumber] = useState(0);
  const [quantityNumber, setQuantityNumber] = useState(0);
  const [to, setTo] = useState("Select to");
  const [list, setList] = useState(false);
  const [assert, setAssert] = useState([]);

  const handleAddAssert = () => {
    const updatedArray = [...assert, [select3]];
    setAssert(updatedArray);
  };

  const handledelete = (i) => {
    const deleteassert = [...assert];
    deleteassert.splice(i, 1);
    setAssert(deleteassert);
  };

  const array = [
    "FMC-1235467",
    "FMC-8366493",
    "FMC-8298893",
    "FMC-9203708",
    "FMC-2908488",
    "FMC-9032389",
    "FMC-9203840",
    "FMC-3982874",
    "FMC-0298490",
    "FMC-0239832",
    "FMC-9230488",
    "FMC-9203840",
    "FMC-9024804",
    "FMC-2904803",
    "FMC-9238472",
    "FMC-0929348",
    "FMC-3897894",
    "FMC-3984748",
    "FMC-9208479",
    "FMC-8934798",
    "FMC-3987938",
    "FMC-9834724",
    "FMC-9834474",
    "FMC-8937498",
  ];
  return (
    <View>
      <View width="100%" height="100%" style={{ backgroundColor: "#F9F9F8" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={styles.menu}
            onPress={() => {
              navigation.navigate("FourthSlide");
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
              marginTop: 20,
              marginRight: 10,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "#AAAA9F",
              borderRadius: 15,
              backgroundColor: "white",
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
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
                      marginTop: 13,
                      marginLeft: 18,
                    }}
                    source={qr}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 13,
                      marginLeft: 18,
                      marginRight: 7,
                    }}
                    source={pause}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  setOpen1(true);
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    marginTop: 20,
                    marginRight: 5,
                    marginLeft: 5,
                    borderWidth: 1,
                    borderColor: "#AAAA9F",
                    borderRadius: 15,
                    paddingRight: 14,
                    paddingTop: 3,
                    paddingBottom: 14,
                    paddingLeft: 6,
                    flexDirection: "row",
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <Image
                    style={{
                      width: 39,
                      height: 35,
                      marginTop: 13,
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
                    <Text style={{ fontSize: 18 }}>{from}</Text>
                  </View>
                </View>
                <Modal visible={open1}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen1(false);
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
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 12,
                        marginStart: 15,
                        marginRight: 15,
                        marginTop: 20,
                        marginBottom: 20,
                        paddingTop: 1,
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingBottom: 15,
                        borderColor: "#AAAA9F",
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: "400" }}>
                        From
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {select1}
                      </Text>
                    </View>
                    <FlatList
                      data={array}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setSelect1(item.toUpperCase());
                              setFrom(item.toUpperCase());
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
                </Modal>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOpen2(true);
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    marginRight: 5,
                    marginLeft: 5,
                    borderWidth: 1,
                    borderColor: "#AAAA9F",
                    borderRadius: 15,
                    backgroundColor: "white",
                    paddingRight: 14,
                    paddingTop: 3,
                    paddingBottom: 14,
                    paddingLeft: 6,
                    flexDirection: "row",
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <Image
                    style={{
                      width: 39,
                      height: 35,
                      marginTop: 13,
                      alignSelf: "flex-start",
                    }}
                    source={left}
                  ></Image>
                  <View style={{ paddingLeft: 9 }}>
                    <Text
                      style={{
                        fontWeight: "200",
                        fontSize: 12,
                      }}
                    >
                      To
                    </Text>
                    <Text style={{ fontSize: 18 }}>{to}</Text>
                  </View>
                </View>
                <Modal visible={open2}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen2(false);
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
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 12,
                        marginStart: 15,
                        marginRight: 15,
                        marginTop: 20,
                        marginBottom: 20,
                        paddingTop: 1,
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingBottom: 15,
                        borderColor: "#AAAA9F",
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: "400" }}>
                        To
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {select2}
                      </Text>
                    </View>
                    <FlatList
                      data={array}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setSelect2(item.toUpperCase());
                              setTo(item.toUpperCase());
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
                </Modal>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOpen3(true);
                }}
              >
                <View
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    marginRight: 5,
                    marginLeft: 5,
                    borderWidth: 1,
                    borderColor: "#AAAA9F",
                    borderRadius: 15,
                    backgroundColor: "white",
                    paddingRight: 14,
                    paddingTop: 3,
                    paddingBottom: 16,
                    paddingLeft: 10,
                    flexDirection: "row",
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 15,
                      paddingLeft: 2,
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
                        fontSize: 18,
                      }}
                    >
                      {assertNumber}
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
                        }}
                      >
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            marginTop: 25,
                            marginLeft: 30,
                          }}
                          source={cross}
                        ></Image>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setOpen3(false);
                        }}
                      >
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            marginTop: 20,
                            marginRight: 30,
                          }}
                          source={tick}
                        ></Image>
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
                          paddingRight: 80,
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
                              style={{ fontSize: 18, fontWeight: "400" }}
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          handleAddAssert();
                        }}
                      >
                        <Ionicons
                          style={{ marginLeft: 10, marginRight: 10 }}
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
                        data={array}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setSelect3(item.toUpperCase());
                                setList(false);
                              }}
                            >
                              <View
                                style={{ marginLeft: 15, paddingBottom: 20 }}
                              >
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
                  <FlatList
                    data={assert}
                    renderItem={({ item, index }) => {
                      return (
                        <View key={index}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderRadius: 12,
                              marginStart: 15,
                              marginRight: 15,
                              marginTop: 20,
                              marginBottom: 20,
                              paddingTop: 5,
                              paddingLeft: 20,
                              paddingRight: 20,
                              paddingBottom: 7,
                              borderColor: "#AAAA9F",
                              flexDirection: "row",
                            }}
                          >
                            <Text style={{ fontSize: 18, marginTop: 20 }}>
                              {item}
                            </Text>
                            <View
                              style={{
                                borderWidth: 1,
                                borderRadius: 12,
                                marginLeft: 20,
                                marginRight: 0,
                                marginTop: 5,
                                marginBottom: 8,
                                paddingTop: 5,
                                paddingLeft: 20,
                                paddingRight: 50,
                                paddingBottom: 8,
                                borderColor: "#AAAA9F",
                              }}
                            >
                              <Text>Quantity</Text>
                              <TextInput placeholder="0"></TextInput>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                handledelete(index);
                              }}
                            >
                              <Image
                                style={{
                                  width: 15,
                                  height: 15,
                                  marginTop: 27,
                                  marginLeft: 20,
                                }}
                                source={cross}
                              ></Image>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    }}
                  ></FlatList>
                </Modal>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    marginRight: 5,
                    marginLeft: 5,
                    borderWidth: 1,
                    borderColor: "#AAAA9F",
                    borderRadius: 15,
                    backgroundColor: "white",
                    paddingRight: 14,
                    paddingTop: 3,
                    paddingBottom: 16,
                    paddingLeft: 10,
                    flexDirection: "row",
                    backgroundColor: "#F9F9F8",
                  }}
                >
                  <Image
                    style={{
                      width: 25,
                      height: 33,
                      marginTop: 15,
                      paddingLeft: 2,
                      alignSelf: "flex-start",
                    }}
                    source={line}
                  ></Image>
                  <View style={{ paddingLeft: 16 }}>
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
                        fontSize: 18,
                      }}
                    >
                      {quantityNumber}
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
              <Text style={{ color: "#1b2b99", marginBottom: 18 }}>
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
                  data={assert}
                  numColumns={2}
                  keyExtractor={(index) => index.toString()}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginVertical: 10,
                        }}
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
                              <Text>{item}</Text>
                              <Text>(0)</Text>
                            </View>
                            <Image
                              style={{
                                width: 20,
                                height: 20,
                                marginTop: 10,
                                marginLeft: 37,
                              }}
                              source={solidcancel}
                            ></Image>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                >

                </FlatList>
              </Modal>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  backgroundColor: "#F9F9F8",
                  borderRadius: 10,
                  padding: 5,
                  marginEnd: 6,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text>FMC-MIB</Text>
                    <Text>A0000037</Text>
                    <Text>(0)</Text>
                  </View>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 18,
                      marginLeft: 37,
                    }}
                    source={solidcancel}
                  ></Image>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  backgroundColor: "#F9F9F8",
                  borderRadius: 10,
                  padding: 5,
                  marginEnd: 6,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text>FMC-MIB</Text>
                    <Text>A0000037</Text>
                    <Text>(0)</Text>
                  </View>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 18,
                      marginLeft: 37,
                    }}
                    source={solidcancel}
                  ></Image>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 12,
                marginTop: 3,
              }}
            >
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  backgroundColor: "#F9F9F8",
                  borderRadius: 10,
                  padding: 5,
                  marginEnd: 6,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text>FMC-MIB</Text>
                    <Text>A0000037</Text>
                    <Text>(0)</Text>
                  </View>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 18,
                      marginLeft: 37,
                    }}
                    source={solidcancel}
                  ></Image>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderWidth: 1,
                  borderColor: "#AAAA9F",
                  backgroundColor: "#F9F9F8",
                  borderRadius: 10,
                  padding: 5,
                  marginEnd: 6,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text>FMC-MIB</Text>
                    <Text>A0000037</Text>
                    <Text>(0)</Text>
                  </View>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 18,
                      marginLeft: 37,
                    }}
                    source={solidcancel}
                  ></Image>
                </View>
              </View>
            </View>
          </View>
        </View>
        <StatusBar translucent={false} style="auto" backgroundColor="white" />

        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 10,
            backgroundColor: "#243a70",
            margin: 20,
          }}
          onPress={() => {
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
      </View>
    </View>
  );
}

export default FifthSlide;

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
