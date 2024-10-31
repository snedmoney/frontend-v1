const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        grid: "grid 15s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    }
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          danger: {
            50: "#fdf7f8",
            100: "#fbeff0",
            200: "#f5dbde",
            300: "#f0c7cb",
            400: "#ebb7bc",
            500: "#e08f97",
            600: "#d86f79",
            700: "#bc3441",
            800: "#80232c",
            900: "#3c1015",
            DEFAULT: "#E3626F"
          },
          primary: {
            50: "#f9f9fb",
            100: "#f3f2f7",
            200: "#e4e3ee",
            300: "#d6d3e4",
            400: "#cac6dc",
            500: "#aca6c9",
            600: "#958db9",
            700: "#655b95",
            800: "#453e65",
            900: "#201d2f",
            DEFAULT: "#CCC2FF"
          },
          secondary: {
            50: "#f9fafb",
            100: "#f3f5f6",
            200: "#e5e8eb",
            300: "#d6dce0",
            400: "#cbd2d8",
            500: "#aeb9c2",
            600: "#96a4b0",
            700: "#677a89",
            800: "#46535d",
            900: "#21272c",
            DEFAULT: "#A9B8C4"
          },
          success: {
            50: "#f8fcfb",
            100: "#f1f8f7",
            200: "#e0f0ed",
            300: "#d0e7e3",
            400: "#c2e0db",
            500: "#a0cfc7",
            600: "#85c1b7",
            700: "#509f92",
            800: "#376d64",
            900: "#1a332f",
            DEFAULT: "#A4F5E7"
          },
          warning: {
            50: "#fcfaf8",
            100: "#f9f5f1",
            200: "#f1e9df",
            300: "#eaddcd",
            400: "#e4d3be",
            500: "#d5bb9a",
            600: "#c9a77e",
            700: "#a97d47",
            800: "#735530",
            900: "#362817",
            DEFAULT: "#F5C890"
          }
        },
      },
      dark: {
        colors: {
          danger: {
            50: "#3c1015",
            100: "#80232c",
            200: "#bc3441",
            300: "#d86f79",
            400: "#e08f97",
            500: "#ebb7bc",
            600: "#f0c7cb",
            700: "#f5dbde",
            800: "#fbeff0",
            900: "#fdf7f8",
            DEFAULT: "#E3626F"
          },
          primary: {
            50: "#201d2f",
            100: "#453e65",
            200: "#655b95",
            300: "#958db9",
            400: "#aca6c9",
            500: "#cac6dc",
            600: "#d6d3e4",
            700: "#e4e3ee",
            800: "#f3f2f7",
            900: "#f9f9fb",
            DEFAULT: "#CCC2FF"
          },
          secondary: {
            50: "#21272c",
            100: "#46535d",
            200: "#677a89",
            300: "#96a4b0",
            400: "#aeb9c2",
            500: "#cbd2d8",
            600: "#d6dce0",
            700: "#e5e8eb",
            800: "#f3f5f6",
            900: "#f9fafb",
            DEFAULT: "#A9B8C4"
          },
          success: {
            50: "#1a332f",
            100: "#376d64",
            200: "#509f92",
            300: "#85c1b7",
            400: "#a0cfc7",
            500: "#c2e0db",
            600: "#d0e7e3",
            700: "#e0f0ed",
            800: "#f1f8f7",
            900: "#f8fcfb",
            DEFAULT: "#A4F5E7"
          },
          warning: {
            50: "#362817",
            100: "#735530",
            200: "#a97d47",
            300: "#c9a77e",
            400: "#d5bb9a",
            500: "#e4d3be",
            600: "#eaddcd",
            700: "#f1e9df",
            800: "#f9f5f1",
            900: "#fcfaf8",
            DEFAULT: "#F5C890"
          }
        },
      }
    },
  })]
}