import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App)

app.use(router)



app.use(vue3GoogleLogin, {
  clientId: "579970138862-o8h529mmlc7s40s0t8sughhsvkse9g54.apps.googleusercontent.com",
});

app.mount("#app");
