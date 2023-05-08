import { StyleSheet, Text, View, Image, Platform, Alert } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./Login";
import { StatusBar } from "expo-status-bar";
import AsyncStorageKeys from "./AsyncStorageKeys";
import { useDispatch } from "react-redux";
import { setMenu, setUserData } from "./redux/mainDataSlice";
import axios from "axios";
import { useSelector } from "react-redux";

const SplashScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(
        AsyncStorageKeys.userData
      );
      const userData = JSON.parse(userDataString);
      if (userData) {
        getroles(userData);
        dispatch(setUserData(userData));
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    } catch (e) {
      console.log(e);
      navigation.replace("Login");
    }
  };

  const getroles = async (userData) => {
    try {
      const roleData = await axios.post(
        "http://vulcantunnel.com:5007/user/roles/getRoleData",
        {
          role_id: userData.role_id,
        },
        {
          headers: {
            "x-access-token": userData.token,
            "device-type": "MOBILE",
          },
        }
      );
      const MenuId = roleData.data;
      getRolesMenu(userData, MenuId);
    } catch (e) {
      Alert.alert(e);
    }
  };
  const getRolesMenu = async (userData, MenuId) => {
    try {
      const roleData = await axios.post(
        "http://vulcantunnel.com:5007/user/roles/menus",
        {},
        {
          headers: {
            "x-access-token": userData.token,
            "device-type": "MOBILE",
          },
        }
      );
      const MenuData = roleData.data;
      NewArray(MenuId, MenuData);
    } catch (e) {
      Alert.alert(e);
    }
  };

  const NewArray = (MenuId, MenuData) => {
    const filteredMenuArray = MenuData.filter((element) => {
      //console.log(element)
      for (let i of MenuId.menus) {
        if (i === element.menu_id) {
          // console.log(`element.menu_id:${element.menu_id }`)
          if (element.menu_web_url === null) {
            // console.log(element.menu_id,element.menu_web_url)
            return true;
          }
        }
      }
    });
    dispatch(setMenu(filteredMenuArray));
  };

  // const checkForUserLogin = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem(AsyncStorageKeys.userData);
  //     //dispatch(setUserData(JSON.parse(userData)));

  //     if (userData) {
  //       navigation.replace("Home");
  //     } else {
  //       navigation.replace("Login");
  //     }
  //   } catch (e) {
  //     navigation.replace("Login");
  //   }
  // };

  useEffect(() => {
    getUserDetails();
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
        source={require("./Screens/1280px-TVS_SCS_Logo-removebg-preview.png")}
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
