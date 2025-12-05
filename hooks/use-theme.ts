// hooks/use-theme.ts
import { useThemeColor } from './use-theme-color';

export default function useTheme() {
    return {
        colors: {
            bg: useThemeColor({}, "bg"),
            text: useThemeColor({}, "text"),
            primary: useThemeColor({}, "primary"),
            secondary: useThemeColor({}, "secondary"),
            danger: useThemeColor({}, "danger"),
            card: useThemeColor({}, "card"),
            input: useThemeColor({}, "input"),
            placeholder: useThemeColor({}, "placeholder"),
        },
    };
}
