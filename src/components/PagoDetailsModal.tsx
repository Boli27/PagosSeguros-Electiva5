import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "./PrimaryButton";
import { Pago, marcarComoPagado } from "../service/pagosService";

type Props = {
  visible: boolean;
  pago: Pago | null;
  onClose: () => void;
  onUpdated?: () => void; // ← para refrescar la lista cuando cambie
};

export default function PagoDetailsModal({ visible, pago, onClose, onUpdated }: Props) {
  if (!pago) return null;

  const handleMarcarPagado = () => {
    marcarComoPagado(pago.id);
    onClose();
    onUpdated && onUpdated(); // ← refresca datos en la screen
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>

          {/* BOTÓN X (cerrar) */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Detalles del Pago</Text>

          <Text style={styles.item}>Nombre: {pago.nombre}</Text>
          <Text style={styles.item}>Estado: {pago.estado}</Text>
          <Text style={styles.item}>Prioridad: {pago.prioridad}</Text>
          <Text style={styles.item}>Valor: ${pago.valor.toLocaleString()}</Text>
          <Text style={styles.item}>Vence: {pago.fechaVencimiento}</Text>

          {/* SOLO mostrar botón si aún está pendiente */}
          {pago.estado === "Pendiente" && (
            <PrimaryButton
              title="Marcar como Pagado"
              onPress={handleMarcarPagado}
            />
          )}

          <PrimaryButton title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    width: "90%",
    borderRadius: 12,
    position: "relative",
  },

  // Posicionar la X
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});
