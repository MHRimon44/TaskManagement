import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface ProfileImageProps {
  imageUri: string | null;
  setImageUri: (uri: string) => void;
  isEditing: boolean;
  isDark: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageUri,
  setImageUri,
  isEditing,
  isDark,
}) => {
  const pickImage = async () => {
    if (!isEditing) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Image Picker Error:", err);
    }
  };

  return (
    <View className="items-center mt-6 mb-6">
      <TouchableOpacity onPress={pickImage} disabled={!isEditing}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className={`w-[120px] h-[120px] rounded-full border-2 ${
              isDark ? "border-gray-600" : "border-gray-300"
            }`}
          />
        ) : (
          <View
            className={`w-[120px] h-[120px] rounded-full justify-center items-center ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <Ionicons
              name="person-circle-outline"
              size={90}
              color={isDark ? "#9CA3AF" : "#6B7280"}
            />
          </View>
        )}
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity onPress={pickImage}>
          <Text className="text-blue-600 text-base mt-3 font-medium">
            Change Photo
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileImage;
