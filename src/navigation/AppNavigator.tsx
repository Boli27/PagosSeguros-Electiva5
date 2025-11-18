import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MisPagosScreen from "../screens/MisPagosScreen";
import DetallesPagoScreen from "../screens/DetallesPagoScreen";

import { RootStackParamList } from "./types";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/*Pantallas de autenticación */}
        
        {/*Pantalla LOGIN y REGISTER */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/*Pantalla HOME - Mis Pagos*/}
        <Stack.Screen name="MisPagos" component={MisPagosScreen} />
        <Stack.Screen name="DetallesPago" component={MisPagosScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
