module.exports = {
  content: ["./src/**/*.astro"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--text-color) / <alpha-value>)",
        icon: "rgb(var(--icon-color) / <alpha-value>)",
        accent: "rgb(var(--accent-color) / <alpha-value>)",
        page: "rgb(var(--page-color) / <alpha-value>)",
        "page-accent": "rgb(var(--page-accent-color) / <alpha-value>)",
        "code-bg": "rgb(var(--code-background-color) / <alpha-value>)",
        "code-border": "rgb(var(--code-border-color) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
