import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Hold from "./Screens/hold";
import Notifications from "./Screens/Notifications";
import Messages from "./Screens/Messages";
import Profile_Screen from "./Screens/Profile_Screen";
import { styles } from "./util";
import { Image } from "react-native";
import list from "./Screens/list-line.png";
import profile from "./icons/user-favorite.png";
import home_1 from "./home-1.png";
import Message from "./icons/chatbubble-ellipses-outline.png";
import Notification from "./icons/notification.png";
import profile_filled from "./icons/user-filled.png";
import Message_filled from "./icons/chatbubble-ellipses-filled.png";
import Notification_filled from "./icons/notification-filled.png";
import Home_filled from "./Screens/home.png";
import list_filled from "./Screens/list-solid.png";

import { HomeScreen } from "./Stack_Navigation";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const BottomTabNav = () => {
  // useEffect(() => {
  //   window.location.reload(false);
  // }, []);
  const isFocused = useIsFocused(false);

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => {
        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            ...styles,
          },
          style:{
            
          }
        };
      }}
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
    >
      <Tab.Screen
        name="ButtomHome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 20,
                  marginRight: 10,
                }}
                
                source={home_1}
              ></Image>
              
            ) : (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 20,
                  marginRight: 10,
                }}
                source={Home_filled}
              ></Image>
            ),
        }}
      />
      <Tab.Screen
        name="Hold"
        component={Hold}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={{
                  width: 21,
                  height: 28,
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 18,
                  marginBottom: 20,
                }}
                source={list}
              ></Image>
            ) : (
              <Image
                style={{
                  width: 21,
                  height: 28,
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 18,
                  marginBottom: 20,
                }}
                source={list_filled}
              ></Image>
            ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                source={Notification}
              ></Image>
            ) : (
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                source={Notification_filled}
              ></Image>
            ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                source={Message}
              ></Image>
            ) : (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                source={Message_filled}
              ></Image>
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile_Screen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                style={{
                  width: 20,
                  height: 26,
                  marginLeft: 7,
                  marginTop: 20,
                  marginBottom: 20,
                  marginRight: 10,
                }}
                source={profile}
              ></Image>
            ) : (
              <Image
                style={{
                  width: 20,
                  height: 26,
                  marginLeft: 7,
                  marginTop: 20,
                  marginBottom: 20,
                  marginRight: 10,
                }}
                source={profile_filled}
              ></Image>
            ),
        }}
      />
    </Tab.Navigator>
  );
};
