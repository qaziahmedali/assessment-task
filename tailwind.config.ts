import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx'],
    options: {
      safelist: ['dark'], //specific classes
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    typography: (theme: any) => ({
      dark: {
        css: {
          color: 'white',
        },
      },
    }),
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;
