import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import SplashScreenAnimation from "@/components/SplashScreenAnimation";
import Animated, { FadeIn } from "react-native-reanimated";

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    CallDuty: require("@/assets/fonts/CallDuty.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  if (!isAppReady || !splashAnimationFinished) {
    return (
      <SplashScreenAnimation
        onAnimationFinish={() => setSplashAnimationFinished(true)}
      />
    );
  }

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
    <Stack.Screen name="index" options={{ title: 'back', headerShown: false, headerTransparent: true}}
            />
            <Stack.Screen
                name="gameScreen"
                options={{
                    title: "Game",
                    headerShown: true,
                    headerTransparent: true,
                    headerTitleStyle: {
                        color: 'transparent'
                    },
                }}
            />
      </Stack>
    </Animated.View>
  );
}
