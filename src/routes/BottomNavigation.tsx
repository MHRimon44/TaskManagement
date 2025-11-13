import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../Context/ThemeContext";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { StatusBar } from "expo-status-bar";
import { NewsScreen, TaskScreen, ProfileScreen } from "../screens";
import NavRight from "../components/shared/NavRight";

const BottomTabs = createBottomTabNavigator();

export const BottomNavigation = () => {
  const { theme } = useTheme();

  const colors = {
    background: theme === "dark" ? "#0F172A" : "#F9FAFB",
    header: theme === "dark" ? "#0F172A" : "white",
    tabBar: theme === "dark" ? "#1A2A45" : "#1A2A45",
    active: theme === "dark" ? "#64FFDA" : "#4FC3F7",
    inactive: "#94A3B8",
    text: theme === "dark" ? "#F8FAFC" : "#1E293B",
  };
  const isDark = theme === "dark";

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <BottomTabs.Navigator
        screenOptions={{
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: colors.tabBar,
              marginHorizontal: 10,
              borderRadius: 14,
              marginBottom: 12,
            },
          ],
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: colors.active,
          tabBarInactiveTintColor: colors.inactive,
          headerStyle: [
            styles.header,
            { backgroundColor: colors.header, elevation: 1 },
          ],
          headerTintColor: colors.text,
          headerRight: () => <NavRight />,
        }}
      >
        {/* TASK TAB */}
        <BottomTabs.Screen
          name="Task"
          component={TaskScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? colors.active : colors.inactive },
                ]}
              >
                Task
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
                size={responsiveFontSize(2.4)}
                color={focused ? colors.active : colors.inactive}
              />
            ),
          }}
        />

        {/* NEWS TAB */}
        <BottomTabs.Screen
          name="News Feed"
          component={NewsScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? colors.active : colors.inactive },
                ]}
              >
                News
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "newspaper" : "newspaper-outline"}
                size={responsiveFontSize(2.4)}
                color={focused ? colors.active : colors.inactive}
              />
            ),
          }}
        />

        {/* PROFILE TAB */}
        <BottomTabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? colors.active : colors.inactive },
                ]}
              >
                Profile
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name={focused ? "user-alt" : "user"}
                size={responsiveFontSize(2.2)}
                color={focused ? colors.active : colors.inactive}
              />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: responsiveHeight(8),
    paddingBottom: responsiveHeight(0.8),
    borderTopWidth: 0,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: "500",
  },
  header: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  tabLabel: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: "500",
    textAlign: "center",
  },
});
