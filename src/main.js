/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import VueApexCharts from 'vue3-apexcharts';
import Swal from 'sweetalert2';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(VueApexCharts);
app.config.globalProperties.$swal = Swal;
registerPlugins(app)

app.mount('#app')
