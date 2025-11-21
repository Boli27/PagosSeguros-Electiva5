import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomNavBar() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const current = route.name;

  return (
    <View style={styles.container}>
      
      {/* INICIO */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("MisPagos")}
      >
        <Ionicons
          name="home"
          size={22}
          color={current === "MisPagos" ? "#007BFF" : "#999"}
        />
        <Text
          style={current === "MisPagos" ? styles.active : styles.inactive}
        >
          Inicio
        </Text>
      </TouchableOpacity>

      {/* HISTORIAL */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("HistorialPagos")}
      >
        <Ionicons
          name="time"
          size={22}
          color={current === "HistorialPagos" ? "#007BFF" : "#999"}
        />
        <Text
          style={current === "HistorialPagos" ? styles.active : styles.inactive}
        >
          Historial
        </Text>
      </TouchableOpacity>

      {/* RESUMEN */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("ResumenPagos")}
      >
        <Ionicons
          name="bar-chart"
          size={22}
          color={current === "ResumenPagos" ? "#007BFF" : "#999"}
        />
        <Text
          style={current === "ResumenPagos" ? styles.active : styles.inactive}
        >
          Resumen
        </Text>
      </TouchableOpacity>

      {/* PERFIL */}
      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="person"
          size={22}
          color={current === "Perfil" ? "#007BFF" : "#999"}
        />
        <Text style={current === "Perfil" ? styles.active : styles.inactive}>
          Perfil
        </Text>
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
