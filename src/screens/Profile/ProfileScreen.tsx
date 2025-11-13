import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Switch,
  Alert,
  Text,
} from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import ProfileImage from "../../components/ui/profile/ProfileImage";
import ProfileEdit from "../../components/ui/profile/ProfileEdit";
import ProfileView from "../../components/ui/profile/ProfileView";

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [gender, setGender] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need access to your photos to upload a profile picture."
        );
      }
    })();
  }, []);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }
    Alert.alert("Profile Saved", "Your profile has been updated successfully!");
    setIsEditing(false);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-slate-900" : "bg-gray-100"}`}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        className="px-5"
      >
        <ProfileImage
          imageUri={imageUri}
          setImageUri={setImageUri}
          isEditing={isEditing}
          isDark={isDark}
        />

        {isEditing ? (
          <ProfileEdit
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            dob={dob}
            setDob={setDob}
            gender={gender}
            setGender={setGender}
            handleSave={handleSave}
            isDark={isDark}
          />
        ) : (
          <ProfileView
            name={name}
            email={email}
            dob={dob}
            gender={gender}
            setIsEditing={setIsEditing}
            isDark={isDark}
          />
        )}

        <View
          className={`mt-4 rounded-xl px-5 py-4 border ${
            isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-300"
          }`}
        >
          <View className="flex-row justify-between items-center">
            <Text
              className={`text-base font-semibold ${
                isDark ? "text-white" : "text-gray-600"
              }`}
            >
              Dark Mode
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#ccc", true: "#4B5563" }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
