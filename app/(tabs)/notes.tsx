import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/CustomButton";
import NotesList from "../../components/NotesList";
import ModalNotes from "../../components/ModalNotes";
import { useTheme } from "../../hooks/ThemeProvider";

type Note = {
    id: number;
    text: string;
    completed: boolean;
};

export default function NotesScreen() {
    const { colors } = useTheme();
    const [notes, setNotes] = useState<Note[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [textNote, setTextNote] = useState("");

    useEffect(() => {
        const loadNotes = async () => {
            const data = await AsyncStorage.getItem("notes");
            if (data) setNotes(JSON.parse(data));
        };
        loadNotes();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!textNote.trim()) return;
        const newNote: Note = { id: Date.now(), text: textNote, completed: false };
        setNotes((prev) => [...prev, newNote]);
        setTextNote("");
        setModalVisible(false);
    };

    const deleteNote = (id: number) => setNotes((prev) => prev.filter((note) => note.id !== id));

    const toggleNote = (id: number) => {
        setNotes((prev) => prev.map((note) => note.id === id ? { ...note, completed: !note.completed } : note));
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Мої нотатки</Text>
                <CustomButton title="Додати нотатку" onPress={() => setModalVisible(true)} />
            </View>
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
    header: { marginTop: 40, marginBottom: 20 },
    title: { fontSize: 26, fontWeight: "700", marginBottom: 12 },
});
