import { useNavigation } from "@react-navigation/native";
import IconCircleButton from "./IconCircleButton";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <IconCircleButton iconName="arrow-back" onPress={() => navigation.goBack()} size={36} />
  );
}
