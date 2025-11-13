import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ProfileViewProps {
  name: string;
  email: string;
  dob: { day: string; month: string; year: string };
  gender: string;
  setIsEditing: (value: boolean) => void;
  isDark: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  name,
  email,
  dob,
  gender,
  setIsEditing,
  isDark,
}) => (
  <>
    <View
      className={`rounded-xl p-4 border mt-2 ${
        isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300"
      }`}
    >
      <Text
        className={`text-base mb-2 ${
          isDark ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <Text className="font-semibold">Name: </Text>
        {name || "—"}
      </Text>
      <Text
        className={`text-base mb-2 ${
          isDark ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <Text className="font-semibold">Email: </Text>
        {email || "—"}
      </Text>
      <Text
        className={`text-base mb-2 ${
          isDark ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <Text className="font-semibold">Date of Birth: </Text>
        {dob.day || dob.month || dob.year
          ? `${dob.day}/${dob.month}/${dob.year}`
          : "—"}
      </Text>
      <Text
        className={`text-base ${isDark ? "text-gray-300" : "text-gray-800"}`}
      >
        <Text className="font-semibold">Gender: </Text>
        {gender || "—"}
      </Text>
    </View>

    <TouchableOpacity
      onPress={() => setIsEditing(true)}
      className="bg-blue-600 rounded-xl py-3 mt-4"
    >
      <Text className="text-white text-center font-semibold text-base">
        Edit Profile
      </Text>
    </TouchableOpacity>
  </>
);

export default ProfileView;
