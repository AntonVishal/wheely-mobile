import {ActivityIndicator, AppState, Image, StyleSheet, TextInput} from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, {MapMarker, Polyline} from "react-native-maps";

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
    checkAuth();
    const appStateListener = AppState.addEventListener("change", async (nextAppState) => {
      if (nextAppState === "inactive" || nextAppState === "background") {
        console.log("App is closing or in background. Clearing token...");
        await AsyncStorage.setItem("userToken", "");
      }
    });

    return () => {
      appStateListener.remove();
    };

  }, []);
  if (loading) {
    return <ActivityIndicator size={"large"} style={{ flex: 1 }} />;
  }
  return (
    <View style={styles.container}>
      <MapView
          style={styles.map}
          initialRegion={{
            latitude: 11.0168,
            longitude: 76.9558,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
      >
        <MapMarker coordinate={{latitude: 11.0168, longitude: 76.9558,}} image={require("../../assets/images/icon.png")} />

      </MapView>
      <View style={styles.source_field}>
        <TextInput style={styles.input} placeholder={"Source"}/>
        <View style={styles.source_dot} />
      </View>
      <View style={styles.destination_field}>
        <TextInput style={styles.input} placeholder={"Destination"} />
        <View style={styles.destination_dot} />
      </View>
      <View style={styles.bottom_tray}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  source_field:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input:{
    width: "80%"
  },
  source_dot:{
    height: 10,
    width: 10,
    borderRadius: 8,
    backgroundColor: "#00a000"
  },
  destination_field:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  destination_dot:{
    height: 10,
    width: 10,
    borderRadius: 8,
    backgroundColor: "#a00000"
  },
  bottom_tray:{

  },
  map:{
    ...StyleSheet.absoluteFillObject
  }
});
