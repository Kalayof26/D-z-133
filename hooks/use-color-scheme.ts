import { useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export default function useColorScheme() {
    const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

    useEffect(() => {
        const listener = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
            setTheme(colorScheme);
        };

        const subscription = Appearance.addChangeListener(listener);
        return () => subscription.remove();
    }, []);

    return theme ?? "light";
}
