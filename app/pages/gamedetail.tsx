import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GameDetail = () => {
    const route = useRoute();
    const { id }: { id: string } = route.params as { id: string };
    const navigation = useNavigation();
    const result =
    {
        id: 1,
        title: "命运2",
        score: 9.9,
        price: 288,
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_sm_120_schinese.jpg?t=1716915649',
        publisher: 'Bungie',
        developer: 'Bungie',
        releaseDate: '2019 年 10 月 1 日',
    };

    return (
        <View style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: "#fff", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, marginLeft: -44 }}>{result.title}</Text>
                </View>
            </View>
            <Image source={{ uri: result.image }} style={{ width: 320, height: 150, alignSelf: 'center', marginBottom: 10, borderRadius: 15 }} />

            <View style={{ flexDirection: 'row', backgroundColor: '#F0F0F0', padding: 10, borderRadius: 8 }}>
                <View style={{ flex: 1 }}>
                    <Text>发行商:</Text>
                    <Text>{result.publisher}</Text>
                </View>
                <View style={{ width: 1, backgroundColor: 'black', marginHorizontal: 5 }} />
                <Text style={{ flex: 1 }}>{result.developer}</Text>
                <View style={{ width: 1, backgroundColor: 'black', marginHorizontal: 5 }} />
                <Text style={{ flex: 2 }}>{result.releaseDate}</Text>
            </View>
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
