import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNav } from "./DrawerNav";
import Recieve_DC_First from "./Screens/Recieve_DC_First";
import Recieve_DC_Second from "./Screens/Recieve_DC_Second";
import Recieve_DC_Fourth from "./Screens/Recieve_DC_Fourth";
import Recieve_DC_Third from "./Screens/Recieve_DC_Third.";
import Recieve_Scan_First from "./Screens/Recieve_Scan_First";
import Recieve_Scan_Second from "./Screens/Recieve_Scan_Second";
import Recieve_Scan_Third from "./Screens/Recieve_Scan_Third";
import Recieve_Scan_Fourth from "./Screens/Recieve_Scan_Fourth";
import SecondSlide from "./Screens/SecondSlide";
import Scan_First from "./Screens/Scan_First";
import Scan_Second from "./Screens/Scan_Second.";
import Scan_Fifth from "./Screens/Scan_Fifth";
import Scan_Fourth from "./Screens/Scan_Fourth";
import Scan_Third from "./Screens/Scan_Third";
import ThirdSlide from "./Screens/ThirdSlide";
import FourthSlide from "./Screens/FourthSlide";
import FifthSlide from "./Screens/FifthSlide";
import SixthSlide from "./Screens/SixthSlide";
import SeventhSlide from "./Screens/SeventhSlide";
import EightSlide from "./Screens/EightSlide";

const Stack = createNativeStackNavigator();

export const HomeScreen = ({ navigation, route }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={"FirstSlide"}
          component={DrawerNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_DC_First"}
          component={Recieve_DC_First}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_DC_Second"}
          component={Recieve_DC_Second}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_DC_Fourth"}
          component={Recieve_DC_Fourth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_DC_Third"}
          component={Recieve_DC_Third}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_Scan_First"}
          component={Recieve_Scan_First}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_Scan_Second"}
          component={Recieve_Scan_Second}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_Scan_Third"}
          component={Recieve_Scan_Third}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Recieve_Scan_Fourth"}
          component={Recieve_Scan_Fourth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"SecondSlide"}
          component={SecondSlide}
          options={{ headerShown: false }}
        />
  
        <Stack.Screen
          name={"Scan_First"}
          component={Scan_First}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Scan_Second"}
          component={Scan_Second}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Scan_Fifth"}
          component={Scan_Fifth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Scan_Third"}
          component={Scan_Third}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Scan_Fourth"}
          component={Scan_Fourth}
          options={{ headerShown: false }}
        />
  
        <Stack.Screen
          name={"ThirdSlide"}
          component={ThirdSlide}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name={"FourthSlide"}
          component={FourthSlide}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name={"FifthSlide"}
          component={FifthSlide}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name={"SixthSlide"}
          component={SixthSlide}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name={"SeventhSlide"}
          component={SeventhSlide}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name={"EightSlide"}
          component={EightSlide}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  };