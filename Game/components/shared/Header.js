import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.color2,
    padding: 10,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    color: "#ececec",
    fontSize: 20,
  },
});
