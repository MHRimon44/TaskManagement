import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  read?: boolean;
};

type NotificationContextType = {
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  addNotification: (notif: NotificationItem) => void;
};

const STORAGE_KEY = "@notifications";

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const loadNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setNotifications(JSON.parse(stored));
    } catch (err) {
      console.log("Error loading notifications:", err);
    }
  };

  const saveNotifications = async (items: NotificationItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.log("Error saving notifications:", err);
    }
  };

  const addNotification = (notif: NotificationItem) => {
    setNotifications((prev) => {
      const updated = [notif, ...prev];
      saveNotifications(updated);
      return updated;
    });
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    saveNotifications(updated);
  };

  useEffect(() => {
    loadNotifications();

    const setupNotifications = async () => {
      if (!Device.isDevice) return;

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Notification permission not granted");
        return;
      }

      const notificationListener =
        Notifications.addNotificationReceivedListener((notification) => {
          const { title, body } = notification.request.content;
          addNotification({
            id: Date.now().toString(),
            title,
            body,
            read: false,
          });
        });

      const responseListener =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("Notification response:", response);
        });

      return () => {
        notificationListener.remove();
        responseListener.remove();
      };
    };

    setupNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, deleteNotification, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
