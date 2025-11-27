import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from "react-native"
import CustomInput from '../components/CustomInput'
import BottomNavBar from '../components/BottomNavBar'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'

export default function EditarPerfilScreen(){

    const navigation = useNavigation <any>();

    const [nombre, setNombre] = useState("Juan Perez");
    const [ correo, setCorreo] = useState ("juanP@gmial.com")

    return(

        <View style = {{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                <Text style = { styles.title}>Editar Perfil</Text>

                <CustomInput
                    label = "Nombre"
                    placeholder = 'Tu Nombre'
                    value = {nombre}
                    onChangeText={setNombre}
                />

                <CustomInput
                    label = "Correo"
                    placeholder = 'Tu Correo'
                    value = {correo}
                    onChangeText={setCorreo}
                />

                <PrimaryButton
                    text = "Guardar Cambios"
                    onPress = {() =>{
                        alert("Cambios guardados (placeholder)");
                    navigation.goBack()
                    }}
                />

                <PrimaryButton
                    text = "Cancelar"
                    onPress = {() => navigation.goBack()}
                    style = {{ backgroundColor: "#D9534F"}}
                />
                
            </ScrollView>

            <BottomNavBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#FFFFF"
    },

    title:{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#0056B3",
        textAlign: "center",
    },
})
