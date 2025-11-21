import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BottomNavBar() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("MisPagos")}
      >
        <Ionicons name="home" size={22} color="#007BFF" />
        <Text style={styles.active}>Inicio</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("HistorialPagos")}>
          <Ionicons name="time" size={22} color="#999" />
          <Text style={styles.inactive}>Historial</Text>
        </TouchableOpacity>


      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="bar-chart" size={22} color="#999" />
        <Text style={styles.inactive}>Resumen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person" size={22} color="#999" />
        <Text style={styles.inactive}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#EEE",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: "#FFF",
  },
  navItem: {
    alignItems: "center",
  },
  active: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  inactive: {
    color: "#999",
    fontSize: 12,
  },
});
