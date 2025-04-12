// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Paths to your template files
//   theme: {
//     extend: {
//       colors: {
//         primaryLight: "#98E5DD",
//         primary: "#38bdf8",
//         secondary: "#EEB58F",
//         background: "#121212",
//         lightBackground: "#2C2B2B",
//         card: "#1E1E1E",
//         textColor: "#FFFFFF",
//         lightTextColor: "#747C7C",
//       },
//       screens: {
//         xs: "300px",
//         sm: "600px", // Custom small breakpoint
//         md: "800px", // Custom medium breakpoint
//         lg: "1024px", // Large
//         xl: "1366px", // Extra-large
//         "2xl": "1600px",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#98E5DD",
        primary: "#38bdf8",
        secondary: "#EEB58F",
        background: "#121212",
        lightBackground: "#2C2B2B",
        card: "#1E1E1E",
        textColor: "#FFFFFF",
        lightTextColor: "#747C7C",
      },
      screens: {
        xs: "300px",
        sm: "600px",
        md: "800px",
        lg: "1024px",
        xl: "1366px",
        "2xl": "1600px",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.textColor'),
            maxWidth: '80ch',
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primaryLight'),
              },
            },
            h1: {
              color: theme('colors.textColor'),
              fontWeight: '700',
              marginBottom: theme('spacing.4'),
            },
            h2: {
              color: theme('colors.textColor'),
              fontWeight: '600',
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
            },
            h3: {
              color: theme('colors.textColor'),
              fontWeight: '600',
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.3'),
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: theme('spacing.6'),
              marginBottom: theme('spacing.4'),
              'li::marker': {
                color: theme('colors.lightBackground'),
              },
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: theme('spacing.6'),
              marginBottom: theme('spacing.4'),
              'li::marker': {
                color: theme('colors.lightBackground'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.primary'),
              color: theme('colors.lightTextColor'),
              fontStyle: 'normal',
              paddingLeft: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
            },
            code: {
              backgroundColor: theme('colors.lightBackground'),
              color: theme('colors.primaryLight'),
              padding: theme('spacing.1'),
              borderRadius: theme('borderRadius.sm'),
              fontWeight: '400',
            },
            pre: {
              backgroundColor: theme('colors.card'),
              color: theme('colors.textColor'),
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
              overflowX: 'auto',
              marginBottom: theme('spacing.4'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};