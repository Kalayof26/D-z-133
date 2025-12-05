import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/ThemeProvider";

export default function SettingsScreen() {
    const { theme, toggleTheme, colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Text style={[styles.text, { color: colors.text }]}>Тема: {theme}</Text>
            <View style={styles.switchContainer}>
                <Switch
                    value={theme === "dark"}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#3e3e3eff", true: "#81b0ff" }}
                    thumbColor={theme === "dark" ? "#f5dd4b" : "#f4f3f4"}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontSize: 20, marginBottom: 20 },
    switchContainer: { justifyContent: "center", alignItems: "center" }, // по центру
});
