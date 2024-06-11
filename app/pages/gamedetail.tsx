import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GameDetail = () => {
    const route = useRoute();
    const { id }: { id: string } = route.params as { id: string };
    const navigation = useNavigation();
    const [isFavorited, setIsFavorited] = useState(false);
    const result =
    {
        id: 1,
        title: "命运2",
        score: 9.9,
        price: 288,
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header_schinese.jpg?t=1715334241',
        publisher: 'Bungie',
        developer: 'Bungie',
        releaseDate: '2019 年 10 月 1 日',
        description: '命运2是发生在一个独立进化的世界中的一款免费的大型多人线上动作游戏。你可以在任何时间与任何地点和你的朋友们进行游戏。'
    };

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
        // 在这里可以添加将游戏加入收藏的逻辑，例如存储到本地或发送到服务器
    };

    const handlePress = () => {
        Linking.openURL('https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header_schinese.jpg?t=1715334241')
    }

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

            <View style={{ flexDirection: 'row', backgroundColor: '#F0F0F0', padding: 10, borderRadius: 8, marginTop: 10, marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                    <Text>发行商:</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{result.publisher}</Text>
                    </View>
                </View>
                <View style={{ width: 1, backgroundColor: '#BFBFBF', marginHorizontal: 5 }} />
                <View style={{ flex: 1 }}>
                    <Text>开发商:</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{result.developer}</Text>
                    </View>
                </View>
                <View style={{ width: 1, backgroundColor: '#BFBFBF', marginHorizontal: 5 }} />
                <View style={{ flex: 2 }}>
                    <Text>发行日期:</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{result.releaseDate}</Text>
                    </View>
                </View>
            </View>

            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 15 }}>简介</Text>
            <Text>{result.description}</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity onPress={toggleFavorite} style={{ flexDirection: 'row', alignItems: 'center', marginLeft:20 }}>
                        <Ionicons name={isFavorited ? "heart" : "heart-outline"} size={24} color={isFavorited ? "red" : "black"} />
                        <Text style={{ marginLeft: 8 }}>{isFavorited ? "已加入收藏" : "加入收藏"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priceButton} onPress={handlePress}>
                        <Text style={styles.priceButtonText}>
                            {result.price === 0 ? "免费" : `￥${result.price}`}
                        </Text>
                    </TouchableOpacity>
                </View>
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
    priceButton: {
        backgroundColor: '#1A47FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginRight: 10,
        width: 150,
        height: 60,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    priceButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default GameDetail;
