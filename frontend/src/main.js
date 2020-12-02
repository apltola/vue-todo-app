import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import { storeSymbol, createStore } from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './index.css';

library.add(faExclamationCircle, faTimes);

const app = createApp(App);
app.provide(storeSymbol, createStore());
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
