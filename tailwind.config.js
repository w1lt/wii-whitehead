/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Add these file extensions for React components
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for better theming
        background: {
          light: "#ffffff",
          dark: "#0f0f0f",
        },
        surface: {
          light: "#f5f5f5",
          dark: "#1a1a1a",
        },
        card: {
          light: "#ffffff",
          dark: "#1f1f1f",
        },
        text: {
          primary: {
            light: "#111827", // gray-900
            dark: "#f9fafb", // gray-50
          },
          secondary: {
            light: "#4b5563", // gray-600
            dark: "#9ca3af", // gray-400
          },
        },
      },
    },
  },
  plugins: [],
};
