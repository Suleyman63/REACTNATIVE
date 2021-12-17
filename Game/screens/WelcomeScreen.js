import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Linking,
} from "react-native";
import MyButton from "../components/shared/MyButton";
import Colors from "../constants/colors";
import Initials from "../constants/initials";
const WelcomeScreen = (props) => {
  const { setGameStatus } = props;
  return (
    <View style={styles.screen}>
      <Text>Welcome to My Game</Text>
      <Text style={styles.description}>
        Guess the number between{Initials.randomNumberDownLimit} to{" "}
        {Initials.randomNumberUpLimit}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => Linking.openURL("https://www.techproeducation.com")}
      >
        <Text style={styles.link}>Techproeducation</Text>
      </TouchableWithoutFeedback>
      <MyButton
        title="Start Game"
        styleButton={styles.button}
        onPress={() => setGameStatus("start")}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
