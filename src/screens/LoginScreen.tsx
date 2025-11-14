import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomInput from "../components/CustomInput";
import PrimaryButton from "../components/PrimaryButton";
import { loginUser } from "../service/authService";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const result = loginUser(email, password);
    alert(result.message);

    if (result.ok) {
      // Aquí podrías navegar al home
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bienvenido a PagoSeguro</Text>
      <Text style={styles.subtitle}>tu gestor de confianza</Text>

      <CustomInput placeholder="Correo Electrónico" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Contraseña" value={password} secureTextEntry onChangeText={setPassword} />

      <PrimaryButton title="Iniciar Sesión" onPress={handleLogin} />

      <Text style={styles.footer}>
        ¿No tienes una cuenta?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
          Regístrate aquí
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F6FF",
  },
  logo: {
    width: 210,
    height: 110,
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20
  },
  footer: {
    marginTop: 25
  },
  link: {
    color: "#1E6CFB"
  }
});
