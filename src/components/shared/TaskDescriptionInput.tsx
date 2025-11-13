import React from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { useTheme } from "../../Context/ThemeContext";

type TaskDescriptionInputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

const TaskDescriptionInput = ({
  value,
  onChangeText,
  placeholder = "Description",
  ...rest
}: TaskDescriptionInputProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View className="mb-4">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#94A3B8" : "#64748B"}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        className={`px-3 py-3 rounded-md border text-base min-h-[100px] ${
          isDark
            ? "bg-[#1E293B] text-white border-gray-600"
            : "bg-gray-100 text-black border border-gray-300 shadow-sm"
        }`}
        {...rest}
      />
    </View>
  );
};

export default TaskDescriptionInput;
