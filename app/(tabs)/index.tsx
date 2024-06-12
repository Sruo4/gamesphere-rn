import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Card } from "react-native-paper";

const handlePress = () => {
  Linking.openURL("https://heishenhua.com/");
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 搜索框 */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80",
            }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="请输入内容"
          // 您可以添加更多的属性，如 onChangeText, value 等
        />
        <Button title="Press me" onPress={() => {}} />
      </View>

      {/* banner卡片 */}
      <View>
        <Card style={styles.banner} onPress={handlePress}>
          <Image
            source={require("../../assets/blackmyth-wukong.jpg")}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>黑神话悟空开启预购</Text>
        </Card>
      </View>

      {/* Start分栏 */}
      <View style={styles.subfield}>
        <Text style={styles.largeText}>开始行动</Text>
        <Text style={styles.smallText}>探索一些正在流行的游戏</Text>
      </View>

      <ScrollView horizontal={true} style={{ height: 192, width: 343 }} showsHorizontalScrollIndicator={false} >
        <View style={{ flexDirection: "row", height: 10 }}>
          <TouchableOpacity style={styles.card}>
            <Text>免费</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text>￥0-50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text>￥50-100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text>￥100-200</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text>￥200以上</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Recommend 分栏 */}
      <View style={styles.subfield}>
        <Text style={styles.largeText}>为你推荐</Text>
        <Text style={styles.smallText}>探索你可能喜欢的游戏</Text>
      </View>

      <ScrollView horizontal={true} style={{ height: 100, width: 343 }} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", height: 10 }}>
          <TouchableOpacity style={styles.recommendCard}>
            <Text>免费</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recommendCard}>
            <Text>￥0-50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recommendCard}>
            <Text>￥50-100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recommendCard}>
            <Text>￥100-200</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recommendCard}>
            <Text>￥200以上</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 52,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  banner: {
    width: 343,
    height: 193,
    backgroundColor: "gray", // 改变背景颜色
    borderRadius: 12, // 边框圆角
  },
  bannerImage: {
    width: 343,
    height: 193,
    borderRadius: 12,
  },
  bannerText: {
    position: "absolute",
    bottom: 10, // 根据需要调整距离底部的距离
    left: 10, // 根据需要调整距离左侧的距离
    color: "white", // 文字颜色
    fontSize: 18, // 文字大小
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 半透明背景
    padding: 5, // 内边距
    borderRadius: 5,
  },
  subfield: {
    marginTop: 15,
    marginBottom: 10,
    width: 343,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  largeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  smallText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "regular",
  },
  card: {
    width: 173,
    height: 192,
    backgroundColor: "gray",
    marginRight: 10,
    borderRadius: 12,
  },
  recommendCard: {
    width: 231,
    height: 100,
    backgroundColor: "gray",
    marginRight: 10,
    borderRadius: 12,
  },
});
