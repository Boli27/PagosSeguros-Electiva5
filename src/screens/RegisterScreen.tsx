import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomInput from "../components/CustomInput";
import PrimaryButton from "../components/PrimaryButton";
import { registerUser } from "../service/authService";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = () => {
    const result = registerUser(name, email.toLowerCase(), pass);

    if (!result.ok) {
      alert(result.message);
    }
    if (result.ok) {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Crea tu cuenta</Text>

      <CustomInput placeholder="Nombre Completo" value={name} onChangeText={setName} />
      <CustomInput placeholder="Correo Electrónico" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Crear Contraseña" secureTextEntry value={pass} onChangeText={setPass} />

      <View style={styles.barContainer}>
        <View style={[styles.bar, pass.length < 6 && styles.weak, pass.length >= 6 && styles.strong, pass.length == 0 && styles.none]} />
      </View>

      <Text style={styles.strengthLabel}>
        {pass.length < 4 ? "Contraseña débil" : "Contraseña fuerte"}
      </Text>

      <PrimaryButton title="Crear Cuenta" onPress={handleRegister} />

      <Text style={styles.footer}>
        ¿Ya tienes una cuenta?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Inicia sesión
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F2F6FF"
  },
  logo: {
    width: 210, height: 110, marginBottom: 10
  },
  title: {
    fontSize: 26, fontWeight: "bold", marginBottom: 10
  },
  barContainer: {
    width: "90%",
    height: 4,
    backgroundColor: "#ddd",
    marginTop: 5
  },
  bar: {
    height: "100%",
    width: "100%"
  },
  weak: { backgroundColor: "red" },
  strong: { backgroundColor: "green" },
  none: { backgroundColor: "#ddd" },
  strengthLabel: {
    alignSelf: "flex-start",
    paddingLeft: "5%",
    fontSize: 12,
    marginBottom: 10
  },
  footer: { marginTop: 20 },
  link: { color: "#1E6CFB" }
});
