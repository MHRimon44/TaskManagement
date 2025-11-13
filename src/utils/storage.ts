import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const TASK_KEY = "TASKS";

export const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};

export const loadTasks = async (): Promise<Task[]> => {
  const res = await AsyncStorage.getItem(TASK_KEY);
  return res ? JSON.parse(res) : [];
};
