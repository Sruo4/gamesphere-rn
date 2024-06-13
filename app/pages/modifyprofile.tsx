import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const ModifyProfileScreen = () => {
    const [brief, setBrief] = useState('');
    const navigation = useNavigation();
    const host = "http://192.168.233.242:3000";
    const uuid = 1;

    const handleConfirm = async () => {
        try {
            const response = await fetch(`${host}/modify-profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uuid, brief }),
            });

            // 获取响应的状态码
            const statusCode = response.status;

            if (statusCode === 200) {
                alert("简介修改成功");
                navigation.goBack();
            } else if (statusCode === 500) {
                alert("修改失败");
            } else {
                // 解析响应文本为JSON对象
                const data = JSON.parse(responseText);
                alert(`修改失败: ${data.message}`);
            }
        } catch (error) {
            alert(`请求失败: ${error.message}`);
        }
    };

    // 处理返回按钮的逻辑
    const handleBack = () => {
        navigation.goBack();  // 返回上一个页面
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="输入简介"
                value={brief}
                onChangeText={text => setBrief(text)}
                multiline
                textAlignVertical="top"  // 设置文本垂直居顶部
            />
            <Button title="确认" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',  // 文本框靠上
        alignItems: 'center',
        padding: 20,
        marginTop: 10,  // 调整整体位置
    },
    input: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        marginTop: 80,
    },
    backButton: {
        position: "absolute",
        top: 55,
        left: 20,
    },
});

export default ModifyProfileScreen;
