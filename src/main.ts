import './assets/main.css'
import 'primevue/resources/themes/aura-dark-cyan/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import { createMemoryHistory, createRouter } from 'vue-router'

import mitt from 'mitt';
const emitter = mitt();

//@ts-ignore
import DashboardView from './components/views/Dashboard/DashboardView.vue';

//@ts-ignore
import NewFlightView from './components/views/New Flight/NewFlightView.vue';

const routes = [
  { path: '/', component: DashboardView },
  { path: '/newflight', component: NewFlightView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(router);
app.use(PrimeVue);
app.mount('#app');
