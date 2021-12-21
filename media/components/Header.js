import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View>
      <Text style={styles.baslik}>Techpro Education</Text>
      <Text style={styles.baslik2}>IT Solutions</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  baslik: {
    color: "red",
    fontSize: 20,
  },
  baslik2: {
    color: "blue",
  },
});
