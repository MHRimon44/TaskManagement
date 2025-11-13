import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../Context/ThemeContext";

interface DateSelectorProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showPicker, setShowPicker] = useState(false);

  const openPicker = () => setShowPicker(true);

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={openPicker}
        className={`px-3 py-3 rounded-md border ${
          isDark
            ? "bg-[#1E293B] border-gray-600"
            : "bg-gray-100 border-gray-300 shadow-sm"
        }`}
      >
        <Text className={isDark ? "text-white" : "text-black"}>
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : "Select Date of Birth"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
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

export default DateSelector;
