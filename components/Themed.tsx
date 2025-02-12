/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  ButtonProps,
  Pressable,
  StyleSheet,
  Text as DefaultText,
  TouchableOpacity,
  View as DefaultView,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";
import callsites from "callsites";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function Button({
  title,
  onPress = () => {},
  disabled = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[button_styles.button, disabled && button_styles.disabled_button]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          button_styles.button_content,
          disabled && button_styles.disabled_button_content,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const button_styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#34518d",
    borderRadius: 10,
  },
  disabled_button: {
    backgroundColor: "#e3e2e7",
  },
  button_content: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
  disabled_button_content: {
    color: "#8f8e93",
  },
});
