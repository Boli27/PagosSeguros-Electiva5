import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HistorialPagosScreen from "../screens/HistorialPagosScreen";
import ResumenPagosScreen from "../screens/ResumenPagosScreen";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MisPagosScreen from "../screens/MisPagosScreen";

import { RootStackParamList } from "./types";
import AddPagoScreen from "../screens/AddPagoScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/*Pantallas de autenticación */}
        
        {/*Pantalla LOGIN y REGISTER */}
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> */}

        {/*Pantalla HOME - Mis Pagos*/}
        <Stack.Screen name="MisPagos" component={MisPagosScreen} />
        <Stack.Screen name="AddPago" component={AddPagoScreen} />

        {/*Pantalla Historial*/}
        <Stack.Screen name="HistorialPagos" component={HistorialPagosScreen} />

        {/* Resumen Pagps*/}
        <Stack.Screen name="ResumenPagos" component={ResumenPagosScreen} />
                
      </Stack.Navigator>
    </NavigationContainer>
  );
}
