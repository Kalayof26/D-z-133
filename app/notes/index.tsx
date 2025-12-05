import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "../../components/CustomButton";
import NotesList from "../../components/NotesList";
import ModalNotes from "../../components/ModalNotes";
import useTheme from "../../hooks/use-theme";

type Note = {
    id: number;
    text: string;
    completed: boolean;
};

export default function NotesScreen() {
    const { colors } = useTheme();

    const [notes, setNotes] = useState<Note[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [textNote, setTextNote] = useState<string>("");

    // Завантаження нотаток при старті
    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await AsyncStorage.getItem("notes");
                if (data) setNotes(JSON.parse(data));
            } catch (error) {
                console.log("Error loading notes:", error);
            }
        };
        loadNotes();
    }, []);

    // Збереження нотаток при зміні
    useEffect(() => {
        const saveNotes = async () => {
            try {
                await AsyncStorage.setItem("notes", JSON.stringify(notes));
            } catch (error) {
                console.log("Error saving notes:", error);
            }
        };
        saveNotes();
    }, [notes]);

    const addNote = () => {
        if (textNote.trim() === "") return;

        const newNote: Note = {
            id: Date.now(),
            text: textNote,
            completed: false,
        };

        setNotes((prev) => [...prev, newNote]);
        setTextNote("");
        setModalVisible(false);
    };

    const deleteNote = (id: number) => setNotes((prev) => prev.filter((n) => n.id !== id));
    const toggleNote = (id: number) =>
        setNotes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
        );

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Text style={[styles.title, { color: colors.text }]}>Мої нотатки</Text>

            <CustomButton title="Додати нотатку" onPress={() => setModalVisible(true)} variant="primary" />

            <NotesList notes={notes} deleteNote={deleteNote} toggleNote={toggleNote} />

            <ModalNotes
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                textNote={textNote}
                setTextNote={setTextNote}
                addNote={addNote}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
});
