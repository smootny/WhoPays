import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import SplashScreenAnimation from "@/components/SplashScreenAnimation";
import Animated, { FadeIn } from "react-native-reanimated";
import { Image } from "react-native";
import BackButton from "@/components/BackButton";

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    CallDuty: require("@/assets/fonts/CallDuty.ttf"),
  });

  useEffect(() => {
    const imageUri = Image.resolveAssetSource(require("@/assets/images/login-image.png")).uri;
    Image.prefetch(imageUri)
      .then(() => setImageLoaded(true))
      .catch(() => setImageLoaded(true));
  }, []);

  useEffect(() => {
    if (fontsLoaded && imageLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded, imageLoaded]);

  if (!isAppReady || !splashAnimationFinished) {
    return (
      <SplashScreenAnimation
        onAnimationFinish={() => setSplashAnimationFinished(true)}
      />
    );
  }

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(500)}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "back", headerShown: false, headerTransparent: true }}
        />
       <Stack.Screen
          name="gameScreen"
          options={{
          title: "Game",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: "transparent" },
          headerBackVisible: false,
          headerLeft: () => <BackButton 
       />,
        }}
      />
      </Stack>
    </Animated.View>
  );
}