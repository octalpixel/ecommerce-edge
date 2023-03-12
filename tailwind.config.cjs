const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            colors: {
                neutral: "#e5e7eb",
                "neutral-dark": "#27272a",
                base: "#FFFFFF",
                "base-dark": "#18181b",
                primary: "#4A6C6F",
                "primary-emphasis": "#3d595c",
                secondary: "#846075",
                "secondary-emphasis": "#5a3d3d",
            }
        },
    },
    plugins: [
        //@ts-expect-error - Tailwind CSS Animate is not typed
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};
