import React, { useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import BottomNavBar from "../components/BottomNavBar";

import {
  getPendientesDelMes,
  getPagosPagadosDelMes,
  getTotalDelMes,
  getResumenDelMes,
} from "../service/pagosService";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function ResumenPagosScreen() {
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);

  const pendientes = getPendientesDelMes(mesSeleccionado);
  const pagados = getPagosPagadosDelMes(mesSeleccionado);
  const total = getTotalDelMes(mesSeleccionado);
  const resumen = getResumenDelMes(mesSeleccionado);


  const width = Dimensions.get("window").width - 40;

  // Si no hay items, devolver una estructura válida para la gráfica
  const buildChartData = (items: any[]) => {
    if (!items || items.length === 0) {
      return {
        labels: [""],
        datasets: [{ data: [0] }],
      };
    }

    return {
      labels: items.map((i) => (i.nombre.length > 12 ? i.nombre.slice(0, 12) + "…" : i.nombre)),
      datasets: [{ data: items.map((i) => i.valor) }],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de {MESES[mesSeleccionado - 1]}</Text>

      {/* Selector de mes */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.mesesScroll}
        contentContainerStyle={styles.mesesContent}
      >
        {MESES.map((m, index) => {
          const active = index + 1 === mesSeleccionado;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.mesButton, active && styles.mesButtonActive]}
              onPress={() => setMesSeleccionado(index + 1)}
              activeOpacity={0.8}
            >
              <Text style={[styles.mesText, active && styles.mesTextActive]}>
                {m.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Pagos pendientes (ROJO) */}
        <Text style={styles.chartTitle}>Pagos pendientes</Text>
        <LineChart
          data={buildChartData(pendientes)}
          width={width}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={chartRed}
          style={styles.chartBox}
          bezier
        />

        {/* Pagos pagados (AZUL) */}
        <Text style={styles.chartTitle}>Pagos pagados</Text>
        <BarChart
          data={buildChartData(pagados)}
          width={width}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={chartBlue}
          style={styles.chartBox}
          fromZero
        />

        {/* Totales (MORADO) */}
        <Text style={styles.chartTitle}>Todos los pagos</Text>
        <LineChart
          data={buildChartData(total)}
          width={width}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={chartPurple}
          style={styles.chartBoxBottom}
          bezier
        />

        {/* Resumen texto */}
        <View style={styles.resumenBox}>
          <Text style={styles.resumenTitle}>Resumen del mes</Text>

          <Text style={styles.resumenText}>
            Total Pagado este mes:   <Text style={styles.resumenBold}>${resumen.totalPagado.toLocaleString()}</Text>
          </Text>

          <Text style={styles.resumenText}>
            Total Pendiente:         <Text style={styles.resumenBold}>${resumen.totalPendiente.toLocaleString()}</Text>
          </Text>

          <Text style={styles.resumenText}>
            Pagos Realizados:        <Text style={styles.resumenBold}>{resumen.cantidadPagados} de {resumen.cantidadTotal} pagos</Text>
          </Text>
        </View>

      </ScrollView>


      <BottomNavBar />
    </View>
  );
}

/* ---------------- chart configs ---------------- */

const chartRed = {
  backgroundColor: "#7F1D1D",
  backgroundGradientFrom: "#B91C1C",
  backgroundGradientTo: "#EF4444",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  style: {
    borderRadius: 12,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#FFF",
  },
};

const chartBlue = {
  backgroundColor: "#0B3D91",
  backgroundGradientFrom: "#1E40AF",
  backgroundGradientTo: "#3B82F6",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  style: {
    borderRadius: 12,
  },
};

const chartPurple = {
  backgroundColor: "#4C1D95",
  backgroundGradientFrom: "#6D28D9",
  backgroundGradientTo: "#A78BFA",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  style: {
    borderRadius: 12,
  },
};

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0056B3",
    marginBottom: 12,
  },

  mesesScroll: {
    marginBottom: 8,
  },

  mesesContent: {
    paddingVertical: 6,
    paddingRight: 10,
    alignItems: "center",
  },

  mesButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,  // ← MÁS ESPACIO
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    minHeight: 38,
    marginRight: 10,
  },


  mesButtonActive: {
    backgroundColor: "#1E6CFB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  mesText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 15,
  },
  mesTextActive: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },


  scrollContent: {
    paddingBottom: 140,
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 8,
    color: "#333",
  },

  chartBox: {
    borderRadius: 12,
    marginBottom: 22,
  },

  chartBoxBottom: {
    borderRadius: 12,
    marginBottom: 40,
  },
  resumenBox: {
  backgroundColor: "#FFF",
  padding: 15,
  borderRadius: 12,
  marginHorizontal: 10,
  marginTop: 15,
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
  shadowOffset: { width: 0, height: 2 },
},

resumenTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#1E40AF",
  marginBottom: 10,
},

resumenText: {
  fontSize: 15,
  marginBottom: 6,
  color: "#333",
},

resumenBold: {
  fontWeight: "bold",
  color: "#000",
},

});


