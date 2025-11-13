import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../Context/ThemeContext";
import NavRight from "../../shared/NavRight";

const TopSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <View
      className={`py-3 ${isDark ? "bg-[#0F172A]" : "bg-white"}`}
      style={{ elevation: 1 }}
    >
      <View className="overflow-hidden rounded-br-[30px] rounded-bl-[30px] relative gap-5">
        <SafeAreaView>
          <View className="pl-5 flex-row items-center mt-4 justify-between">
            <View className="flex-row items-center gap-2">
              <Text
                className={`text-2xl font-semibold ${
                  isDark ? "text-white" : "text-[#1A2A45]"
                }`}
              >
                Task Management
              </Text>
            </View>
            <NavRight />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default TopSection;
