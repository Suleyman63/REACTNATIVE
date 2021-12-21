import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import Header from "./components/shared/Header";
import Colors from "./constants/colors";
import Initials from "./constants/initials";
import GameScreen from "./screens/GameScreen";
import GameSummaryScreen from "./screens/GameSummaryScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import Toast from "react-native-toast-message";
import StoreContext from "./store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [randomNumber, setRandomNumber] = useState();
  const [timer, setTimer] = useState(Initials.totalTime);
  const [shot, setShot] = useState();
  const [totalPoint, setTotalPoint] = useState(0);
  const [gameResult, setGameResult] = useState(""); // win | lost

  const contextProps = {
    setShot,
    setTimer,
    setTotalPoint,
    setGameResult,
    setRandomNumber,
    timer,
    shot,
    randomNumber,
    totalPoint,
    gameResult,
  };

  return (
    <StoreContext.Provider value={contextProps}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: styles.headerStyle,
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{
              title: "Guess The Number",
            }}
          />
          <Stack.Screen name="Summary" component={GameSummaryScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar backgroundColor={Colors.color1} barStyle="light-content" />
      <Toast visibilityTime={2000} topOffset={67} />
    </StoreContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  headerStyle: {
    backgroundColor: Colors.color2,
  },
});
