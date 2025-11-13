import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Linking,
  TextInput,
} from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import { useGetNewsQuery } from "../../redux/features/news/newsApiSlice";
import { Ionicons } from "@expo/vector-icons";
import NewsCard from "../../components/ui/news/NewsCard";

const NewsScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data, isLoading, isError, refetch } = useGetNewsQuery({});
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    if (!data?.articles) return [];
    return data.articles.filter(
      (item: any) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const openArticle = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-[#0F172A]" : "bg-gray-100"}`}>
      <View
        className={`flex-row items-center mx-4 my-3 px-3 rounded-lg border ${
          isDark ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <Ionicons
          name="search"
          size={20}
          color={isDark ? "#94A3B8" : "#64748B"}
          className="mr-2"
        />
        <TextInput
          placeholder="Search news..."
          placeholderTextColor={isDark ? "#94A3B8" : "#64748B"}
          value={search}
          onChangeText={setSearch}
          className={`flex-1 py-4 ${isDark ? "text-white" : "text-black"}`}
        />
      </View>

      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size="large"
            color={isDark ? "#4FC3F7" : "#1A2A45"}
          />
        </View>
      )}

      {isError && (
        <View className="flex-1 justify-center items-center px-5">
          <Text
            className={`text-lg ${isDark ? "text-red-400" : "text-red-600"}`}
          >
            Failed to load news. Pull to refresh!
          </Text>
        </View>
      )}

      {!isLoading && !isError && (
        <FlatList
          data={filteredNews}
          keyExtractor={(_, i) => i.toString()}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <Text
              className={`text-center mt-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              No news found
            </Text>
          }
          renderItem={({ item }) => (
            <NewsCard item={item} isDark={isDark} onPress={openArticle} />
          )}
        />
      )}
    </View>
  );
};

export default NewsScreen;
