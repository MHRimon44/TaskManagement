import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "../../../types/task";
import { useTheme } from "../../../Context/ThemeContext";

type TaskCardProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

const TaskCard = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const formatTime12Hour = (time24: string) => {
    if (!time24) return "";
    let [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12; // 0 => 12 AM
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
      <View
        className={`mx-4 my-2 p-4 rounded-xl border shadow-md ${
          isDark ? "bg-[#1E293B] border-gray-600" : "bg-white border-gray-300"
        } flex-row justify-between items-center`}
        style={{ elevation: 1 }}
      >
        <View className="flex-1">
          <Text
            className={`font-semibold text-lg ${
              task.completed
                ? "line-through text-gray-400"
                : isDark
                ? "text-white"
                : "text-black"
            }`}
          >
            {task.title}
          </Text>
          {task.description ? (
            <Text
              className={`text-sm mt-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {task.description}
            </Text>
          ) : null}
          {task.date ? (
            <Text
              className={`text-xs mt-1 ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              📅 {task.date} ⏰ {formatTime12Hour(task.time)}
            </Text>
          ) : null}
        </View>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => onEdit(task)}>
            <Ionicons name="create-outline" size={22} color="#FBBF24" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(task.id)}>
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
