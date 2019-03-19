import * as Api from "../../api";
import * as types from "../mutationTypes.js";

const state = {
  networks: [],
  currentModel: {}
};

const mutations = {
  [types.SET_NETWORKS](state, { currencies }) {
    state.currencies = currencies;
  },

  [types.SET_CURRENT_MODEL](state, currentCurrency) {
    state.currentModel = currentCurrency;
  }
};

const actions = {
  getNetworks: async ({ commit }) => {
    const response = await Api.network.all();
    const networks = response.data.data;
    commit(types.SET_NETWORKS, { networks });

    return networks;
  },

  getNetwork: async ({ commit }, id) => {
    const response = await Api.network.get(id);
    const network = response.data.data;
    commit(types.SET_CURRENT_MODEL, network);
  },
  saveCurrentModel: ({ commit }, model) =>
    new Promise((resolve, reject) => {
      Api.network
        .save(model)
        .then(result => {
          const model = result.data.data;
          commit(types.SET_CURRENT_MODEL, { model });
          resolve(result.data);
        })
        .catch(error => {
          reject(error);
        });
    }),
  deleteNetwork: ({ state }, id) =>
    new Promise((resolve, reject) => {
      const networkId = id || state.currentModel.id;
      Api.network
        .delete(networkId)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          reject(error.data);
        });
    })
};
const getters = {
  networks() {
    return state.networks;
  },

  currentModel() {
    return state.currentModel;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
