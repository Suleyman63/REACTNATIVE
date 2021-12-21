import React from "react";
import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MyButton = (props) => {
  return (
    <TouchableHighlight
      {...props}
      style={{ ...styles.button, ...props.styleButton }}
    >
      <View style={styles.container}>
        <Text>
          <MCIcons
            name={props.icon}
            style={{ ...styles.icon, ...props.styleText }}
          />
        </Text>

        <Text style={{ ...styles.text, ...props.styleText }}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  icon: {
    fontSize: 15,
    color: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
