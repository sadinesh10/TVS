import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import header from "./header_common.png";
import pause from "./pause-outline-filled.png";
import edit from "./edit-solid-1.png";
import { BarCodeScanner } from "expo-barcode-scanner";
import solidcancel from "./android-cancel.png";

const SCREEN_WIDTH = Dimensions.get("window").width;

function Scan_Third({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [assert, setAssert] = useState([]);
  const [data, setData] = useState("");
  const [edited, seteEdited] = useState(false);
  const [manual, setManual]=useState("")


  const handleAddAssert = (scannedAssetId) => {
    const updatedArray = [...assert, scannedAssetId];
    setAssert(updatedArray);
    seteEdited(false)
  };

  const handledelete = (i) => {
    const deleteassert = [...assert];
    deleteassert.splice(i, 1);
    setAssert(deleteassert);
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setData(data);
    handleAddAssert(data);
    // setAssert([...assert, data])
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
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
            navigation.navigate("Scan_Second");
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
        <TouchableOpacity></TouchableOpacity>
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
          <Modal visible={edited} style={{elevation:8}} transparent={true}>
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
                    value={manual}
                    style={{ alignSelf: "center" }}
                    placeholder="ex: MDA- A00000589"
                  ></TextInput>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity style={{marginTop:9}} onPress={()=>{
                    seteEdited(false)
                  }}>
                    <Text style={{ marginHorizontal: 5, color:"#243a70" }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        marginHorizontal: 10,
                        borderRadius: 15,
                        backgroundColor:"#243a70",
                      }}
                    >
                      <Text
                        style={{
                          paddingTop: 8,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingBottom:8,
                          color:"white",

                        }}
                        onPress={()=>{
                          handleAddAssert(manual)
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
          width: "100%",
          alignItems: "center",
          // paddingTop: 180,
          // paddingBottom: 180,
          // marginTop: 20,
          // marginBottom: 20,
          // marginHorizontal: 19,
          // marginVertical: 15,
          // paddingLeft: 320,
          // paddingTop: 320,
          // alignSelf: "flex-start",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_WIDTH * 1.0,
          }}
        />
      </View>
      <View style={{ marginBottom: 180 }}>
        <FlatList
          data={assert}
          numColumns={2}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <View
                  style={{
                    margin: 8,
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
                    <TouchableOpacity
                      onPress={() => {
                        handledelete();
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
      </View>
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
          navigation.navigate("Scan_Fourth");
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
      <StatusBar translucent={false} style="auto" backgroundColor="white" />
    </View>
  );
}

export default Scan_Third;

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
