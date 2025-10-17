import React, { useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import type { TileProps } from "../constants/types";

const ATouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ThemeTile({ theme, onSelect, depth = 6, haptics = true }: TileProps) {
  const pressed = useRef(new Animated.Value(0)).current;

  const pressTo = (v: 0 | 1) =>
    Animated.spring(pressed, {
      toValue: v,
      useNativeDriver: true,
      friction: 7,
      tension: 200,
    }).start();

  const translateY = pressed.interpolate({ inputRange: [0, 1], outputRange: [0, depth] });

  return (
    <ATouchable
      activeOpacity={0.9}
      onPress={() => onSelect(theme.value)}
      onPressIn={() => {
        if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        pressTo(1);
      }}
      onPressOut={() => pressTo(0)}
      style={[styles.container, { transform: [{ translateY }] }]}
    >
      <ImageBackground
        source={theme.image}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{theme.label}</Text>
        </View>
      </ImageBackground>
    </ATouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 18,
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "CallDuty",
    textAlign: "center",
  },
});
