import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { getPagosPagados, Pago } from "../service/pagosService";
import PagoCard from "../components/PagoCard";
import PagoDetailsModal from "../components/PagoDetailsModal";

export default function HistorialPagosScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<Pago | null>(null);

  const historial = getPagosPagados();

  return (
         <View style={styles.container}>
             <Text style={styles.title}>Historial de pagos</Text> 
             <FlatList
                 data={historial}
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
             <BottomNavBar />
 
             <PagoDetailsModal
                 visible={modalVisible}
                 pago={pagoSeleccionado}
                 onClose={() => setModalVisible(false)}
             />
         </View>
     );
 }
 
 const styles = StyleSheet.create({
     container: { flex: 1, backgroundColor: "#FFF", paddingTop: 60, paddingHorizontal: 20 },
     title: { fontSize: 24, fontWeight: "bold", color: "#0056B3", marginBottom: 20 },
     buttonWrapper: { position: "absolute", bottom: 80, left: 20, right: 20 },
 });