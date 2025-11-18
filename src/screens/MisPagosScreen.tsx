import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import PrimaryButton from "../components/PrimaryButton";
import PagoCard from "../components/PagoCard";
import PagoDetailsModal from "../components/PagoDetailsModal";
import BottomNavBar from "../components/BottomNavBar";
import TotalBox from "../components/TotalBox";

import { getPagos, Pago } from "../service/pagosService";

export default function MisPagosScreen({ navigation }: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [pagoSeleccionado, setPagoSeleccionado] = useState<Pago | null>(null);
    const [pagos, setPagos] = useState<Pago[]>([]);

    // Recargar pagos cuando la pantalla se enfoca
    useFocusEffect(
        useCallback(() => {
            const data = getPagos();
            setPagos([...data]);
        }, [])
    );

    // Calcular total pendiente
    const totalPendiente = pagos
        .filter((p) => p.estado === "Pendiente")
        .reduce((acc, p) => acc + p.valor, 0);

    // Ordenar por prioridad
    const prioridadOrden: Record<string, number> = {
        Alta: 1,
        Media: 2,
        Baja: 3,
    };

    // Filtrar solo los pagos pendientes
    const pagosPendientes = pagos.filter(p => p.estado === "Pendiente");

    // Ordenar por prioridad SOLO los pendientes
    const pagosOrdenados = [...pagosPendientes].sort(
        (a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Pagos Pendientes</Text>

            <TotalBox title="Total de pagos pendientes este mes:" value={totalPendiente} />

            <FlatList
                data={pagosOrdenados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PagoCard
                        item={item}
                        onPress={() => {
                            setPagoSeleccionado(item);
                            setModalVisible(true);
                        }}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 140 }}
            />

            <View style={styles.buttonWrapper}>
                <PrimaryButton
                    title="Nuevo Pago"
                    onPress={() => navigation.navigate("AddPago")}
                />
            </View>

            <BottomNavBar />

            <PagoDetailsModal
                visible={modalVisible}
                pago={pagoSeleccionado}
                onClose={() => setModalVisible(false)}
                onUpdated={() => {
                    // Forzar refresco cuando un pago se marque como pagado
                    const data = getPagos();
                    setPagos([...data]);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF", paddingTop: 60, paddingHorizontal: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#0056B3", marginBottom: 20 },
    buttonWrapper: { position: "absolute", bottom: 80, left: 20, right: 20 },
});
