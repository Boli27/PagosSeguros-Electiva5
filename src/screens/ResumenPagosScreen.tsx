import React from "react"; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

export default function ResumenPagosScreen() {
  const navigation = useNavigation<any>();
  const screenWidth = Dimensions.get("window").width - 40;

  const data = {
    labels: ["Comida", "Transporte", "Servicios", "Membresías"],
    datasets: [
      {
        data: [245000, 180000, 450000, 120000],
      },
    ],
  };

  return (
    <View style={styles.safe}>

      {/* Header superior */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Resumen de Octubre</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* TARJETA DE MAYOR GASTO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu mayor gasto</Text>

          <BarChart
            data={data}
            width={screenWidth}
            height={280}
            fromZero
            showValuesOnTopOfBars
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: () => "#1E4BA8",
              labelColor: () => "#6A6A6A",
              barPercentage: 0.7,
            }}
            style={{ marginVertical: 8, borderRadius: 10 }}
          />
        </View>

        {/* TARJETA DE RESUMEN */}
        <View style={styles.cardInfo}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Total Pagado este mes: </Text>$ 1.300.000
          </Text>

          <Text style={styles.infoText}>
            <Text style={styles.bold}>Total Pendiente: </Text>$ 120.000
          </Text>

          <Text style={styles.infoText}>
            <Text style={styles.bold}>Pagos Realizados: </Text>5 de 7 pagos
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#EAF3FF",
  },

  header: {
    width: "100%",
    backgroundColor: "#3D8BFF",
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerBack: {
    position: "absolute",
    left: 20,
    top: 50,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B2B48",
    marginBottom: 12,
  },

  cardInfo: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  infoText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#222",
  },

  bold: {
    fontWeight: "700",
  },
});
