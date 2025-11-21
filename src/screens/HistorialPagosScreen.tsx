// C:\Users\AngieMinota\PagosSeguros-Electiva5\src\screens\HistorialPagosScreen.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../components/BottomNavBar";

type PagoItem = {
  id: number | string;
  nombre: string;
  valor: number;
  fecha: string;
  estado?: string;
};

export default function HistorialPagosScreen() {
  const navigation = useNavigation<any>();

  // Datos de ejemplo — reemplaza por getPagos() cuando conectes el servicio
  const historial: PagoItem[] = [
    { id: 1, nombre: "Factura de wifi", valor: 180000, fecha: "18 de Octubre", estado: "Pagado" },
    { id: 2, nombre: "Gimnasio", valor: 80000, fecha: "15 de Octubre", estado: "Pagado" },
    { id: 3, nombre: "Cafe Starbucks", valor: 12000, fecha: "10 de Octubre", estado: "Pagado" },
    { id: 4, nombre: "Compra supermercado", valor: 245000, fecha: "10 de Octubre", estado: "Pagado" },
  ];

  const renderItem = ({ item }: { item: PagoItem }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="checkmark-circle" size={32} color="#32C35B" />
        <View style={styles.textContainer}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.valor}>${item.valor.toLocaleString()}</Text>
          <Text style={styles.fecha}>Realizado el {item.fecha}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Botón volver */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Volver"
        >
          <Ionicons name="arrow-back" size={26} color="#0056B3" />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>Historial de Pagos</Text>

        {/* Lista */}
        <FlatList
          data={historial}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Barra inferior (componente del equipo) */}
        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#EAF3FF" },
  container: {
    flex: 1,
    backgroundColor: "#EAF3FF",
    paddingTop: 8,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: 6,
    zIndex: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F2C55",
    marginTop: 18,
    marginBottom: 10,
  },
listContent: {
  paddingHorizontal: 16,
  paddingTop: 8,
},

card: {
  backgroundColor: "#fff",
  borderRadius: 20,
  paddingHorizontal: 20,
  paddingVertical: 20,
  minHeight: 130,
  marginBottom: 20,
  flexDirection: "row",
  alignItems: "flex-start",   // ← muy importante
  elevation: 4,
},
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 14,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B2B48",
  },
  valor: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#123",
  },
  fecha: {
    marginTop: 6,
    color: "#1E9B57",
    fontWeight: "600",
  },
});
