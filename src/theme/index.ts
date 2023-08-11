import { extendTheme } from "native-base";

export const THEME = extendTheme(
  {
    colors: {
      WHITE: '#FFFFFF',
      BLACK: '#000000',
  
      RED_LIGHT: '#EB7A53',
      YELLOW: '#F03434',
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
    FONT_FAMILY: {
      REGULAR: 'Roboto_400Regular',
      BOLD: 'Roboto_700Bold'
    },
  
    FONT_SIZE: {
      XS: 12,
      SM: 14,
      MD: 16,
      LG: 18,
      XL: 20,
      XXL: 24,
      XXXL: 32,
    },
    sizes: {
      14: 56,
      33: 148,
    },
  }
);