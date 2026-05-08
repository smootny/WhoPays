import React, { useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { BUTTON_SPRING_CONFIG } from "../constants/animation";

const ATouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function IconCircleButton({
  iconName,
  onPress,
  iconColor = "#ffe11d",
  size = 36,
  depth = 6,
  style,
}) {
  const pressed = useRef(new Animated.Value(0)).current;

  const pressTo = (value) =>
    Animated.spring(pressed, {
      toValue: value,
      ...BUTTON_SPRING_CONFIG,
    }).start();

  const translateY = pressed.interpolate({
    inputRange: [0, 1],
    outputRange: [0, depth],
  });

  return (
    <ATouchable
      accessibilityRole="button"
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        pressTo(1);
      }}
      onPressOut={() => pressTo(0)}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      <Ionicons name={iconName} size={20} color={iconColor} />
    </ATouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DB4457",
    borderColor: "#ffe11d",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0.1,
  },
});
