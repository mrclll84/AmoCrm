import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(Antd)
app.use(store)

app.mount('#app')
