import { extendTheme } from "native-base";

export const THEME = extendTheme(
  {
    colors: {
      WHITE: '#FFFFFF',
      BLACK: '#000000',
  
      RED_LIGHT: '#EB7A53',
      RED_MID: '#F03434',
      YELLOW: '#F7D44C',
      BLUE: '#98B7DB',
      GREEN: '#A8D672',
      BEIGE: '#F6ECC9',
  
      gray: {
        700: "#121214",
        600: "#202024",
        500: "#29292E",
        400: "#323238",
        300: "#7C7C8A",
        200: "#C4C4CC",
        100: "#E1E1E6",
      },
  
    },
    fonts: {
      heading: "Roboto_700Bold",
      body: "Roboto_400Regular",
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 28,
    },
    sizes: {
      14: 56,
      33: 148,
    },
  }
);