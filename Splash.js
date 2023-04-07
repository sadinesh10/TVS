import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./Login";
import { StatusBar } from "expo-status-bar";
import AsyncStorageKeys from "./AsyncStorageKeys";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/mainDataSlice";

const SplashScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const checkForUserLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem(AsyncStorageKeys.userData);
      dispatch(setUserData(JSON.parse(userData)));
      console.log(userData)

      if (userData) {
        navigation.replace("ButtomNav");
      } else {
        navigation.replace("Login");
      }
    } catch (e) {
      navigation.replace("Login");
    }
  };

  useEffect(() => {
    checkForUserLogin();
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar translucent={false} style="auto" backgroundColor="white" />
      <Image
        source={require("./logo.png")}
        style={{
          width: "100%",
          height: "30%",
          marginTop: 30,
          marginBottom: 30,
        }}
        resizeMode={"cover"}
      />
    </View>
  );
};

export default SplashScreen;
