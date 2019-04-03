import Vue from 'vue'
import axios from 'axios';
import App from './components/App.vue'

export const api = axios.create({
  baseURL: 'http://localhost/laravel/projet/laravel-gravatar/public/'
});

new Vue({
  el: '#app',
  render: h => h(App)
})
