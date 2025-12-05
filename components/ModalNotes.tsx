import React from "react";
import { Modal, View, TextInput, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { useTheme } from "../hooks/ThemeProvider";

type Props = {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    textNote: string;
    setTextNote: (value: string) => void;
    addNote: () => void;
};

export default function ModalNotes({ modalVisible, setModalVisible, textNote, setTextNote, addNote }: Props) {
    const { colors } = useTheme();

    return (
        <Modal animationType="slide" transparent visible={modalVisible}>
            <View style={styles.container}>
                <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
                    <Text style={[styles.title, { color: colors.text }]}>Додати нотатку</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
                        placeholder="Введіть нотатку..."
                        placeholderTextColor={colors.placeholder}
                        value={textNote}
                        onChangeText={setTextNote}
                    />
                    <CustomButton title="Додати" onPress={addNote} />
                    <CustomButton title="Закрити" onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalBox: { width: "80%", padding: 20, borderRadius: 15 },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
    input: { padding: 12, borderRadius: 10, marginBottom: 15 },
});
