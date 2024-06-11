import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GameDetail = () => {
    const route = useRoute();
    const { id }: { id: string } = route.params as { id: string };
    const navigation = useNavigation();

    return (
        <View style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: "#fff", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
                    <Text style={{ textAlign: 'center', marginLeft: -20 }}>游戏名</Text>
                </View>
            </View>
            <Text style={styles.text}>Game Detail {id}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 20,
    },
});

export default GameDetail;
