import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RefreshButton({ onRefresh }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onRefresh}>
      <Ionicons name="refresh" size={20} color="#ffe11d" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DB4457",
    borderRadius: 20,
    borderColor: "#ffe11d",
    borderWidth: 2,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.1,
  },
});
