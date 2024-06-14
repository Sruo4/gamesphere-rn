import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../app/context/AuthContext"; // 引入AuthContext

export default function BindSteam() {
    const [steamId, setSteamId] = useState("");
    const [apiKey, setApiKey] = useState("");
    const navigation = useNavigation();
    const host = "http://172.20.10.2:3000";
    const { state } = useContext(AuthContext);
    const uuid = state.uuid;

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${host}/bind-steam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uuid, steamId, apiKey }),
            });

            // 获取响应的状态码
            const statusCode = response.status;

            if (statusCode === 200) {
                alert("Steam绑定成功");
                navigation.goBack();
            } else if (statusCode === 500) {
                alert("绑定出错");
            } else {
                // 解析响应文本为JSON对象
                const data = JSON.parse(response);
                alert(`绑定失败: ${data.message}`);
            }
        } catch (error: any) {
            alert(`请求失败: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerLabel}>Steam ID</Text>
            <TextInput
                style={styles.input}
                value={steamId}
                onChangeText={setSteamId}
            />
            <Text style={styles.label}>API Key</Text>
            <TextInput
                style={styles.input}
                value={apiKey}
                onChangeText={setApiKey}
                secureTextEntry
            />
            <Button title="绑定Steam" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    backButton: {
        position: "absolute",
        top: 55,
        left: 20,
    },
    headerLabel: {
        fontSize: 18,
        marginBottom: 10,
        marginTop: 90,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
