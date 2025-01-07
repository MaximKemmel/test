import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xs: { max: "678px" },
    },
    extend: {
      container: {
        padding: "1rem",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
          "2xl": "1360px",
          "4xl": "1560px",
        },
      },
      backgroundImage: {
        button: "url('/images/bg-button.svg')",
        button2: "url('/images/bg-button2.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradientYellow:
          "radial-gradient(44.96% 391.37% at 49.64% 50%, #CB9E31 2.67%, #FFF172 100%)",
        gradientResults:
          "linear-gradient(134.4deg, #65511F -0.15%, #FFEAB7 33.19%, #CB9E31 78.76%, #65511F 102.34%)",
        gradientResultsTab:
          "linear-gradient(180deg, #FFD75F -1.41%, #986C00 24.38%, #5D4200 47.04%, #8E6501 83.22%, #8C6034 102.48%)",
        gradientResultsLine:
          "linear-gradient(90deg, #ffffff00 0%,rgba(255, 255, 255, 0.15) 50%, #ffffff00 100%)",
        gradientDashboard:
          "linear-gradient(268.53deg, #AE882C 1.95%, #FFE9B6 24.38%, #B18A2C 50.54%, #65511F 83.4%, #CB9E31 104.13%)",
        gradientDashboardRadial:
          "radial-gradient(93.42% 791.26% at 76.83% 23.98%, #CB9E31 0%, #FFEAB7 28%, #F9D06E 71%, #65511F 100%)",
        gradientDashboardTarget:
          "linear-gradient(90deg, #65511F -31.25%, #FFEAB7 19.4%, #CB9E31 88.65%, #65511F 124.48%)",
        gradientDashboardText:
          "linear-gradient(134.4deg, #65511F -35.15%, #FFEAB7 33.19%, #CB9E31 78.76%, #65511F 102.34%)",
        gradientDashboardProgram:
          "linear-gradient(134.4deg, #65511F -0.15%, #FFEAB7 33.19%, #CB9E31 78.76%, #65511F 102.34%)",
      },
      boxShadow: {
        buttonShadow:
          "0px 0px 29.9565px rgba(255, 223, 87, 0.5), inset 0px 6.91304px 25.3478px #FFDF34, inset 0px -6.91304px 9.21739px rgba(255, 250, 215, 0.81)",
        matrixCardShadow:
          "0px 4px 15px rgba(0, 0, 0, 0.25), 0px -12px 12px rgba(0, 0, 0, 0.09), 0px -5px 12px rgba(0, 0, 0, 0.1)",
        resultsShadow:
          "0px -187px 75px rgba(0, 0, 0, 0.01), 0px -105px 63px rgba(0, 0, 0, 0.05), 0px -47px 47px rgba(0, 0, 0, 0.09), 0px -12px 26px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        "main-black": "rgba(25,25,25,1)",
        "main-black-card": "rgba(31, 31, 31, 1)",
        "main-black-fields": "rgba(16, 16, 16, 1)",
        "main-black-progress": "rgba(37, 37, 37, 1)",
        "main-black-drawer": "#1A1A1C",
        "main-black-2": "#232323",
        "main-gray": "rgba(44, 44, 44, 1)",
        "main-gray-light": "rgba(188, 188, 188, 0.3)",
        "main-yellow": "#F0B536",
        "main-yellow-3": "#CB9E31",
        "main-home-yellow": "#BF8A18",
        "main-home-red": "#B7181A",
        "main-home-green": "#05E21B",
        "main-green-lime": "#64D121",
        "main-green": "#64D121",
        "main-gold": "#F0B536",
        "main-gray-2": "#BCBCBC",
        "main-gray-3": "rgba(255, 255, 255, 0.26)",
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
        opacity: {
          "10": "0.1",
          "30": "0.3",
          "40": "0.4",
          "50": "0.5",
          "60": "0.6",
          "70": "0.7",
          "80": "0.8",
          "90": "0.9",
        },
      },
    },

    plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
  },
};
export default config;
