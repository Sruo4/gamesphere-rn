import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error("LoginScreen must be used within an AuthProvider");
  }

  const handleLogin = () => {
    // 处理登录逻辑，点击登录时才将本地状态更新到 context
    console.log("Logging in with", localUsername, localPassword);

    fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localUsername,
        password: localPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.success) {
          authContext.dispatch({
            type: "SET_USERNAME",
            payload: localUsername,
          });
          authContext.dispatch({
            type: "SET_PASSWORD",
            payload: localPassword,
          });
          authContext.dispatch({ type: "LOGIN" });
          // 跳转到首页
          console.log("Login success");
          router.replace('/');
        } else {
          alert("登录失败");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const handleRegister = () => {
    // 处理注册逻辑
    console.log("Registering with", localUsername, localPassword);

    fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localUsername,
        password: localPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Register response:", data);
        if (data.success) {
          alert("注册成功");
          // 注册成功后切换回登录表单
          setIsLogin(true);
        } else {
          alert("Register failed");
        }
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  return (
        <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? '登录' : '注册'}</Text>

      <TextInput
        style={styles.input}
        placeholder="用户名 或 邮箱"
        value={localUsername}
        onChangeText={setLocalUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="密码"
        value={localPassword}
        onChangeText={setLocalPassword}
        secureTextEntry={!authContext.state.showPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={isLogin ? handleLogin : handleRegister}>
        <Text style={styles.loginText}>{isLogin ? '登录' : '注册'}</Text>
      </TouchableOpacity>

      {/* 切换到注册表单的按钮 */}
      <TouchableOpacity style={styles.registerButton} onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.registerText}>{isLogin ? '去注册' : '返回登录'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4A44F2",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  toggle: {
    padding: 10,
    color: "#4A44F2",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#4A44F2",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
    registerButton: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    registerText: {
        color: "#4A44F2",
        fontSize: 16,
        fontWeight: "bold",
    },
});
