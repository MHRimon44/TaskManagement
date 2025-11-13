import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../Context/ThemeContext";
import { useNotification } from "../../Context/NotificationContext";

const NotificationScreen = () => {
  const { notifications, markAsRead, deleteNotification } = useNotification();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const renderItem = ({ item }: any) => {
    const isRead = item.read;

    return (
      <View
        className={`px-4 py-2 rounded-lg mb-3 shadow flex-row justify-between items-start border`}
        style={{
          backgroundColor: isRead
            ? isDark
              ? "#1E293B" // dull dark
              : "#E5E7EB" // dull light
            : isDark
            ? "#1F2937"
            : "#FFFFFF",
          borderColor: isRead
            ? isDark
              ? "#374151"
              : "#D1D5DB"
            : isDark
            ? "#4B5563"
            : "#D1D5DB",
        }}
      >
        <View className="flex-1 pr-2">
          <Text
            style={{
              color: isRead
                ? isDark
                  ? "#9CA3AF"
                  : "#6B7280"
                : isDark
                ? "#FFFFFF"
                : "#000000",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: isRead
                ? isDark
                  ? "#9CA3AF"
                  : "#6B7280"
                : isDark
                ? "#D1D5DB"
                : "#4B5563",
              marginTop: 4,
            }}
          >
            {item.body}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          {!isRead && (
            <TouchableOpacity onPress={() => markAsRead(item.id)}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#10B981"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => deleteNotification(item.id)}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={isDark ? "#FFFFFF" : "red"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: isDark ? "#111827" : "#F3F4F6",
      }}
    >
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: isDark ? "#9CA3AF" : "#6B7280",
            }}
          >
            No notifications yet
          </Text>
        }
      />
    </View>
  );
};

export default NotificationScreen;
