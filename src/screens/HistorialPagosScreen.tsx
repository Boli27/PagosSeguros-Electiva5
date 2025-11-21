import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { getPagosPagados, calcularTotal, Pago } from "../service/pagosService";
import PagoCard from "../components/PagoCard";
import PagoDetailsModal from "../components/PagoDetailsModal";
import TotalBox from "../components/TotalBox";
import BottomNavBar from "../components/BottomNavBar";

export default function HistorialPagosScreen() {
  const [visible, setVisible] = useState(false);
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);
  const [pagosPagados, setPagosPagados] = useState<Pago[]>([]);

  const loadPagos = () => {
    const datos = getPagosPagados();
    setPagosPagados(datos);
  };

  useEffect(() => {
    loadPagos();
  }, []);

  const totalPagado = calcularTotal(pagosPagados);

  return (
    <View style={styles.container}>
      <TotalBox title="Total Pagado" value={`$${totalPagado.toLocaleString()}`} />

      <FlatList
        contentContainerStyle={styles.listContent}
        data={pagosPagados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PagoCard
            item={item}
            onPress={() => {
              setSelectedPago(item);
              setVisible(true);
            }}
          />
        )}
        ListEmptyComponent={<View style={styles.empty}><></></View>}
      />

      <PagoDetailsModal
        visible={visible}
        pago={selectedPago}
        onClose={() => setVisible(false)}
        onUpdated={() => {
          // cuando el modal cambia algo (p. ej. marcar como pagado), recargamos
          loadPagos();
        }}
      />

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#EAF3FF" },
  listContent: { paddingBottom: 120 },
  empty: { height: 80, alignItems: "center", justifyContent: "center" },
});
