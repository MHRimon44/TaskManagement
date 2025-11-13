import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

type NewsCardProps = {
  item: any;
  isDark: boolean;
  onPress: (url: string) => void;
};

const NewsCard = ({ item, isDark, onPress }: NewsCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.url)}
      className={`mx-4 my-2 rounded-xl overflow-hidden shadow-md border ${
        isDark ? "bg-[#1E293B] border-gray-600" : "bg-white border-gray-300"
      }`}
      activeOpacity={0.8}
    >
      {item.urlToImage && (
        <Image
          source={{ uri: item.urlToImage }}
          className="w-full h-44"
          resizeMode="cover"
        />
      )}

      <View className="p-3">
        <Text
          numberOfLines={2}
          className={`text-base font-semibold ${
            isDark ? "text-white" : "text-[#1A2A45]"
          }`}
        >
          {item.title}
        </Text>

        {item.description ? (
          <Text
            numberOfLines={3}
            className={`text-sm mt-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {item.description}
          </Text>
        ) : null}

        <Text className="text-xs text-blue-400 mt-2">Read more →</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
