/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#003161",
          secondary: "#424242",
          success: "#4CAF50",
          error: "#FF5252",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#003161",
          secondary: "#B0BEC5",
          success: "#81C784",
          error: "#FF8A65",
        },
      },
    },
  },
});
