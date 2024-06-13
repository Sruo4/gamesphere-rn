import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";

const Typewriter = ({ texts, speed }: {texts: any, speed: any}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const textsRef = useRef(texts);

  useEffect(() => {
    textsRef.current = texts; // 文本更改时更新 textsRef
  }, [texts]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isDeleting) {
        setDisplayText((prevText) => {
          if (prevText.length > 0) {
            return prevText.slice(0, -1);
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textsRef.current.length);
            currentIndexRef.current = 0; // 移动到下一个文本时重置 currentIndexRef
            return prevText;
          }
        });
      } else {
        setDisplayText((prevText) => {
          if (currentIndexRef.current < textsRef.current[currentTextIndex].length) {
            return prevText + textsRef.current[currentTextIndex][currentIndexRef.current++];
          } else {
            setIsDeleting(true);
            return prevText;
          }
        });
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [speed, isDeleting, currentTextIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
};

export function TypeLogo() {
  const textsToType = ["GameSphere", "输入关键词进行搜索"];
  const typingSpeed = 240;

  return (
    <View style={styles.container}>
      <Typewriter texts={textsToType} speed={typingSpeed} />
    </View>
  );
}

// 样式
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "#1F3F60",
    fontWeight: "bold",
  },
});
