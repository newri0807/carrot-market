module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media", // 브라우저 설정에 따른 다크모드 설정 , "class"로 설정하면 부모에 클래스 || 쉽게 _app.tsx에  .dark 추가 해야됨
  plugins: [require("@tailwindcss/forms")],
}
