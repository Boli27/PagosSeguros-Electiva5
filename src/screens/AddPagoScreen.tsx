import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import CustomInput from "../components/CustomInput";
import PrimaryButton from "../components/PrimaryButton";
import { Picker } from "@react-native-picker/picker";
import { addPago } from "../service/pagosService";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddPagoScreen() {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const [nombre, setNombre] = useState("");
    const [valor, setValor] = useState("");
    const [fecha, setFecha] = useState("");
    const [prioridad, setPrioridad] = useState("Media");
    const [showPicker, setShowPicker] = useState(false);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            const iso = selectedDate.toISOString().split("T")[0];
            setFecha(iso);
        }
    };

    const handleAgregarPago = () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "El nombre es obligatorio");
            return;
        }

        if (!valor.trim()) {
            Alert.alert("Error", "El valor es obligatorio");
            return;
        }

        if (isNaN(Number(valor))) {
            Alert.alert("Error", "El valor debe ser un número");
            return;
        }

        if (!fecha.trim()) {
            Alert.alert("Error", "Debe seleccionar una fecha");
            return;
        }

        const nuevoPago = {
            id: Date.now().toString(),
            nombre,
            estado: "Pendiente",
            prioridad: prioridad as "Alta" | "Media" | "Baja",
            valor: Number(valor),
            fechaVencimiento: fecha,
        };

        addPago(nuevoPago);

        Alert.alert("Éxito", "Pago agregado correctamente");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#0056B3" />
            </TouchableOpacity>

            <Text style={styles.title}>Agregar Nuevo Pago</Text>

            <CustomInput placeholder="Nombre del pago" value={nombre} onChangeText={setNombre} />

            <CustomInput
                placeholder="Valor (solo números)"
                value={valor}
                keyboardType="numeric"
                onChangeText={setValor}
            />

            <CustomInput
                placeholder="Fecha de vencimiento"
                value={fecha}
                editable={false}                // evita que escriban texto
                icon="calendar-outline"         // ícono dentro del input
                onPressIcon={() => setShowPicker(true)}
            />

            {showPicker && (
                <DateTimePicker
                    value={fecha ? new Date(fecha) : new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}


            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Prioridad</Text>

                <Picker selectedValue={prioridad} onValueChange={setPrioridad} style={styles.picker}>
                    <Picker.Item label="Alta" value="Alta" />
                    <Picker.Item label="Media" value="Media" />
                    <Picker.Item label="Baja" value="Baja" />
                </Picker>
            </View>

            {/* 🔽 Botón más abajo */}
            <View style={styles.bottomButton}>
                <PrimaryButton title="Agregar Pago" onPress={handleAgregarPago} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },

    // BOTON VOLVER
    backButton: {
        position: "absolute",
        top: 30,
        left: 20,
        padding: 5,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#0056B3",
    },

    pickerContainer: {
        width: "90%",
        marginVertical: 15,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 10,
    },

    pickerLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: "#333",
    },

    picker: {
        width: "100%",
    },

    bottomButton: {
        marginTop: 150,
        width: "100%",
        alignItems: "center",
    },
});
