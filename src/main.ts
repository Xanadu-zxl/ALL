import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/basis.scss'
import 'vant/lib/index.css'

import { Icon, Popup, Picker } from 'vant'

createApp(App).use(store).use(router).use(Icon).use(Popup).use(Picker).mount('#app')
