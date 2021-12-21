import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MyButton from "../components/shared/MyButton";
import Colors from "../constants/colors";
import Initials from "../constants/initials";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to My Game</Text>
      <Text style={styles.description}>
        Guess the number between {Initials.randomNumberDownLimit} to{" "}
        {Initials.randomNumberUpLimit}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => Linking.openURL("https://google.com")}
      >
        <Text style={styles.link}>google.com</Text>
      </TouchableWithoutFeedback>
      <MyButton
        title="Start Game"
        styleButton={styles.button}
        onPress={() => navigation.navigate("Game")}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    marginVertical: 10,
  },
  description: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: Colors.color4,
    marginVertical: 10,
  },
});
