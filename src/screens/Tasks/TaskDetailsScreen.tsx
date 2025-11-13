import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../Context/ThemeContext";
import ActionButton from "../../components/shared/ActionButton";
import TaskTitleInput from "../../components/shared/TaskTitleInput";
import TaskDescriptionInput from "../../components/shared/TaskDescriptionInput";
import DateTimeSelector from "../../components/shared/DateTimeSelector";
import { scheduleTaskNotification } from "../../utils/notifications";

const TaskDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { task, tasks, setTasks } = route.params;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    task.date ? new Date(task.date + " " + (task.time || "00:00")) : null
  );

  const updateTask = () => {
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
    const formattedTime = selectedDate
      ? selectedDate.toTimeString().split(" ")[0].slice(0, 5)
      : "";

    const updatedTasks = tasks.map((t: any) =>
      t.id === task.id
        ? {
            ...t,
            title,
            description,
            completed,
            date: formattedDate,
            time: formattedTime,
          }
        : t
    );

    setTasks(updatedTasks);

    if (formattedDate && formattedTime) {
      scheduleTaskNotification(
        task.id,
        title,
        description,
        formattedDate,
        formattedTime
      );
    }

    navigation.goBack();
  };

  const deleteTask = () => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          setTasks(tasks.filter((t: any) => t.id !== task.id));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-[#0F172A]" : "bg-white"}`}>
      <ScrollView
        className="px-4 py-4"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <TaskTitleInput value={title} onChangeText={setTitle} />
        <TaskDescriptionInput
          value={description}
          onChangeText={setDescription}
        />

        <DateTimeSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <TouchableOpacity
          onPress={() => setCompleted(!completed)}
          className={`flex-row items-center px-3 py-3 rounded-md mb-4 border ${
            isDark
              ? "bg-[#1E293B] border-gray-600"
              : "bg-gray-100 border-gray-300 shadow-sm"
          }`}
        >
          <Ionicons
            name={completed ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={completed ? "#10B981" : isDark ? "#94A3B8" : "#64748B"}
          />
          <Text
            className={`ml-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}
          >
            {completed ? "Task Completed" : "Mark as Complete"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-between gap-2 items-center">
          <ActionButton
            title="Delete Task"
            onPress={deleteTask}
            variant="danger"
          />
          <ActionButton
            title="Update Task"
            onPress={updateTask}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskDetailsScreen;
