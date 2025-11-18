import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pago } from "../service/pagosService";

type Props = {
  item: Pago;
  onPress: () => void;
};

export default function PagoCard({ item, onPress }: Props) {

  const Estado = () => {
    if (item.estado === "Pagado") {
      return {
        mensaje: "Pagado",
        color: "#4B72F2",
        icon: "checkmark-circle",
        iconColor: "#4B72F2"
      };
    }

    const hoy = new Date();
    const venc = new Date(item.fechaVencimiento);
    const diffDias = Math.floor((hoy.getTime() - venc.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDias > 0) {
      return {
        mensaje: `Vencida hace ${diffDias} días`,
        color: "#FF4C4C",
        icon: "alert-circle",
        iconColor: "#FF4C4C",
      };
    }

    if (diffDias === 0) {
      return {
        mensaje: "Vence hoy",
        color: "#FFA500",
        icon: "alert",
        iconColor: "#FFA500",
      };
    }

    return {
        mensaje: `Vence en ${Math.abs(diffDias)} días`,
        color: "#4CAF50",
        icon: "checkmark-circle",
        iconColor: "#4CAF50",
    };
  };

  const estado = Estado();

  const priorityColors: any = {
    Alta: "#FF6B6B",
    Media: "#FFA726",
    Baja: "#4CAF50",
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>

        {/* ICONO DE ESTADO (IZQUIERDA) */}
        <View style={[styles.iconContainer, { backgroundColor: estado.color + "33" }]}>
          <Ionicons
            name={estado.icon as any}
            size={26}
            color={estado.iconColor}
          />
        </View>

        {/* CONTENIDO */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={[styles.subtitle, { color: estado.color }]}>
            {estado.mensaje}
          </Text>
        </View>

        {/* CHIP DE PRIORIDAD */}
        <View style={[styles.prioridadChip, { backgroundColor: priorityColors[item.prioridad] + "33" }]}>
          <Text style={[styles.prioridadText, { color: priorityColors[item.prioridad] }]}>
            {item.prioridad}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  prioridadChip: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },

  prioridadText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
