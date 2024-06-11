import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

export default function GameCard() {
  const [userData, setUserData] = useState<any>({}); // 用于存储用户数据
  const [gameData, setGameData] = useState<any>({}); // 用于存储游戏数据
  // 分别存储两组数据的加载状态和错误状态
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingGame, setLoadingGame] = useState(true);
  const [errorUser, setErrorUser] = useState<Error | null>(null);
  const [errorGame, setErrorGame] = useState<Error | null>(null);

  // 使用useEffect钩子获取用户数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUser(true);
        const response = await axios.get(
          "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=B75735CD1D7ACA56D22DE86355FCD9AE&steamids=%7B76561199178368968%7D"
        );
        setUserData(response.data.response.players[0]);
      } catch (error: any) {
        setLoadingUser(error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchData();
  }, []);

  // 使用useEffect钩子获取游戏数据
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoadingGame(true);
        // 替换下面的URL为您的游戏数据API
        const response = await axios.get(
          "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?access_token=eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEVFMF8yNDg5MzZFRl9GMDc3MyIsICJzdWIiOiAiNzY1NjExOTkxNzgzNjg5NjgiLCAiYXVkIjogWyAid2ViOnN0b3JlIiBdLCAiZXhwIjogMTcxODE3NDc3OCwgIm5iZiI6IDE3MDk0NDczOTcsICJpYXQiOiAxNzE4MDg3Mzk3LCAianRpIjogIjBFRjFfMjQ4OTM2RjNfRDFGOUQiLCAib2F0IjogMTcxODA4NzM5NywgInJ0X2V4cCI6IDE3MzYyMzIwMjcsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICIxMTguMTcwLjkyLjIzNyIsICJpcF9jb25maXJtZXIiOiAiMTE4LjE3MC45Mi4yMzciIH0.Eu_7FCT3ISoRAYtGIBHpWjZhoOb90IqboXosawfzDuzSZVkKg8FeoJipoxSQUUSR3Kl-xi-RemHA5tR7JyQ0CA&steamid=76561199178368968&include_appinfo=true"
        );
        setGameData(response.data);
        console.log(response.data.response.games);
      } catch (error: any) {
        setErrorGame(error);
      } finally {
        setLoadingGame(false);
      }
    };

    fetchGameData();
  }, []);

  if (loadingUser) {
    return (
      <View style={styles.otherContainer}>
        <Text style={styles.text}>加载中...</Text>
      </View>
    );
  }

  if (errorUser) {
    return (
      <View style={styles.otherContainer}>
        <Text style={styles.text}>{errorUser.message}</Text>
      </View>
    );
  }

  let personStateText = "";
  switch (userData.personastate) {
    case 1:
      personStateText = "在线";
      break;
    case 3:
      personStateText = "离开";
      break;
    default:
      personStateText = "离线";
  }

  //游戏时长计算器
  let gameTotalTime = 0;
  gameData.response.games.forEach((game: any) => {
    gameTotalTime += game.playtime_forever / 60;
    // 保留一位小数
    gameTotalTime = Math.round(gameTotalTime * 10) / 10;
  });

  // 卡片展示内容
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: userData.avatarfull }} />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginStart: 10,
          }}
        >
          <Text style={styles.text}>
            {userData.personaname}
            <Text style={{ fontSize: 14, fontWeight: "light", color: "gray" }}>
              {personStateText}
            </Text>
          </Text>
          <Text style={styles.lastLoginTime}>
            上次登录：{formatTimestamp(userData.lastlogoff)}
          </Text>
        </View>
      </View>

      <View style={styles.game}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 18 }}>
            {gameData.response.game_count}
          </Text>
          <Text style={{ color: "gray", fontSize: 12 }}>游戏数量</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginHorizontal: 5,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 18 }}>
            {gameTotalTime}
          </Text>
          <Text style={{ color: "gray", fontSize: 12 }}>游戏时长 h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otherContainer: {
    height: 144,
    backgroundColor: "#1F3F60",
    borderRadius: 12,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 144,
    backgroundColor: "#1F3F60",
    borderRadius: 12,
    margin: 10,
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  // 用户信息样式
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
  },
  lastLoginTime: {
    color: "#ffffff",
    fontSize: 12,
  },
  // 游戏库信息样式
  game: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ffffff",
    marginTop: 10,
    paddingTop: 10,
  },
});
