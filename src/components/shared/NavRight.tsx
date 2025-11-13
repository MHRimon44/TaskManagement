import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../Context/ThemeContext";
import { useNotification } from "../../Context/NotificationContext";

const NavRight = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { notifications } = useNotification();

  // Count of unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationPress = () => {
    (navigation as any).navigate("Notification");
  };

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}
    >
      <TouchableOpacity
        onPress={handleNotificationPress}
        style={{ position: "relative" }}
      >
        <Ionicons
          name="notifications"
          size={24}
          color={isDark ? "white" : "#1A2A45"}
        />

        {unreadCount > 0 && (
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              backgroundColor: "red",
              borderRadius: 8,
              width: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NavRight;
