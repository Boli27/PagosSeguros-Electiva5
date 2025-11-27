import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText?: (t: string) => void;
  keyboardType?: "default" | "numeric";
  secureTextEntry?: boolean;
  editable?: boolean;
  icon?: string;                // ← opcional
  onPressIcon?: () => void;     // ← opcional
};

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  editable = true,
  icon,
  onPressIcon,
}: Props) {
  return (
    <View style={styles.container}>

      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={[styles.input, icon ? { paddingRight: 40 } : {}]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />

      {icon && (
        <TouchableOpacity style={styles.iconButton} onPress={onPressIcon}>
          <Ionicons name={icon as any} size={24} color="#0056B3" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 8,
    position: "relative",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 16,
  },
  iconButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
});
