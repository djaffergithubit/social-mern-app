/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '825px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      flex: {
        '0.5': '0.5',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '11.5': '11.5',
        '12': '12'
      },

      colors: {
        // Define your custom colors using Tailwind's color scale
        grey: {
          0: "#FFFFFF",
          10: "#F6F6F6",
          50: "#F0F0F0",
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#0A0A0A",
          1000: "#000000",
        },
        primary: {
          50: "#E6FBFF",
          100: "#CCF7FE",
          200: "#99EEFD",
          300: "#66E6FC",
          400: "#33DDFB",
          500: "#00D5FA",
          600: "#00A0BC",
          700: "#006B7D",
          800: "#00353F",
          900: "#001519",
        },
      },
      fontFamily: {
        // Define your custom typography settings
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        // Define your custom font sizes
        "12": "12px",
        "40": "40px",
        "32": "32px",
        "24": "24px",
        "22": "22px",
        "20": "20px",
        "16": "16px",
        "14": "14px",
      },
    },
  },
  plugins: [],
}