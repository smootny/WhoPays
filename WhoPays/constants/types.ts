// constants/types.ts
import type { ReactNode } from "react";
import type {
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

export type ButtonContentProps = {
  title?: string;       
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  width?: number;
  height?: number;
  variant?: "primary" | "secondary" | "outline";
};

export type ButtonOnPress = (e: GestureResponderEvent) => void;

export type PressableExtras = {
  depth?: number;
  haptics?: boolean;
};

export type AwesomeVisualExtras = {
  fillColor?: string;
  borderColor?: string;
};

export type ButtonProps = ButtonContentProps & {
  onPress?: ButtonOnPress;
};

export type AwesomeButtonProps = ButtonProps &
  PressableExtras &
  AwesomeVisualExtras &
  Omit<TouchableOpacityProps, "onPress" | "style" | "children">;

export type CircularButtonProps = ButtonProps &
  PressableExtras &
  Omit<TouchableOpacityProps, "onPress" | "style" | "children">;

export type TileProps = {
  theme: { value: string; label: string; image: any };
  onSelect: (value: string) => void;
  depth?: number;
  haptics?: boolean;
};
