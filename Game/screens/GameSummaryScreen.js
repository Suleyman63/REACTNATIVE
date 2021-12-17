import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "../components/shared/Card";
import MyButton from "../components/shared/MyButton";
import Spacer from "../components/shared/Spacer";
import Colors from "../constants/colors";
import Initials from "../constants/initials";

const GameSummaryScreen = (props) => {
  const { setGameStatus, gameResult, totalPoint, randomNumber, timer, shot } =
    props;
  return (
    <View style={styles.screen}>
      <Text style={styles.resultText}>
        {gameResult === "win" ? " YOU WIN" : " YOU LOST 👎"}
      </Text>
      <Card style={styles.card}>
        <Text style={styles.score}>{totalPoint}</Text>
        <Text>Point</Text>
      </Card>
      <Spacer />
      <Text style={styles.summary}>Summary</Text>
      <Text>The number was: {randomNumber}</Text>
      <Text>
        Total time: {timer}/{Initials.totalTime}
      </Text>
      <Text>
        Total shot {shot}/{Initials.totalShot}
      </Text>
      <Spacer />
      <MyButton
        title="Play Again"
        style={styles.button}
        onPress={() => setGameStatus("start")}
      />
    </View>
  );
};

export default GameSummaryScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
  },
  score: {
    fontSize: 30,
    fontWeight: "700",
  },
  summary: {
    fontWeight: "700",
  },
  button: {
    backgroundColor: Colors.color3,
  },
  card: {
    width: "50%",
    alignItems: "center",
  },
});
