import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Image } from "react-native";

interface IconButtonProps {
  title: string;
  onPress?: () => void;
  iconSource: any;
  isSelected?: boolean;
}

export const IconButton = ({
  title,
  onPress,
  iconSource,
  isSelected = false,
}: IconButtonProps) => (
  <View
    style={[styles.icon_button, isSelected && styles.selected_icon_button]}
    onTouchStart={onPress}
    onPointerDown={onPress}
  >
    <View style={styles.content}>
      <Image
        source={iconSource}
        style={[styles.icon, isSelected && styles.selected_icon]}
      />
      <Text style={[styles.text, isSelected && styles.selected_text]}>
        {title}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  icon_button: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "#34518d", // Adjust color as needed
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white", // Match the button’s background color
  },
  selected_icon_button: {
    backgroundColor: "#34518d",
  },
  content: {
    flexDirection: "row", // Align icon and text in one line
    alignItems: "center", // Center vertically
  },
  icon: {
    width: 20, // Adjust size as needed
    height: 20,
    resizeMode: "contain",
  },
  selected_icon: {
    backgroundColor: "#34518d",
  },
  text: {
    paddingLeft: 10,
    fontSize: 16,
    color: "black",
    fontWeight: 600,
    lineHeight: 23,
  },
  selected_text: {
    color: "#fff",
    backgroundColor: "#34518d",
  },
});
