import "./global.css";
import "./gesture-handler";
import MainLayout from "./src/components/layout/MainLayout";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <MainLayout />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
