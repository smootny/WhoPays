import React from "react";
import IconCircleButton from "./IconCircleButton";

export default function RefreshButton({ onRefresh }) {
  return <IconCircleButton iconName="refresh" onPress={onRefresh} size={36} />;
}
