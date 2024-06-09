import { StyleSheet } from "react-native";
import "@tamagui/core/reset.css";
import { Button, YStack, Text } from "tamagui";

import { TamaguiProvider } from "tamagui";
import config from "../../tamagui.config";

export default function HomeScreen() {
  return (
    <TamaguiProvider config={config}>
      <YStack style={styles.container}>
        <YStack padding="$3">
          <Text theme="blue">Hello, Tamagui!</Text>
          <Button theme="blue">Click me!</Button>
        </YStack>
      </YStack>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
