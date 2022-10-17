import { createApp } from 'vue';
import { StoreManager } from '@idevelopthings/vue-class-stores/vue';
import './style.css';
import App from './App.vue';

const app = createApp(App)
app.use(StoreManager, import.meta.glob('./Stores/Generated/StoreLoader.ts', {eager : true}));

app.mount('#app');
