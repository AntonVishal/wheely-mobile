import { Text, View, Button } from "@/components/Themed";
import { StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useExpoRouter } from "expo-router/build/global-state/router-store";

export default function conductor() {
  const [id, setId] = useState("");
  const re = new RegExp("^[A-Z]{2}[0-9]{8}$");
  const router = useExpoRouter();
  const handleSubmit = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.for_spacing}>
        <Text style={styles.question_text}>Enter your ID</Text>
        <TextInput
          autoFocus={true}
          onChangeText={(text) => setId(text)}
          placeholder={"e.g. TN12XXXX78"}
          style={styles.number_input}
        />
      </View>
      <View>
        <Button
          title={"Continue"}
          onPress={handleSubmit}
          disabled={!re.test(id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  for_spacing: {
    gap: 16,
  },
  question_text: {
    fontSize: 21,
    fontWeight: 700,
  },
  number_input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#34518d",
    borderRadius: 16,
    padding: 16,
    height: 50,
  },
});
