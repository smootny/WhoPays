import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import SplashScreenAnimation from "@/components/SplashScreenAnimation";
import Animated, { FadeIn } from "react-native-reanimated";
import { Image } from "react-native";

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    CallDuty: require("@/assets/fonts/CallDuty.ttf"),
  });

  // Check if the image is loaded
  useEffect(() => {
    const imageUri = Image.resolveAssetSource(require("@/assets/images/login-image.png")).uri;
    Image.prefetch(imageUri)
      .then(() => setImageLoaded(true))
      .catch(() => setImageError(true));
  }, []);

  // Mark app as ready when both fonts and image are loaded
  useEffect(() => {
    if ((fontsLoaded || fontError) && imageLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded, fontError, imageLoaded]);

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
            headerTitleStyle: {
              color: "transparent",
            },
          }}
        />
      </Stack>
    </Animated.View>
  );
}
