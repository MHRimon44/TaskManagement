import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TaskTitleInput from "../../shared/TaskTitleInput";

interface ProfileEditProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  dob: { day: string; month: string; year: string };
  setDob: (dob: any) => void;
  gender: string;
  setGender: (value: string) => void;
  handleSave: () => void;
  isDark: boolean;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  name,
  setName,
  email,
  setEmail,
  dob,
  setDob,
  gender,
  setGender,
  handleSave,
  isDark,
}) => (
  <>
    <TaskTitleInput
      value={name}
      onChangeText={setName}
      placeholder="Full Name"
    />
    <TaskTitleInput
      value={email}
      onChangeText={setEmail}
      placeholder="Email Address"
      keyboardType="email-address"
    />

    <Text
      className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
    >
      Date of Birth
    </Text>
    <View className="flex-row justify-between">
      {["day", "month", "year"].map((field) => (
        <View className="flex-1" key={field}>
          <TaskTitleInput
            value={dob[field as keyof typeof dob]}
            onChangeText={(text) => setDob({ ...dob, [field]: text })}
            placeholder={
              field === "day" ? "DD" : field === "month" ? "MM" : "YYYY"
            }
            keyboardType="numeric"
            style={{
              flex: 1,
              textAlign: "center",
              marginRight: field !== "year" ? 8 : 0,
            }}
          />
        </View>
      ))}
    </View>

    <Text
      className={`text-sm mt-4 mb-2 ${
        isDark ? "text-gray-300" : "text-gray-700"
      }`}
    >
      Gender
    </Text>
    <View className="flex-row justify-between">
      {["Male", "Female", "Prefer not to say"].map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => setGender(option)}
          className={`flex-1 rounded-lg py-2 border ${
            gender === option
              ? "bg-blue-600"
              : isDark
              ? "bg-slate-800"
              : "bg-white"
          } ${isDark ? "border-slate-700" : "border-gray-300"} ${
            option !== "Prefer not to say" ? "mr-2" : ""
          }`}
        >
          <Text
            className={`text-center font-medium ${
              gender === option
                ? "text-white"
                : isDark
                ? "text-gray-300"
                : "text-gray-800"
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <TouchableOpacity
      onPress={handleSave}
      className="bg-green-600 rounded-xl py-3 mt-4 active:bg-green-700"
    >
      <Text className="text-white text-center font-semibold text-base">
        Save Profile
      </Text>
    </TouchableOpacity>
  </>
);

export default ProfileEdit;
