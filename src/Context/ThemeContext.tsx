import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, View } from "react-native";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(
    (systemTheme as "light" | "dark") || "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (systemTheme) setTheme(systemTheme);
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
