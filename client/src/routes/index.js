import Vue from 'vue';
import VueRouter from 'vue-router';

/*end-points*/
import {homePage} from './pathTo/index';
import {networks} from './pathTo/networks';

Vue.use(VueRouter);

const routes = [...homePage, ...networks];
const router = new VueRouter({routes});

export default router;
