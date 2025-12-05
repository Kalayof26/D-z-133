import useColorScheme from "./use-color-scheme";

export const Colors = {
  light: {
    bg: "#ffffff",
    text: "#000000",
    primary: "#007bff",
    secondary: "gray",
    danger: "red",
    card: "#f0f0f0",
    input: "#e0e0e0",
    placeholder: "#888",
  },
  dark: {
    bg: "#121212",
    text: "#ffffff",
    primary: "#3B82F6",
    secondary: "gray",
    danger: "red",
    card: "#1E1E1E",
    input: "#2C2C2C",
    placeholder: "#aaa",
  },
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const themeFromHook = useColorScheme(); // "light" | "dark"
  const themeSafe: "light" | "dark" = themeFromHook === "dark" ? "dark" : "light";

  const colorFromProps = props[themeSafe];
  return colorFromProps ? colorFromProps : Colors[themeSafe][colorName];
}
