import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from '../navigation/types';

    type Pago = {
        id: string;
        nombre: string;
        estado: string;
        prioridad: string;
        valor: string;
        fechaVencimiento?: string;
    }

type NavProp = StackNavigationProp<RootStackParamList, 'MisPagos'>;

    export default function MisPagosScreen () {

        const navigation = useNavigation<NavProp>();

        const [ modalVisible, setModalVisible ] = React.useState(false);
        const [ pagoSeleccionado, setPagoSeleccionado ] = React.useState<Pago | null>(null);
        
        const pagos = [
            { id: '1', nombre: 'Pago de luz', estado: 'Pendiente', prioridad: 'Alta', valor: '$50.000', fechaVencimiento: '2025-09-15' },
            { id: '2', nombre: 'Pago de agua', estado: 'Pagado', prioridad: 'Media', valor: '$30.000', fechaVencimiento: '2025-09-10' },
            { id: '3', nombre: 'Pago de internet', estado: 'Pendiente', prioridad: 'Baja', valor: '$80.000', fechaVencimiento: '2025-09-20' },
            { id: '4', nombre: 'Pago de renta', estado: 'Pagado', prioridad: 'Alta', valor: '$500.000', fechaVencimiento: '2025-09-01' },
            { id: '5', nombre: 'Pago de teléfono', estado: 'Pendiente', prioridad: 'Media', valor: '$40.000' , fechaVencimiento: '2025-09-18' },
        ];

        const getCardStyle = (prioridad: string) => {
            switch (prioridad) {
                case 'Alta':
                    return { borderLeftWidth: 5, borderLeftColor: '#FF4C4C' };
                case 'Media':
                    return { borderLeftWidth: 5, borderLeftColor: '#FFA500' };
                case 'Baja':
                    return { borderLeftWidth: 5, borderLeftColor: '#4CAF50' };
                default:
                    return {};
            }
        };

        const getIcon = (prioridad: string) => {
            switch (prioridad) {
                case 'Alta':
                    return <Ionicons name="alert-circle" size={28} color="#FF4C4C" />;
                case 'Media':
                    return <Ionicons name="warning" size={28} color="#FFA500" />;
                case 'Baja':
                    return <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />;
                default:
                    return null;
            }
        };


        return (
            <View style={styles.container}>
            
                {/* Titulo */}
                <Text style={styles.title}>Mis Pagos</Text>

                {/* Lista de Pagos */}

                <FlatList
                    data={pagos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.card
                            , getCardStyle(item.prioridad)]}>
                            <View>
                                <Text style={styles.cardTitle}>Nombre: {item.nombre}</Text> 
                                <Text style={styles.cardSubtitle}>Valor: {item.valor}</Text>
                                <Text style={styles.cardSubtitle}>Vence: {item.fechaVencimiento}</Text>
                            </View> 
                            
                            {/* Icono de prioridad */}
                            {getIcon(item.prioridad)}
                            
                            {/*Boton para ver detalles */}
                            
                            <TouchableOpacity
                                onPress={() => {
                                    setPagoSeleccionado(item);
                                    setModalVisible(true);
                                }}
                                style= {{ padding : 5 }}
                            >
                                <Ionicons name="information-circle" size={24} color="#007BFF" />
                            </TouchableOpacity>
                        </View>  
                    )}
                />
                            {/* Botón flotante para agregar nuevo pago */}
                            <TouchableOpacity 
                                style={styles.addButton}
                                onPress={() => {
                                    alert('Agregar nuevo pago');}}
                            >
                                <Text style={styles.addButtonText}>Nuevo Pago</Text>   
                            </TouchableOpacity>
                        
                {/* BArra infeior de navegación */}
                <View style={styles.bottomNav}>
                    <View style={styles.navItem}>
                        <Ionicons name="home" size={22} color="#007BFF" />
                        <Text style={styles.navActive}>Inicio</Text>
                    </View>
                    <View style={styles.navItem}>
                        <Ionicons name="time" size={22} color="#AAAAAA" />
                        <Text style={styles.navIanctive}>Historial</Text>
                    </View>
                    <View style={styles.navItem}>
                        <Ionicons name="bar-chart" size={22} color="#AAAAAA" />
                        <Text style={styles.navIanctive}>Resumen</Text>
                    </View>
                    <View style={styles.navItem}>
                        <Ionicons name="person" size={22} color="#AAAAAA" />
                        <Text style={styles.navIanctive}>Perfil</Text>
                    </View>
                </View>
                
                {/* Modal de detalles del pago */}
                
                {pagoSeleccionado && (
                    <Modal visible={modalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Detalles del Pago</Text>
                                <Text style={styles.modalItem}>Nombre: {pagoSeleccionado.nombre}</Text>
                                <Text style={styles.modalItem}>Estado: {pagoSeleccionado.estado}</Text>
                                <Text style={styles.modalItem}>Prioridad: {pagoSeleccionado.prioridad}</Text>
                                <Text style={styles.modalItem}>Valor: {pagoSeleccionado.valor}</Text>
                                <Text style={styles.modalItem}>Vence: {pagoSeleccionado.fechaVencimiento}</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                )}
            </View>
        )
    }
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    title:{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#0056B3",
    },

    subtitle:{
        fontSize: 16,
        color: "#4A4A4A",
        marginBottom: 20,
    },

    card:{
        backgroundColor: "#F8F9FA",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardTitle:{
        fontSize: 18,
        fontWeight: "bold",
    },

    cardSubtitle:{
        fontSize: 14,
        color: "#666",
    },

    addButton:{
        backgroundColor: "#007BFF",
        paddingVertical: 15,
        borderRadius: 10,
        position: "absolute",
        bottom: 80,
        alignItems: "center",
        left: 20,
        right: 20,
    },

    addButtonText:{
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    bottomNav:{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#EEEEEE",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 65,
        paddingTop: 10,
    },

    navItem:{
        alignItems: "center",
    },

    navActive:{
        color: "#007BFF",
        fontWeight: "bold",
        fontSize: 12,
    },

    navIanctive:{
        color: "#AAAAAA",
        fontSize: 12,
    },

    modalBackground:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    modalContainer:{
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 25,
        width: '100%',
        elevation: 10,
    },

    modalTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    modalItem:{
        fontSize: 16,
        marginBottom: 8,
    },

    closeButton:{
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },

    closeButtonText:{
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
});
