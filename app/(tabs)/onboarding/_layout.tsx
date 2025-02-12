import { StyleSheet, useWindowDimensions } from "react-native";
import { View, Text } from "@/components/Themed";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Stack } from "expo-router";

export default function OnboardingScreen() {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions(); // Get screen height
    const logo_screen_height = useSharedValue(screenHeight); // Start at 100% height
    const options_screen_height = useSharedValue(0);
    const logo_height = useSharedValue(200);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            logo_screen_height.value = withTiming(screenHeight * 0.2, {
                duration: 1000,
            });
            options_screen_height.value = withTiming(screenHeight * 0.8, {
                duration: 1000,
            });
            logo_height.value = withTiming(80, { duration: 1000 });
        }, 500);

        return () => clearTimeout(timeoutId); // Cleanup function
    }, []);

    const animatedLogoScreenHeight = useAnimatedStyle(() => {
        return {
            height: logo_screen_height.value, // Use numeric height
        };
    });
    const animatedOptionsScreenHeight = useAnimatedStyle(() => {
        return {
            height: options_screen_height.value, // Use numeric height
        };
    });
    const animatedLogo = useAnimatedStyle(() => {
        return {
            height: logo_height.value,
            width: (logo_height.value / 200) * 200,
        };
    });
    return (
        <View style={{ width: screenWidth, ...styles.main_container }}>
            <Animated.View
                style={[styles.logo_screen, animatedLogoScreenHeight]}
            >
                <Animated.Image
                    source={require("../../../assets/images/icon.png")}
                    style={[styles.logo, animatedLogo]}
                />
                <Text style={styles.logo_one_line}>Something for Disabled</Text>
            </Animated.View>
            <Animated.View
                style={[styles.content_container, animatedOptionsScreenHeight]}
            >
                <Stack
                    screenOptions={{
                        animation: "slide_from_right",
                        headerShown: false,
                    }}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#34518d",
    },
    logo_screen: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    logo: {
        resizeMode: "contain",
    },
    logo_one_line: {
        color: "#fff",
    },
    content_container: {
        width: "100%",
        padding: 16,
        backgroundColor: "#fff",
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
    },
});
