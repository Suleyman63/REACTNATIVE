import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import ScoreBoard from "../components/GameScreen/ScoreBoard";
import Card from "../components/shared/Card";
import MyButton from "../components/shared/MyButton";
import Spacer from "../components/shared/Spacer";
import Colors from "../constants/colors";
import Initials from "../constants/initials";
import Toast from "react-native-toast-message";

const GameScreen = (props) => {
  const [number, setNumber] = useState("");

  const {
    setShot,
    setTimer,
    setTotalPoint,
    setGameResult,
    setRandomNumber,
    setGameStatus,
    timer,
    shot,
    randomNumber,
  } = props;

  const handleGuess = () => {
    // Rakam doğru tahmin edildi. Oyun kazanıldı
    //console.log(typeof randomNumber, typeof number);
    //console.log(randomNumber, number);

    //Önce girilen sayının kontrolü yapılıyor
    const enteredNumber = parseInt(number);
    if (
      isNaN(enteredNumber) ||
      enteredNumber < Initials.randomNumberDownLimit ||
      enteredNumber > Initials.randomNumberUpLimit
    ) {
      Toast.show({
        type: "error",
        text1: `You have to type number between ${Initials.randomNumberDownLimit} to ${Initials.randomNumberUpLimit}`,
      });

      return;
    }

    if (randomNumber === enteredNumber) {
      endGame("win");
    } else if (randomNumber > enteredNumber) {
      Toast.show({
        type: "info",
        text1: `It must be greater then ${enteredNumber}`,
      });
      checkShot();
    } else {
      Toast.show({
        type: "info",
        text1: `It must be less then ${enteredNumber}`,
      });
      checkShot();
    }
  };

  const checkShot = () => {
    if (shot > 0) setShot(shot - 1);
    else {
      endGame("lost");
    }
    setNumber("");
  };

  const endGame = (result) => {
    setGameStatus("end");
    setGameResult(result);
    setTotalPoint(timer * shot);
  };

  useEffect(() => {
    // burası component ilk render edildiğinde çalışacak ve
    // oyunun state lerini resetleyecek
    setShot(Initials.totalShot);
    setTimer(Initials.totalTime);
    setTotalPoint(0);
    setGameResult("");
    const rn = Math.floor(
      Math.random() *
        (Initials.randomNumberUpLimit - Initials.randomNumberDownLimit + 1) +
        Initials.randomNumberDownLimit
    );
    setRandomNumber(rn);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        endGame("lost");
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <TouchableWithoutFeedback>
      <View style={styles.screen}>
        <ScoreBoard timer={timer} shot={shot} />
        <Spacer />
        <Card>
          <Text style={styles.text}>Type a number</Text>
          <TextInput
            style={styles.input}
            onChangeText={(num) => setNumber(num)}
            value={number}
            keyboardType="number-pad"
            maxLength={3}
          />
          <MyButton
            title="GUESS"
            styleButton={styles.button}
            onPress={handleGuess}
          />
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    zIndex: -1,
  },
  input: {
    padding: 10,
    textAlign: "center",
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colors.color4,
  },
  text: {
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.color3,
    paddingVertical: 15,
    marginTop: 10,
  },
});
