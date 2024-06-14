import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchedGames, setSearchedGames] = useState([]); // 新增的保存搜索结果的状态
  const navigation = useNavigation();
  const route = useRoute();
  const initialSearchTerm = route.params?.searchTerm || "";
  const [selectedButton, setSelectedButton] = useState(null);
  const router = useRouter();
  const [results, setResults] = useState([]);
  const host = "http://172.20.10.2:3000";

  const handleSearch = (value: React.SetStateAction<string>) => {
    setSearchTerm(value);

    setSearchedGames(
      results.filter((game) => {
        return game.name.includes(value);
      })
    ); // 将搜索结果保存到状态中

    setSearchResults(results.filter((game) => game.name.includes(value)));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/data/all`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (results) {
      handleSearch(initialSearchTerm);
    }
  }, [results]); // 依赖数组中加入results，当results变化时会重新执行这个effect

  const handleFilterButtonClick = (buttonName) => {
    if (selectedButton === buttonName) {
      setSelectedButton(null);
      setSearchResults(searchedGames); // 重置筛选结果为所有结果
      return;
    }

    setSelectedButton(buttonName);
    let filteredResults = [];
    if (buttonName === "免费") {
      filteredResults = searchedGames.filter((game) => game.price == 0);
    } else if (buttonName === "￥0-50") {
      filteredResults = searchedGames.filter(
        (game) => game.price > 0 && game.price <= 50
      );
    } else if (buttonName === "￥50-100") {
      filteredResults = searchedGames.filter(
        (game) => game.price > 50 && game.price <= 100
      );
    } else if (buttonName === "￥100-200") {
      filteredResults = searchedGames.filter(
        (game) => game.price > 100 && game.price <= 200
      );
    } else if (buttonName === "￥200以上") {
      filteredResults = searchedGames.filter((game) => game.price > 200);
    } else {
      filteredResults = searchedGames;
    }

    setSearchResults(filteredResults);
  };

  const handleSearchButtonPress = () => {
    handleSearch(searchTerm);
  };

  const handleGamePress = (result) => {
    router.push({
      pathname: `/pages/gamedetail`,
      params: { result: JSON.stringify(result) },
    });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          marginTop: 22,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            style={{ flex: 1, marginLeft: 10 }}
            placeholder="搜索游戏"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearchButtonPress}
        >
          <Text style={styles.buttonText}>搜索</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView horizontal={true} style={{ marginBottom: 20, height: 30 }}>
          <View style={{ flexDirection: "row", height: 10 }}>
            <TouchableOpacity
              style={[
                styles.smallButton,
                selectedButton === "免费" && styles.selectedButton,
              ]}
              onPress={() => handleFilterButtonClick("免费")}
            >
              <Text>免费</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallButton,
                selectedButton === "￥0-50" && styles.selectedButton,
              ]}
              onPress={() => handleFilterButtonClick("￥0-50")}
            >
              <Text>￥0-50</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallButton,
                selectedButton === "￥50-100" && styles.selectedButton,
              ]}
              onPress={() => handleFilterButtonClick("￥50-100")}
            >
              <Text>￥50-100</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallButton,
                selectedButton === "￥100-200" && styles.selectedButton,
              ]}
              onPress={() => handleFilterButtonClick("￥100-200")}
            >
              <Text>￥100-200</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallButton,
                selectedButton === "￥200以上" && styles.selectedButton,
              ]}
              onPress={() => handleFilterButtonClick("￥200以上")}
            >
              <Text>￥200以上</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <TouchableOpacity
              key={result.id}
              onPress={() => handleGamePress(result)}
            >
              <View
                key={result.id}
                style={{
                  flexDirection: "row",
                  padding: 6,
                  backgroundColor: "#fff",
                  marginBottom: 0,
                }}
              >
                <Image
                  source={{ uri: result.image_link }}
                  style={{
                    width: 120,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 8,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {result.name}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                      <View
                        style={{
                          backgroundColor: "#DDDDDD",
                          paddingHorizontal: 3,
                          borderRadius: 3,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {result.price == 0
                            ? "免费"
                            : result.price === null
                            ? "暂无"
                            : `￥${result.price}`
                            }
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        marginRight: 5,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#FF9933",
                          borderRadius: 3,
                          width: 38,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {result.score === null ? "暂无" : result.score}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            没有找到相关游戏
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 45,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    height: 30,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#007AFF", // 设置选中时的背景色为蓝色
  },
});
