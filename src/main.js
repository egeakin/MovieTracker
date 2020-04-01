// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import DataViewLayoutOptions from 'primevue/dataViewLayoutOptions';
import Panel from 'primevue/panel';
import Listbox from 'primevue/listbox';
import TextArea from 'primevue/textarea';
import Sidebar from 'primevue/sidebar';
import Fieldset from 'primevue/fieldset';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import FullCalendar from 'primevue/fullcalendar';
import { BCarousel } from 'bootstrap-vue';
import { CarouselPlugin } from 'bootstrap-vue'
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'


Vue.use(BootstrapVue)

Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Rating', Rating);
Vue.component('Dialog', Dialog);
Vue.component('Card', Card);
Vue.component('DataView', DataView);
Vue.component('Dropdown', Dropdown);
Vue.component('Paginator', Paginator);
Vue.component('DataViewLayoutOptions', DataViewLayoutOptions);
Vue.component('Panel', Panel);
Vue.component('Listbox', Listbox);
Vue.component('TextArea', TextArea);
Vue.component('Sidebar', Sidebar);
Vue.component('Fieldset', Fieldset);
Vue.component('Accordion', Accordion);
Vue.component("AccordionTab", AccordionTab);
Vue.component('b-carousel', BCarousel);
Vue.use(CarouselPlugin);
Vue.component('b-carousel-slide', bCarouselSlide);
Vue.component('FullCalendar', FullCalendar);

Vue.config.productionTip = false

import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
});


