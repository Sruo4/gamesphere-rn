import React, { useState, useEffect } from "react";
import { View, TextInput, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";


export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const initialSearchTerm = route.params?.searchTerm || "";

    useEffect(() => {
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm);
            handleSearch(initialSearchTerm);
        }
    }, [initialSearchTerm]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        const results = [
            {
                id: 1,
                title: "刺客信条",
                description: "一款动作冒险游戏",
                image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_sm_120_schinese.jpg?t=1716915649',
            },
            {
                id: 2,
                title: "部落冲突",
                description: "一款策略塔防游戏",
                image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_sm_120_schinese.jpg?t=1716915649',
            },
            {
                id: 3,
                title: "王者荣耀",
                description: "一款MOBA游戏",
                image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_sm_120_schinese.jpg?t=1716915649',
            },
            {
                id: 4,
                title: "我的世界",
                description: "一款沙盒游戏",
                image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_sm_120_schinese.jpg?t=1716915649',
            },
            {
                id: 5,
                title: "炉石传说",
                description: "一款卡牌游戏",
                image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_sm_120_schinese.jpg?t=1716915649',
            },
        ];
        setSearchResults(results.filter(game => game.title.includes(value)));
    };

    const handleSearchButtonPress = () => {
        handleSearch(searchTerm);
    };

    return (
        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1, backgroundColor: "#fff", borderRadius: 20, paddingVertical: 12, paddingHorizontal: 16, marginLeft: 10, marginRight: 10 }}>
                    <Ionicons name="search" size={20} color="black" />
                    <TextInput
                        style={{ flex: 1, marginLeft: 10 }}
                        placeholder="搜索游戏"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSearchButtonPress}>
                    <Text style={styles.buttonText}>搜索</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal={true} style={{ marginBottom: 20, height: 30 }}>
                <View style={{ flexDirection: "row", height: 10 }}>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text>免费</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text>￥0-50</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text>￥50-100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text>￥100-200</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton}>
                        <Text>￥200以上</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ScrollView>
                {searchResults.length > 0 ? (
                    searchResults.map(result => (
                        <View key={result.id} style={{ flexDirection: "row", padding: 10, backgroundColor: "#fff", marginBottom: 10, borderRadius: 10 }}>
                            <FastImage source={{ uri: result.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{result.title}</Text>
                                <Text>{result.description}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>没有找到相关游戏</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 45,
        backgroundColor: "#007AFF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    smallButton: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: "center",
        height: 30,
    },
});
