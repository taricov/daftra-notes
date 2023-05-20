import { createApp } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

const app = createApp(App)
setupApp(app)

app.use(vue3GoogleLogin, {
  clientId: '658535880589-rm1ub8t15b4l8tbrfc8fag1jlnn3drcr.apps.googleusercontent.com',
})
app.mount('#app')
