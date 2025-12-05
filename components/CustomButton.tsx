import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeProvider";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
};

export default function CustomButton({ title, onPress, variant = "primary" }: CustomButtonProps) {
    const { colors } = useTheme();

    const backgroundColor =
        variant === "primary" ? colors.primary :
            variant === "secondary" ? colors.secondary :
                variant === "danger" ? colors.danger :
                    colors.primary;

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 6,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
});

