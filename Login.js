import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "./AsyncStorageKeys";
import { useNavigation } from "@react-navigation/native";
import md5 from "md5";
import * as Application from "expo-application";
import axios from "axios";
import { ActivityIndicator, Modal, Snackbar } from "react-native-paper";
function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = setTimeout(() => {
    setVisible(false);
  }, 2000);
  const [visible1, setVisible1] = useState(false);
  const onToggleSnackBar1 = () => setVisible1(true);
  const onDismissSnackBar1 = setTimeout(() => {
    setVisible1(false);
  }, 2000);

  const [visible2, setVisible2] = useState(false);
  const onToggleSnackBar2 = () => setVisible2(true);
  const onDismissSnackBar2 = setTimeout(() => {
    setVisible2(false);
  }, 2000);
  const [visible3, setVisible3] = useState(false);
  const onToggleSnackBar3 = () => setVisible3(true);
  const onDismissSnackBar3 = setTimeout(() => {
    setVisible3(false);
  }, 2000);
  const uniqueId = Application.androidId;

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 Characters Long.";
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Password must contain at least one Special Symbol.";
    }

    return null;
  };
  const onSubmit = async () => {
    try {
      if (email === "") {
        return onToggleSnackBar();
      } else if (password === "") {
        return onToggleSnackBar1();
      }
      const response = await axios.post(
        "http://vulcantunnel.com:5007/user/auth/signin",
        {
          username: email,
          password: md5(password),
          device_token: "12345",
          device_unique_id: uniqueId,
          device_type: "1",
          version_no: "1.0",
        }
      );
      const data = response?.data;
      console.log(data);
      await AsyncStorage.setItem(
        AsyncStorageKeys.userData,
        JSON.stringify(data)
      );

      navigation.replace("Splash");
    } catch (e) {
      const message = e?.response?.data?.errMessage;
      if (message != "") {
        return onToggleSnackBar2();
      } else if (message == "Something went wrong") {
        return onToggleSnackBar3();
      }

      //Alert.alert("Error", message || "Something went wrong");
      console.log(response.data.password);
    }
    // let userObj = [
    //   {
    //     email: email,
    //     password: password,
    //   },
    // ];
    // AsyncStorage.setItem(AsyncStorageKeys.userData, JSON.stringify(userObj));
    // navigation.replace("Splash");
  };
  return (
    <Pressable onPress={()=>Keyboard.dismiss()}> 
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#f5f5f5" }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "700",
            marginTop: 35,
            marginLeft: 20,
            marginBottom: 5,
            color: "#243a72",
          }}
        >
          Login
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            marginLeft: 20,
            marginBottom: 20,
          }}
        >
          Login here to use the app
        </Text>
        <View style={{ flex: 1, justifyContent: "center", marginTop: 15 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "200",
              marginLeft: 15,
              marginBottom: 8,
            }}
          >
            Username
          </Text>
          <View style={styles.wrapperInput}>
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "200",
                marginLeft: 15,
                marginBottom: 8,
              }}
            >
              Password
            </Text>
          </View>
          <View style={styles.wrapperInput}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              value={password}
              secureTextEntry={seePassword}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.wrapperIcon}
              onPress={() => setSeePassword(!seePassword)}
            >
              <Image
                source={
                  seePassword
                    ? require("./Eye.png")
                    : require("./EyeActive.png")
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ alignSelf: "flex-end", color: "#243a72", margin: 15 }}>
            Forgot Password ?
          </Text>
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
            marginHorizontal: 25,
           marginVertical: 25,
            }}
            onPress={() => {
              onSubmit();
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
              Login
            </Text>
          </Pressable>

          <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
            Please Enter UserName
          </Snackbar>
          <Snackbar visible={visible1} onDismiss={onDismissSnackBar1}>
            Please Enter Password
          </Snackbar>
          <Snackbar visible={visible2} onDismiss={onDismissSnackBar2}>
            Incorrect UserName/Password
          </Snackbar>
          <Snackbar visible={visible3} onDismiss={onDismissSnackBar3}>
            Something went wrong
          </Snackbar>
        </View>
        <StatusBar translucent={false} style="auto" backgroundColor="#f5f5f5" />
      </View>
    </Pressable>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    backgroundColor: "white",
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: "black",
    marginTop: 2,
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    fontSize: 18,
    padding: 1,
  },
  input: {
    padding: 10,
    width: "100%",
  },
  wrapperIcon: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 15,
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#243a72",
    borderRadius: 10,
    margin: 20,
  },
  buttonDisable: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#243a72",
    borderRadius: 10,
    margin: 20,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
  },
});
