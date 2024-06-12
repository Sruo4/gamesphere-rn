import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "expo-router";

const Host = "http://127.0.0.1:3000";


const GameCard = ({ game, style, router }: { game: any; style: any; router:any }) => {
  const [imageURL, setImageURL] = useState(null);

  const handleGamePress = (result: any) => {
    router.push({
      pathname: `/pages/gamedetail`,
      params: { result: JSON.stringify(result) },
    });
  };

  useEffect(() => {
    fetch(`https://store.steampowered.com/api/appdetails?appids=${game.appid}`)
            .then(response => response.json())
            .then(data => {
                if (data && data[game.appid] && data[game.appid].success) {
                    const headerImage = data[game.appid].data.header_image;
                    setImageURL(headerImage);
                } else {
                    console.error("Failed to fetch data for app ID:", game.appid);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
  }, [game.appid]);

  return (
    <TouchableOpacity style={style} onPress={() => handleGamePress(game)}>
      <Image
        source={{ uri: imageURL || game.image_link }}
        style={{ width: 160, height: 75, borderRadius: 12 }}
      />
      <Text style={styles.gameName}>{game.name}</Text>
      <Text style={styles.gameName}>
        {game.price === 0 ? "免费" : game.price}
        评分：
        {game.score ? game.score : "暂无"}
      </Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [hotList, setHotList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const router = useRouter();

  const handlePress = () => {
    Linking.openURL("https://heishenhua.com/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Host}/data/hot`);
        setHotList(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Host}/data/recommend`);
        setRecommendList(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);



  const renderHotGames = () => {
    // 只显示前5个游戏
    const hotGames = hotList
      .slice(0, 5)
      .map((game, index) => (
        <GameCard key={index} game={game} style={styles.hotCard} router={router} />
      ));

    return (
      <ScrollView horizontal={true} style={styles.hotGamesContainer}>
        {hotGames}
      </ScrollView>
    );
  };

  const renderRecommendGames = () => {
    // 只显示前5个游戏
    const recommendGames = recommendList
      .slice(0, 5)
      .map((game, index) => (
        <GameCard key={index} game={game} style={styles.recommendCard} router={router} />
      ));

    return (
      <ScrollView horizontal={true} style={styles.recommendGamesContainer}>
        {recommendGames}
      </ScrollView>
    );
  };
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
        {renderHotGames()}
      </View>

      {/* Recommend 分栏 */}
      <View style={styles.subfield}>
        <Text style={styles.largeText}>为你推荐</Text>
        <Text style={styles.smallText}>探索你可能喜欢的游戏</Text>
        {renderRecommendGames()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    // padding: 50,
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

  hotGamesContainer: {
    height: 160,
    width: 343,
    marginTop: 10,
  },
  recommendGamesContainer: {
    height: 160,
    width: 343,
    marginTop: 10,
  },
  hotCard: {
    width: 160,
    height: 100,
    marginRight: 10,
    borderRadius: 12,
  },
  recommendCard: {
    width: 160,
    height: 100,
    marginRight: 10,
    borderRadius: 12,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "black",
  },
});
