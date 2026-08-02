/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBFBF6",
        pine: "#12331F",
        leaf: "#2E9E4F",
        "leaf-dark": "#1F7A3B",
        "leaf-light": "#E4F4E7",
        citrus: "#FF7A29",
        mist: "#EEF7EF",
        ink: "#152018",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      borderRadius: {
        pill: "999px",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(18,51,31,0.25)",
        card: "0 10px 40px -12px rgba(18,51,31,0.18)",
      },
    },
  },
  plugins: [],
}
