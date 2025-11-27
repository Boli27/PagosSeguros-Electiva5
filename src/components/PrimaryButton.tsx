import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
//import { ViewStyle } from "react-native/types_generated/index";
//import { View } from "react-native/types_generated/index";

interface Props{
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function PrimaryButton({ text, style, onPress }: any) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1E6CFB",
    padding: 14,
    borderRadius: 10,
    width: "90%",
    marginTop: 15,
    alignSelf: "center"
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },
});
