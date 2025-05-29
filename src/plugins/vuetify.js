/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({

  components: {
    VFileUpload,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#F5F5F5',
          primary: '#005EB8',
          secondary: '#F2A900',
          sub: '#555555',
        },
      },
    },
  },
})
