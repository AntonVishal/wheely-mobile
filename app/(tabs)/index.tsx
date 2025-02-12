import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const router = useExpoRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/onboarding");
      } else {
        setLoading(false);
      }
    };
    setTimeout(checkAuth, 2000);
  }, []);
  if (loading) {
    return <ActivityIndicator size={"large"} style={{ flex: 1 }} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
