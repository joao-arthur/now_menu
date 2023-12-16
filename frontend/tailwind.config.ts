import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.tsx",
    "./src/app/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        main: "#ff4060",
        mainDisabled: "#dda6af",
        textColor: "#162437",
        backgroundGray: "#f5f5f5",
        borderGray: "#e5e5e5",
        coloralgumacoisa: "#162437"
      }
    },
  },
  plugins: [],
};

export default config;
