import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import { Task } from "../../types/task";
import { saveTasks, loadTasks } from "../../utils/storage";
import { Ionicons } from "@expo/vector-icons";
import TopSection from "../../components/ui/Task/TopSection";
import { useNavigation } from "@react-navigation/native";
import AddTaskModal from "../../components/ui/Task/AddTaskModal";
import TaskCard from "../../components/ui/Task/TaskCard";

const TaskScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const openAddModal = () => {
    setTaskTitle("");
    setTaskDescription("");
    setSelectedDate(null);
    setModalVisible(true);
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setTasks((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-[#0F172A]" : "bg-gray-100"}`}>
      <TopSection />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
        ListEmptyComponent={
          <Text
            className={`text-center mt-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No tasks added yet
          </Text>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onEdit={(task) =>
              navigation.navigate("Task Details", {
                task,
                tasks,
                setTasks,
              })
            }
          />
        )}
      />

      {/* FLOATING ADD BUTTON */}
      <TouchableOpacity
        onPress={openAddModal}
        className={`absolute bottom-5 right-6 w-16 h-16 rounded-full justify-center items-center shadow-lg border ${
          isDark
            ? "bg-[#1E293B] border-gray-600"
            : "bg-[#1A2A45] border-gray-300"
        }`}
        style={{ elevation: 5 }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={(task) => setTasks((prev) => [...prev, task])}
      />
    </View>
  );
};

export default TaskScreen;
