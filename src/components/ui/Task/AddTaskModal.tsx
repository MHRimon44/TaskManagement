import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "../../../types/task";
import { useTheme } from "../../../Context/ThemeContext";
import TaskTitleInput from "../../shared/TaskTitleInput";
import TaskDescriptionInput from "../../shared/TaskDescriptionInput";
import DateTimeSelector from "../../shared/DateTimeSelector";
import { scheduleTaskNotification } from "../../../utils/notifications";

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
};

const AddTaskModal = ({ visible, onClose, onAdd }: AddTaskModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAdd = () => {
    if (!taskTitle.trim()) {
      Alert.alert("Validation Error", "Task title cannot be empty");
      return;
    }

    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
    const formattedTime = selectedDate
      ? selectedDate.toTimeString().split(" ")[0].slice(0, 5)
      : "";

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      date: formattedDate,
      time: formattedTime,
      completed: false,
    };

    onAdd(newTask);

    if (formattedDate && formattedTime) {
      scheduleTaskNotification(
        newTask.id,
        newTask.title,
        newTask.description,
        formattedDate,
        formattedTime
      );
    }

    setTaskTitle("");
    setTaskDescription("");
    setSelectedDate(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center bg-black/50 px-4">
          <View
            className={`rounded-xl overflow-hidden border ${
              isDark
                ? "bg-[#0F172A] border-gray-600"
                : "bg-white border-gray-300"
            }`}
          >
            <TouchableOpacity
              onPress={() => {
                setTaskTitle("");
                setTaskDescription("");
                setSelectedDate(null);
                onClose();
              }}
              className="absolute top-3 right-3 p-1 z-10"
            >
              <Ionicons
                name="close-circle"
                size={28}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>

            <Text
              className={`text-lg font-semibold pt-4 px-4 pb-2 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              New Task
            </Text>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingHorizontal: 16, marginTop: 16 }}
            >
              <DateTimeSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />

              <TaskTitleInput value={taskTitle} onChangeText={setTaskTitle} />
              <TaskDescriptionInput
                value={taskDescription}
                onChangeText={setTaskDescription}
              />
            </ScrollView>

            {/* Add Button */}
            <View className="px-4 pb-4 bg-transparent ml-auto">
              <TouchableOpacity
                onPress={handleAdd}
                className={`${
                  isDark
                    ? "bg-[#1E293B] border border-gray-600"
                    : "bg-[#1A2A45]"
                } px-4 py-3 rounded-md`}
              >
                <Text className="text-white font-medium text-center">
                  Add Task
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddTaskModal;
