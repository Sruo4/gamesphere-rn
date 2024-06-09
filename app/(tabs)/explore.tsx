import React, { useState } from "react";
import { View, TextInput, Text, ScrollView } from "react-native";
import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui';
export default function Component() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        const results = [
            {
                id: 1,
                title: "刺客信条",
                description: "一款动作冒险游戏",
                image: require("../../assets/favicon.png"),
            },
            {
                id: 2,
                title: "部落冲突",
                description: "一款策略塔防游戏",
                image: require("../../assets/favicon.png"),
            },
            {
                id: 3,
                title: "王者荣耀",
                description: "一款MOBA游戏",
                image: require("../../assets/favicon.png"),
            },
            {
                id: 4,
                title: "我的世界",
                description: "一款沙盒游戏",
                image: require("../../assets/favicon.png"),
            },
            {
                id: 5,
                title: "炉石传说",
                description: "一款卡牌游戏",
                image: require("../../assets/favicon.png"),
            },
        ];
        setSearchResults(results);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                <TextInput
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        width: "80%",
                        marginTop: 170,
                    }}
                    placeholder="搜索游戏"
                    value={searchTerm}
                    onChangeText={handleSearch}
                />
            </View>
            <ScrollView style={{ flex: 3 }}>
                <View style={{ padding: 12 }}>
                    {searchTerm.length > 0 ? (
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
                                搜索结果
                            </Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {searchResults.map((game) => (
                                    <View
                                        key={game.id}
                                        style={{
                                            backgroundColor: "#fff",
                                            borderRadius: 8,
                                            margin: 4,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                        }}
                                    >
                                        <Image
                                            source={game.image}
                                            style={{ width: 120, height: 80, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                        />
                                        <View style={{ padding: 8 }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{game.title}</Text>
                                            <Text style={{ fontSize: 14, color: "#666" }}>{game.description}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ) : null}
                    <Text style={{ fontSize: 16, opacity: 0.6, marginBottom: 10 }}>热门搜索</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                        <Card elevate style={{ marginTop: 10, marginBottom: 0, width: 50, height: 50 }}>
                            {/* Card 内容 */}
                        </Card>
                        <Card elevate style={{ marginTop: 10, marginBottom: 0, width: 50, height: 50 }}>
                            {/* Card 内容 */}
                        </Card>
                        <Card elevate style={{ marginTop: 10, marginBottom: 0, width: 50, height: 50 }}>
                            {/* Card 内容 */}
                        </Card>
                        <Card elevate style={{ marginTop: 10, marginBottom: 0, width: 50, height: 50 }}>
                            {/* Card 内容 */}
                        </Card>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
