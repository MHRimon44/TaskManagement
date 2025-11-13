import React from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { useTheme } from "../../Context/ThemeContext";

type TaskTitleInputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

const TaskTitleInput = ({
  value,
  onChangeText,
  placeholder = "Task Title",
  ...rest
}: TaskTitleInputProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View className="mb-4">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#94A3B8" : "#64748B"}
        className={`px-3 py-3 rounded-md border text-base ${
          isDark
            ? "bg-[#1E293B] text-white border-gray-600"
            : "bg-gray-100 text-black border border-gray-300 shadow-sm"
        }`}
        {...rest}
      />
    </View>
  );
};

export default TaskTitleInput;
