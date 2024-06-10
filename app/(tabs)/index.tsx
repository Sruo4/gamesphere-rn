import { StyleSheet, TextInput } from "react-native";
import "@tamagui/core/reset.css";
import { Button, YStack, Text, XStack } from "tamagui";
import { Avatar } from "tamagui";

import { TamaguiProvider } from "tamagui";
import config from "../../tamagui.config";

export default function HomeScreen() {
  return (
    <TamaguiProvider config={config}>
      <YStack style={styles.container}>
      <XStack alignItems="center" justifyContent="space-between" space={10}>
          <Avatar circular size="$4">
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
            />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
          <TextInput
            style={styles.input}
            placeholder="请输入内容"
            // 您可以添加更多的属性，如 onChangeText, value 等
          />
          <Button size="$4">Go</Button>
        </XStack>

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
    padding: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

  },
  input: {
    width: 200,
    height: 42,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
});
