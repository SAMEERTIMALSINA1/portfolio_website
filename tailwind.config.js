module.exports = {
  content: [
    "./**/*.html",
    "./js/**/*.js"   // ✅ also add this
  ],

  safelist: [        // ✅ ADD THIS BLOCK
    "bg-blue-100", "text-blue-700",
    "bg-purple-100", "text-purple-700",
    "bg-green-100", "text-green-700",
    "bg-orange-100", "text-orange-700",
    "bg-indigo-100", "text-indigo-700",

    "bg-blue-600", "hover:bg-blue-700", "text-blue-600",
    "bg-purple-600", "hover:bg-purple-700", "text-purple-600",
    "bg-green-600", "hover:bg-green-700", "text-green-600",
    "bg-orange-600", "hover:bg-orange-700", "text-orange-600",
    "bg-indigo-600", "hover:bg-indigo-700", "text-indigo-600"
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#0d9488',
        accent: '#1e293b',
        light: '#f8fafc',
        dark: '#0f172a',
      },
    },
  },
}