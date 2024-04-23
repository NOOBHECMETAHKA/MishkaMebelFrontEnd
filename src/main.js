import 'primevue/resources/themes/aura-light-amber/theme.css';
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import axios from "axios";


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from "primevue/config";
import {useToast} from "primevue/usetoast";

const app = createApp(App);

axios.defaults.baseURL = 'http://misha-mebel.loc/api';

app.config.globalProperties.axios = axios;

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');
