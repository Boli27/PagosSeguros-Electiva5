import React from 'react'
import { View, Text, StyleSheet, Touchable, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PrimaryButton from '../components/PrimaryButton'
import BottomNavBar from '../components/BottomNavBar'
import { useNavigation } from "@react-navigation/native";

export const PerfilUsuarioScreen = () => {

    const navigation = useNavigation<any>();

    const usuario = {
    nombre: 'Juan Pérez',
    correo: 'juanP@gmial.com',
    miembroDesde: 'Enero 2022',
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person-circle" size={120} color="#007BFF" />
                    <Text style={styles.nombre}>{usuario.nombre}</Text>
                    <Text style={styles.correo}>{usuario.correo}</Text>
                    <Text style={styles.miembroDesde}>Miembro desde {usuario.miembroDesde}</Text>
                </View>

                <PrimaryButton 
                text = "Editar Perfil" 
                onPress={() => navigation.navigate("EditarPerfil")}
                />

                <PrimaryButton 
                    text ="Cerrar Sesión"
                    onPress={() => {}}
                    style = {{ backgroundColor: '#909090ff' }}
                />

                <PrimaryButton
                    text ="Eliminar Cuenta"
                    onPress={() => {}}
                    style = {{ backgroundColor: '#E74C3C' }}
                />
            </ScrollView>

            {/* Barra de navegación inferior */}
            <BottomNavBar />
        </View>
        )
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },

    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    nombre: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#0056b3',
    },

    correo: {
        fontSize: 16,
        color: '#555555',
    },

    miembroDesde: {
        fontSize: 14,
        color: '#888888',
        marginTop: 5,
    },  
})
