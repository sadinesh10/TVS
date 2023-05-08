import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import { Provider, useSelector } from "react-redux";
import Login_Navigation from "./Screens/Login_Navigation";
import Store from "./redux/Store";

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Login_Navigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
