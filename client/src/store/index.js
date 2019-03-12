import Vue from 'vue';
import Vuex from 'vuex';
import http from '../api/http';

Vue.use(Vuex);

import network from './modules/networks';

const store = new Vuex.Store({
  modules: {
    network
  }
});

http.httpErrorHandler = (error) => {
  switch (error.response.status) {
    case 401:
      window.location.replace(window.wayOutNetwork.env.LOGIN_URL);
      break;

    case 403:
      store.dispatch('showAlert', {
        color: 'error',
        text: 'You don\'t have permission for this operation',
      });
      break;

    case 404:
      store.dispatch('showAlert', {
        color: 'error',
        text: 'This operation is not exists 404',
      });
      break;

    case 500:
      store.dispatch('showAlert', {
        color: 'error',
        text: 'Unknown server Error 500',
      });
      break;

    default:
      throw error;
  }
};

export default store;
