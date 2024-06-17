import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GameCard from "../../components/GameCard";
import { AuthContext } from "../../app/context/AuthContext"; // 引入AuthContext
import { router } from "expo-router";

export default function Profile() {
  const [darkMode, setDarkMode] = React.useState(false);
  const { state, dispatch } = useContext(AuthContext); // 使用useContext获取上下文状态
  const [count, setCount] = useState(0); // 用于强制刷新 GameCard

  useEffect(() => {
    setCount(count => count + 1); // 每次 state 更新时，改变 key 的值
  }, [state.steamid, state.key]);

  const toggleSwitch = () => setDarkMode((previousState) => !previousState);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SET_UUID", payload: "" });
    dispatch({ type: "SET_USERNAME", payload: "" });
    dispatch({ type: "SET_PASSWORD", payload: "" });
    dispatch({ type: "SET_BRIEF", payload: "" });
    dispatch({ type: "SET_STEAMID", payload: "" });
    dispatch({ type: "SET_KEY", payload: "" });
  }

  const ListItem = ({
    icon,
    title,
    hasSwitch,
    onPress,
  }: {
    icon: string;
    title: string;
    hasSwitch?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <Icon name={icon} size={24} style={styles.listIcon} />
      <Text style={styles.listTitle}>{title}</Text>
      {hasSwitch && (
        <Switch
          value={darkMode}
          onValueChange={toggleSwitch}
          style={styles.switch}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>简介</Text>
      </View>
      <View style={styles.profile}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80",
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text style={styles.profileName}>{state.username}</Text>
          <Text style={styles.brief}>{state.brief}</Text>
        </View>
      </View>

      <GameCard key={count} />

      <View style={styles.list}>
        <ListItem icon="globe" title="绑定steam" onPress={() => router.push(`/pages/bindsteam`)} />
        <ListItem icon="edit" title="修改信息" onPress={() => router.push(`/pages/modifyprofile`)} />
        <ListItem icon="cog" title="设置()" />
        <ListItem icon="moon-o" title="退出登录" onPress={() => handleLogout()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 47,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  brief: {
    fontSize: 16,
    color: "#666",
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listIcon: {
    marginRight: 20,
  },
  listTitle: {
    fontSize: 16,
    flex: 1,
  },
  switch: {
    marginRight: 10,
  },
});
