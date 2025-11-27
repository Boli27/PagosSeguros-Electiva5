import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  value: number;
};

export default function TotalBox({ title, value }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        ${value.toLocaleString("es-CO")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0056B3",
  }
});
