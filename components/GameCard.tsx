import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import { AuthContext } from "../app/context/AuthContext"; // 引入AuthContext

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

export default function GameCard() {
  const [userData, setUserData] = useState<any>({}); // 用于存储用户数据
  const [gameData, setGameData] = useState<any>({}); // 用于存储游戏数据
  const { state } = useContext(AuthContext); // 使用useContext获取上下文状态
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
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${state.key}&steamids=${state.steamid}`
        );
        setUserData(response.data.response.players[0]);
      } catch (error: any) {
        setErrorUser(error);
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
          `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${state.key}&steamid=${state.steamid}&include_appinfo=true`
        );
        setGameData(response.data);
      } catch (error: any) {
        setErrorGame(error);
      } finally {
        setLoadingGame(false);
      }
    };

    fetchGameData();
  }, []);
  // 假设 errorUser 和 errorGame 都具有 message 属性
  const errorMessageUser = errorUser && errorUser.message;
  const errorMessageGame = errorGame && errorGame.message;

  // 合并加载中的状态
  const isLoading = loadingUser || loadingGame;

  // 合并错误信息
  const errorMessages = [errorMessageUser, errorMessageGame].filter(Boolean); // 过滤掉假值（比如 null 或 undefined）

  if (isLoading || errorMessages.length > 0) {
    return (
      <View style={styles.otherContainer}>
        <Text style={styles.text}>
          {isLoading ? "加载中..." : errorMessages.join("\n")}
        </Text>
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
