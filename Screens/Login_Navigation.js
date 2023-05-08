import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Splash";
import Login from "../Login";
import { BottomTabNav } from "../ButtomNav";

const Stack = createNativeStackNavigator();

const Login_Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Splash"}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Home"}
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    // <View>
    //   <Text>Initial text is: Hello there</Text>
      // <Text>{`MD5 hashed version is: \n${md5("12345")}`}</Text>
    //   <StatusBar translucent={false} style="auto" backgroundColor="white" />
    //   let uniqueId = DeviceInfo.getUniqueId();
    //   console.log(uniqueId)
    // </View>
  );
};

export default Login_Navigation;

const styles = StyleSheet.create({});
