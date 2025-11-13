// SplashScreen.tsx
import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, SafeAreaView, Animated } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
        <Image
          source={require("../../../../assets/Icon.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Task Management
        </Animated.Text>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Developed by Mehedi Hasan
      </Animated.Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    alignItems: "center",
  },
  logo: {
    width: responsiveWidth(60),
    height: responsiveWidth(60),
  },
  title: {
    position: "absolute",
    bottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    color: "gray",
  },
});
