import React, { useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Animated,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import type { CircularButtonProps } from "../constants/types";

const ATouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CircularButton({
  title,
  children,
  onPress,
  style,
  disabled,
  loading,
  width = 300,
  height = 80,
  depth = 6,
  haptics = true,
}: CircularButtonProps) {
  const pressed = useRef(new Animated.Value(0)).current;
  const borderRadius = Math.round(Math.min(width, height) / 2);

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
      accessibilityRole="button"
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => {
        if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        pressTo(1);
      }}
      onPressOut={() => pressTo(0)}
      disabled={disabled || loading}
      style={[
        styles.button,
        { width, height, borderRadius, transform: [{ translateY }] },
        disabled ? { opacity: 0.6 } : null,
        style as StyleProp<ViewStyle>,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : children ? (
        children
      ) : (
        <Text style={[styles.title, { fontSize: height * 0.375 }]}>{title}</Text>
      )}
    </ATouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DB4457",
    borderRadius: 20,
    borderColor: "#ffe11d",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0.1,
  },
  title: {
    color: "#ffe11d",
    fontFamily: "CallDuty",
    fontWeight: "600",
    letterSpacing: 0.25,
  },
});
