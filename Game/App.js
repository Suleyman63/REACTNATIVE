import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Header from "./components/shared/Header";
import Colors from "./constants/colors";
import Initials from "./constants/initials";
import GameScreen from "./screens/GameScreen";
import GameSummaryScreen from "./screens/GameSummaryScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import Toast from "react-native-toast-message";

export default function App() {
  const [randomNumber, setRandomNumber] = useState();
  const [timer, setTimer] = useState();
  const [shot, setShot] = useState();
  const [totalPoint, setTotalPoint] = useState(0);
  const [gameStatus, setGameStatus] = useState("welcome");
  const [gameResult, setGameResult] = useState("");

  return (
    <View style={styles.container}>
      <Header
        title={
          gameStatus === "welcome"
            ? "welcome"
            : gameStatus === "strat"
            ? "Guess the number"
            : "Game Summary"
        }
      />

      {gameStatus === "welcome" ? (
        <WelcomeScreen setGameStatus={setGameStatus} />
      ) : gameStatus === "start" ? (
        <GameScreen
          setShot={setShot}
          setTimer={setTimer}
          setTotalPoint={setTotalPoint}
          setGameResult={setGameResult}
          setRandomNumber={setRandomNumber}
          timer={timer}
          shot={shot}
          randomNumber={randomNumber}
          setGameStatus={setGameStatus}
        />
      ) : (
        <GameSummaryScreen
          setGameStatus={setGameStatus}
          gameResult={gameResult}
          totalPoint={totalPoint}
          randomNumber={randomNumber}
          setGameStatus={setGameStatus}
          timer={shot}
          shot={shot}
        />
      )}

      <StatusBar backgroundColor={Colors.color1} barStyle="light-content" />
      <Toast visibilityTime={2000} topOffset={67} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
