import { View, Text, StyleSheet } from "react-native";

export default function UsersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Сторінка користувачів</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 22,
    },
});
