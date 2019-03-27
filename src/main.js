import Vue from 'vue'
import axios from 'axios';
import App from './components/App.vue'

export const api = axios.create({
  baseURL: 'https://www.iutbayonne.univ-pau.fr/~klevron/api/'
});

new Vue({
  el: '#app',
  render: h => h(App)
})
