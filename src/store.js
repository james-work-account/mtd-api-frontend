import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nino: null,
    mtdItId: null,
    "Authorization": null,
    "Accept": "application/vnd.hmrc.2.0+json",
    "Content-Type": "application/json",
    "calculationId": "041f7e4d-87d9-4d4a-a296-3cfbdf92f7e2",
    "selfEmploymentId": "XAIS12345678901",
    data: data
  },
  mutations: {
    UPDATE_NINO(state, {
      nino
    }) {
      state.nino = nino
    },
    UPDATE_MTDITID(state, {
      mtdItId
    }) {
      state.mtdItId = mtdItId
    },
    UPDATE_ACCESS_TOKEN(state, {
      accessToken
    }) {
      state["Authorization"] = accessToken
    }
  },
  actions: {
    updateAuth(context, data) {
      context.commit("UPDATE_NINO", data)
      context.commit("UPDATE_MTDITID", data)
      context.commit("UPDATE_ACCESS_TOKEN", data)
    }
  },
  getters: {
    nino: state => {
      return state.nino
    },
    mtdItId: state => {
      return state.mtdItId
    },
    accessToken: state => {
      return state.accessToken
    },
    data: (state) => {
      return (name) => {
        return state.data[name]
      }
    },
    dataKeys: (state) => {
      return Object.keys(state.data)
    }
  }
})
