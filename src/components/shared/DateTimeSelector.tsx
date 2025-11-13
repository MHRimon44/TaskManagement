import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../Context/ThemeContext";

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const openPicker = (mode: "date" | "time") => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  return (
    <View className="flex-row gap-3 mb-4">
      <TouchableOpacity
        onPress={() => openPicker("date")}
        className={`flex-1 px-3 py-3 rounded-md border ${
          isDark
            ? "bg-[#1E293B] border-gray-600"
            : "bg-gray-100 border-gray-300 shadow-sm"
        }`}
      >
        <Text className={isDark ? "text-white" : "text-black"}>
          {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openPicker("time")}
        className={`flex-1 px-3 py-3 rounded-md border ${
          isDark
            ? "bg-[#1E293B] border-gray-600"
            : "bg-gray-100 border-gray-300 shadow-sm"
        }`}
      >
        <Text className={isDark ? "text-white" : "text-black"}>
          {selectedDate
            ? selectedDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Select Time"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode={pickerMode}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, date) => {
            setShowPicker(false);
            if (event.type === "dismissed") return;
            if (date) setSelectedDate(date);
          }}
        />
      )}
    </View>
  );
};

export default DateTimeSelector;
