import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ScoreBoard from "../components/GameScreen/ScoreBoard";
import Card from "../components/shared/Card";
import MyButton from "../components/shared/MyButton";
import Spacer from "../components/shared/Spacer";
import Colors from "../constants/colors";
import Initials from "../constants/initials";
import Toast from "react-native-toast-message";
import StoreContext from "../store";
import { useFocusEffect, useNavigation } from "@react-navigation/core";

const GameScreen = () => {
  const [number, setNumber] = useState("");
  const context = useContext(StoreContext);
  const navigation = useNavigation();

  const {
    setShot,
    setTimer,
    setTotalPoint,
    setGameResult,
    setRandomNumber,
    timer,
    shot,
    randomNumber,
    gameStatus,
  } = context;

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
    setGameResult(result);
    setTotalPoint(timer * shot);
    navigation.navigate("Summary");
  };

  useFocusEffect(
    useCallback(() => {
      // burası screen ilk render edildiğinde çalışacak ve
      // oyunun state lerini resetleyecek
      //Can sayısı resetlenir
      setShot(Initials.totalShot);

      // Puan resetlenir
      setTotalPoint(0);

      // Oyun sonucu resetlenir
      setGameResult("");

      //Inputu resetler
      setNumber("");

      // RAsgele sayı resetlenir
      const rn = Math.floor(
        Math.random() *
          (Initials.randomNumberUpLimit - Initials.randomNumberDownLimit + 1) +
          Initials.randomNumberDownLimit
      );
      setRandomNumber(rn);

      // Süre resetlenir
      setTimer(Initials.totalTime);

      const interval = setInterval(() => {
        setTimer((tm) => tm - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  useEffect(() => {
    if (timer <= 0) endGame("lost");
  }, [timer]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <ScoreBoard />
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
