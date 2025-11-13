import { View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import SplashScreen from "../ui/splashScreen/splashScreen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../redux/store";
import StackNavigation from "../../routes/StackNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "../../Context/ThemeContext";
import { NotificationProvider } from "../../Context/NotificationContext";

const MainLayout = () => {
  const [currentScreen, setCurrentScreen] = useState("");
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000); // show splash for 2s

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["bottom"]}
    >
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <NotificationProvider>
                {isSplashVisible ? (
                  <SplashScreen />
                ) : (
                  <StackNavigation setCurrentScreen={setCurrentScreen} />
                )}
              </NotificationProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </View>
    </SafeAreaView>
  );
};

export default MainLayout;
