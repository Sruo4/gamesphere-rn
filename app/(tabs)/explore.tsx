import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Component() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleConfirm = () => {
        if (searchTerm.trim() !== "") {
            router.push(`/pages/searchpage?searchTerm=${searchTerm}`);
        } else {
            // 处理搜索词为空的情况
            // 例如显示一个警告或者给用户一些反馈
            alert("搜索词不能为空");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row', backgroundColor:"#fff" }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "70%",
                    backgroundColor: "#E6E6E6",
                    borderRadius: 20,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    marginRight: 10,
                }}
            >
                <Ionicons name="search" size={20} color="black" />
                <TextInput
                    style={{ flex: 1, marginLeft: 10 }}
                    placeholder="搜索游戏"
                    value={searchTerm}
                    onChangeText={handleSearch}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>搜索</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 45,
        backgroundColor: "#007AFF", // 按钮背景颜色
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
