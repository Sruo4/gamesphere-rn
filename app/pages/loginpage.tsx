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
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={localUsername}
        onChangeText={setLocalUsername}
      />

      {/* <View style={styles.passwordContainer}> */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={localPassword}
        onChangeText={setLocalPassword}
        secureTextEntry={!authContext.state.showPassword}
      />
      {/* <TouchableOpacity onPress={() => authContext.dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}>
          <Text style={styles.toggle}>{authContext.state.showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity> */}
      {/* </View> */}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
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
});
