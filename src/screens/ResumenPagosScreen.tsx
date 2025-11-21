import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../components/BottomNavBar";
import { resumenPorCategoria, calcularTotal, categoriaMayorGasto } from "../service/pagosService";
import { useFocusEffect } from "@react-navigation/native";

export default function ResumenPagosScreen() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [totalMes, setTotalMes] = useState<number>(0);
  const [mayorCat, setMayorCat] = useState<string | null>(null);

  const loadResumen = () => {
    const resumen = resumenPorCategoria();
    setLabels(resumen.labels);
    setValues(resumen.values);
    setTotalMes(resumen.values.reduce((a, b) => a + b, 0));
    setMayorCat(categoriaMayorGasto());
  };

  // recargamos cuando la pantalla está en foco (útil si cambias datos en otra screen)
  useFocusEffect(
    useCallback(() => {
      loadResumen();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
          <Text style={styles.headerTitle}>Resumen de Pagos</Text>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Gastos por Categoría</Text>

          <BarChart
            data={{
              labels: labels.length > 0 ? labels : ["Sin datos"],
              datasets: [{ data: values.length > 0 ? values : [0] }],
            }}
            width={Dimensions.get("window").width - 40}
            height={230}
            fromZero
            showValuesOnTopOfBars
            chartConfig={{
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: () => "#4B72F2",
              labelColor: () => "#333",
              barPercentage: 0.6,
            }}
            style={{ borderRadius: 16 }}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Tu mayor gasto</Text>
          <Text style={styles.infoValue}>{mayorCat ?? "N/A"}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Total del mes</Text>
          <Text style={styles.infoValue}>${totalMes.toLocaleString("es-CO")}</Text>
        </View>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4B72F2",
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
  },
  chartCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    padding: 20,
    marginTop: 20,
    borderRadius: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  infoCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    padding: 20,
    marginTop: 20,
    borderRadius: 16,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 6,
    color: "#333",
  },
});
