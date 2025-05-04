/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

// Registra plugins personalizados (ex: Vuetify, Vue Router, etc.)
registerPlugins(app)

// Configura e registra o Toast
app.use(Toast, {
  timeout: 3000,
  position: 'top-right',
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
})

app.mount('#app')
