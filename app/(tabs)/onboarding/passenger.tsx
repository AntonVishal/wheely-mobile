import { Text, View, Button } from "@/components/Themed";
import { StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useExpoRouter } from "expo-router/build/global-state/router-store";

export default function passenger() {
  const [number, setNumber] = useState("");
  const re = new RegExp("[0-9]{10}");
  const router = useExpoRouter();
  const handleSubmit = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.for_spacing}>
        <Text style={styles.question_text}>Enter your number</Text>
        <TextInput
          autoFocus={true}
          onChangeText={(text) => setNumber(text)}
          placeholder={"e.g. 978XXXX012"}
          keyboardType={"number-pad"}
          style={styles.number_input}
        />
      </View>
      <View>
        <Button
          title={"Continue"}
          onPress={handleSubmit}
          disabled={!re.test(number)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingTop: 10,
    paddingHorizontal: 8,
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
