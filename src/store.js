import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/data/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vrn: null,
    nino: null,
    mtdItId: null,
    "Authorization": null,
    "self-assessment": {
      "Accept": "application/vnd.hmrc.2.0+json"
    },
    "vat": {
      "Accept": "application/vnd.hmrc.1.0+json",
    },
    "losses": {
      "Accept": "application/vnd.hmrc.1.0+json"
    },
    "Content-Type": "application/json",
    "calculationId": "041f7e4d-87d9-4d4a-a296-3cfbdf92f7e2",
    "selfEmploymentId": "XAIS12345678901",
    "taxYear": "2019-20",
    "from": "2018-04-06",
    "to": "2018-10-03",
    "accountId": "XPIT00357725120",
    "periodKey": "A332",
    "lossId": "1234568790ABCDE",
    "typeOfLoss": "self-employment",
    data: data,
    "apiGrouping": "self-assessment"
  },
  mutations: {
    UPDATE_VRN(state, {
      vrn
    }) {
      state.vrn = vrn
    },
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
    },
    UPDATE_API_GROUPING(state, apiGrouping) {
      state["apiGrouping"] = apiGrouping
    }
  },
  actions: {
    updateAuth(context, data) {
      context.commit("UPDATE_VRN", data)
      context.commit("UPDATE_NINO", data)
      context.commit("UPDATE_MTDITID", data)
      context.commit("UPDATE_ACCESS_TOKEN", data)
    },
    updateApiGrouping(context, apiGrouping) {
      context.commit("UPDATE_API_GROUPING", apiGrouping)
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
        const grouping = state.apiGrouping
        return state.data[grouping][name]
      }
    },
    dataKeys: (state) => {
      const grouping = state.apiGrouping
      return Object.keys(state.data[grouping])
    },
    grouping: (state) => {
      return state.apiGrouping
    }
  }
})
