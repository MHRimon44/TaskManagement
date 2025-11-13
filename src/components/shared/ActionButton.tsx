import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../../Context/ThemeContext";

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger";
};

const ActionButton = ({
  title,
  onPress,
  variant = "primary",
}: ActionButtonProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor =
    variant === "danger"
      ? isDark
        ? "bg-red-600 border-red-200"
        : "bg-red-200 border-red-600"
      : isDark
      ? "bg-blue-600 border-blue-200"
      : "bg-blue-200 border-blue-600";

  const textColor =
    variant === "danger"
      ? isDark
        ? "text-red-200"
        : "text-red-600"
      : isDark
      ? "text-blue-200"
      : "text-blue-600";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`border ${bgColor} p-3 rounded-md shadow w-[49%]`}
    >
      <Text className={`${textColor} text-center font-medium`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
