import Vue from "vue";
import Logo from '../components/Logo.vue'

Vue.component('Logo', Logo);

export default {
  icons: {
      iconfont: 'fa',
values: {
      logo: {
        component: 'Logo'
      }} 
    }
};
