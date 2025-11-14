import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default function CustomInput({ placeholder, secureTextEntry, value, onChangeText }: any) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 16,
  },
});
