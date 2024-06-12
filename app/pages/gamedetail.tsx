import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GameDetail = () => {
    const route = useRoute();
    const gameResult = route.params.result;
    const result = JSON.parse(gameResult);
    const navigation = useNavigation();
    const [isFavorited, setIsFavorited] = useState(false);
    const [headerImage, setHeaderImage] = useState(null);

    useEffect(() => {
        fetch(`https://store.steampowered.com/api/appdetails?appids=${result.appid}`)
            .then(response => response.json())
            .then(data => {
                if (data && data[result.appid] && data[result.appid].success) {
                    const headerImage = data[result.appid].data.header_image;
                    setHeaderImage(headerImage);
                } else {
                    console.error("Failed to fetch data for app ID:", result.appid);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [result.appid]);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const handlePress = () => {
        Linking.openURL(result.link);
    };

    return (
        <View style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: "#fff", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, marginLeft: -44 }}>{result.name}</Text>
                </View>
            </View>
            {headerImage && <Image source={{ uri: headerImage }} style={{ width: 320, height: 150, alignSelf: 'center', marginBottom: 10, borderRadius: 15 }} />}
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
                    <Text style={{marginBottom:10}}>发行日期:</Text>
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: -10 }}>
                        <Text>{result.release_date}</Text>
                    </View>
                </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 15 }}>简介</Text>
            <Text>{result.description}</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity onPress={toggleFavorite} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                        <Ionicons name={isFavorited ? "heart" : "heart-outline"} size={24} color={isFavorited ? "red" : "black"} />
                        <Text style={{ marginLeft: 8 }}>{isFavorited ? "已加入收藏" : "加入收藏"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priceButton} onPress={handlePress}>
                        <Text style={styles.priceButtonText}>
                            {result.price === 0 ? 
                            "免费" 
                            : result.price === null ?
                             "暂无价格"
                             : `¥${result.price}`
                            }
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
