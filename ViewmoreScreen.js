import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Image,
  Linking,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";

const ViewmoreScreen = ({ route, navigation }) => {
  const [recipe, setrecipe] = useState({});

  const ViewMore = async () => {
    try {
      const response = await axios.get(
        "https://food2fork.ca/api/recipe/get/?id=" + route.params.id,
        {
          headers: {
            Authorization: "Token 9c8b06d329136da358c2d00e76946b0111ce2c48",
          },
        }
      );
      const data = response.data;
      setrecipe(data);
    } catch (e) {
      Alert.alert("Error", "An Unknown error: " + e);
    }
  };

  useEffect(() => {
    ViewMore();
  }, []);

  return (
    <ScrollView>
      <StatusBar translucent={false} style="auto" backgroundColor="white" />
      <Image
        style={styles.image}
        source={{ uri: recipe.featured_image }}
      ></Image>
      <View style={{ padding: 16 }}>
        <Text style={styles.text}>{recipe.title}</Text>
        <View>
          <Text style={styles.text}>{"Rating::" + recipe.rating}<Entypo style={styles.star} name={"star"} size={23}></Entypo></Text>
        </View>
        <Text style={styles.text}>{"Publisher-Name::" + recipe.publisher}</Text>

        <Text style={styles.text}>Ingredients-List</Text>
        {recipe.ingredients?.map((value, index) => {
          return <Text key={index}>{index + 1 + ")   " + value}</Text>;
        })}
        <Text style={styles.text}>
          {"Published-Date:" + recipe.date_updated}
        </Text>
        <Button
          title="For More Information"
          onPress={() => {
            Linking.openURL(recipe.source_url);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    padding: 3,
    fontWeight: "bold",
  },
  image: {
    padding: 10,
    width: 360,
    height: 250,
    resizeMode: "cover",
  },
  ingredients: {
    flex: 1,
    fontSize: 15,
  },
  star: {
    color: "#B3AC17",
    padding: 6,
  },
});
export default ViewmoreScreen;
