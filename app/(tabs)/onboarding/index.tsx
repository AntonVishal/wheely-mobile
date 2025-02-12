import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { IconButton } from "@/components/IconButtons";
import { useExpoRouter } from "expo-router/build/global-state/router-store";

export default function choose() {
  const router = useExpoRouter();
  const handleSubmit = (chosen:string) => {
    if (chosen == "Passenger") {
      router.push("/onboarding/passenger");
    } else if (chosen == "Conductor") {
      router.push("/onboarding/conductor");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.options_container}>
        <Text style={styles.options_question}>Who Are You?</Text>
        <View style={styles.options}>
          <IconButton
            title={"Passenger"}
            onPress={() => {
              handleSubmit("Passenger")
            }}
            iconSource={require("../../../assets/images/passenger-icon.png")}
          />
          <IconButton
            title={"Conductor"}
            onPress={() => {
              handleSubmit("Conductor");
            }}
            iconSource={require("../../../assets/images/conductor-icon.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 16,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  options_container: {
    width: "100%",
  },
  options_question: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 16,
  },
  options: {
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
});
