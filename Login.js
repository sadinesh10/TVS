import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Logo from "./logo.png";
import Eye from "./Eye.png";
import EyeActive from "./EyeActive.png";
import AsyncStorageKeys from "./AsyncStorageKeys";
import { user_login } from "./api/user_api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/mainDataSlice";

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const { userData, recipes } = useSelector((state) => state.mainReducer);

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
    // try {
    //   const response = await axios.post(
    //     "https://large-toys-happen-122-175-16-209.loca.lt/login",
    //     {
    //       email: email,
    //       password: password,
    //     }
    //   );
    //   const data = response.data;
    //   console.log(data);

    //   if (data?.successful) {
    //     await AsyncStorage.setItem(
    //       AsyncStorageKeys.userData,
    //       JSON.stringify(data.data)
    //     );
    //     navigation.replace("Home");
    //     let userObj={
    //       email:email,
    //       password:password
    //     }
    //     dispatch(setUserData(userObj))
    //   } else {
    //     Alert.alert("Login failed", data?.msg);
    //   }

    // } catch (e) {
    //   Alert.alert("Error", "An Unknown error: " + e);
    // }
    let userObj = {
      email: email,
      password: password,
      phone_number: 8919567672,
      image_uri:"https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-tobi-620337.jpg&fm=jpg",
      gender:"Male",
      name:"Sai Dinesh",
      coins:47,
      token:"Token 9c8b06d329136da358c2d00e76946b0111ce2c48",
    };
    AsyncStorage.setItem(AsyncStorageKeys.userData,JSON.stringify(userObj))
    navigation.replace("Splash");
  };

  async function handleLogin() {
    const checkPassword = checkPasswordValidity;
    if (checkPassword) {
      user_login({
        email: email,
        password: password,
      })
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            AsyncStorage.setItem("AccessToken", result.data.api_token);
          }
          navigation.replace("Home");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert(checkPassword);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>WELCOME</Text>
      <Image style={styles.logo} source={Logo}></Image>
      <View style={styles.wrapperInput}>
        <StatusBar translucent={false} style="auto" backgroundColor="white" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => handleCheckEmail(text)}
        />
      </View>
      {checkValidEmail ? (
        <Text style={styles.textFailed}>Wrong format email</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={seePassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setSeePassword(!seePassword)}
        >
          <Image source={seePassword ? Eye : EyeActive} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {email == "" || password == "" || checkValidEmail == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={onSubmit}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontWeight: "bold",
    fontSize: 23,
    alignSelf: "center",
  },
  logo: {
    width: 400,
    height: 270,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    backgroundColor: "white",
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 10,
    width: "100%",
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 24,
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 5,
    marginTop: 25,
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
export default LoginScreen;
