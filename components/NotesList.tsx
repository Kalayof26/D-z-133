import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeProvider";

type Note = { id: number; text: string; completed: boolean };
type Props = { notes: Note[]; deleteNote: (id: number) => void; toggleNote: (id: number) => void };

export default function NotesList({ notes, deleteNote, toggleNote }: Props) {
    const { colors } = useTheme();
    return (
        <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
                <View style={[styles.noteItem, { backgroundColor: colors.card }]}>
                    <TouchableOpacity onPress={() => toggleNote(item.id)} style={{ flex: 1 }}>
                        <Text style={[styles.text, { color: colors.text }, item.completed && styles.completed]}>
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteNote(item.id)}>
                        <Text style={styles.delete}>✖</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    noteItem: { padding: 15, borderRadius: 10, marginVertical: 6, flexDirection: "row", alignItems: "center" },
    text: { fontSize: 16 },
    completed: { textDecorationLine: "line-through", opacity: 0.5 },
    delete: { color: "red", fontSize: 20, marginLeft: 12 },
});
