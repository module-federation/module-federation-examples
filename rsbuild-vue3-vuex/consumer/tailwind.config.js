const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    backgroundImage: {
      "panel-bg": "url('public/img/icons/panel-bg.png')",
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      mono: ["'Major\\ Mono\\ Display'", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontFamily: {
        display: ["Raleway", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          darkest: "#3b5bdb",
          dark: "#4263eb",
          DEFAULT: "#5c7cfa",
          light: "#91a7ff",
          lightest: "#dbe4ff",
        },
        info: {
          darkest: "#1971c2",
          dark: "#1c7ed6",
          DEFAULT: "#339af0",
          light: "#74c0fc",
          lightest: "#d0ebff",
        },
        success: {
          darkest: "#099268",
          dark: "#0ca678",
          DEFAULT: "#20c997",
          light: "#63e6be",
          lightest: "#c3fae8",
        },
        error: {
          darkest: "#e03131",
          dark: "#f03e3e",
          DEFAULT: "#ff6b6b",
          light: "#ffa8a8",
          lightest: "#ffe3e3",
        },
        warning: {
          darkest: "#f08c00",
          dark: "#f59f00",
          DEFAULT: "#ff922b",
          light: "#ffe066",
          lightest: "#fff3bf",
        },
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))",
        8: "repeat(8, minmax(0,1fr))",
        9: "repeat(9, minmax(0,1fr))",
        10: "repeat(10, minmax(0,1fr))",
      },
    },
  },
};
