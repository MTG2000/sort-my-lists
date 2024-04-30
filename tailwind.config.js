/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#205295",
        primaryDark: "#144272",
        primaryDarker: "#0A2647",
        primaryLight: "#2C74B3",
        secondary: "#B7500B",
        black: "#191C1E",
        white: "#FFFFFF",
        yellow: "#FADA5D",
        tertiary: "#F5CABB",
        tertiaryOnContainer: "#BC4919",
        tertiaryLight: "#F5CABB",
        dialogOverlay: "#001F2AB2",
        danger: "#C81E1E",
        lightBackground: "#FBFCFE",
        lightSurface: "#F2F7F9",
        menuHighlight: "#9AE1FF",
      },
    },
  },
  plugins: [],
};
