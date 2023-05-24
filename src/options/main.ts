import { createApp } from 'vue'
import '../styles'
import 'vuetify/styles'
// import 'element-plus/dist/index.css'

// import ElementPlus from 'element-plus'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './Options.vue'
import { setupApp } from '~/logic/common-setup'

const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
setupApp(app)
// set secure, only https works
app.use(vuetify)
// app.use(ElementPlus)
app.mount('#app')
