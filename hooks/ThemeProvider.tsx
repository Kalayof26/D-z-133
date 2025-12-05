import React, { createContext, useContext, useState, ReactNode } from "react";

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

type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
    colors: typeof Colors.light;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
    colors: Colors.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: Colors[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

