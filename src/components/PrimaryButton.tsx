import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PrimaryButton({ title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
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
