import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SplashScreen,
  NewsScreen,
  ProfileScreen,
  NotificationScreen,
  TaskDetailsScreen,
} from "../screens";
import { BottomNavigation } from "./BottomNavigation";
import { useTheme } from "../Context/ThemeContext";
export type RootStackParamList = {
  Task: undefined;
  News: undefined;
  SplashScreen: undefined;
  Profile: undefined;
  "Task Details": { taskId: string };
  Notification: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = ({ setCurrentScreen }: { setCurrentScreen: any }) => {
  const routeNameRef = useRef<string | null>(null);
  const navigationRef = useRef<any>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        setCurrentScreen(routeNameRef.current);
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        setCurrentScreen(currentRouteName);
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f9fafb",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: isDark ? "#0F172A" : "white",
          },
          headerTintColor: isDark ? "white" : "#1A2A45",
        }}
      >
        <Stack.Screen
          name="Task"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="SplashScreen" component={() => <SplashScreen />} />
        <Stack.Screen name="Task Details" component={TaskDetailsScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
