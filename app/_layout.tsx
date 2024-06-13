import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, AuthContext } from './context/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

function RootLayoutComponent() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // 确保字体加载完成后，再检查登录状态和执行导航
      if (authContext && !authContext.state.isLoggedIn) {
        router.replace('pages/loginpage');  // 跳转到登录页
      }
    }
  }, [loaded, authContext, router]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="pages/loginpage" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pages/searchpage" options={{ headerShown: false}}/>
        <Stack.Screen name="pages/gamedetail" options={{ headerShown: false}}/>
        <Stack.Screen name="pages/bindsteam" options={{ headerShown: false}}/>
        <Stack.Screen name="pages/modifyprofile" options={{ headerShown: false}}/>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutComponent />
    </AuthProvider>
  );
}
