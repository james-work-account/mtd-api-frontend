import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apis: [],
    vrn: null,
    nino: null,
    mtdItId: null,
    "Authorization": null,
    "self-assessment-api": {
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
    data: {},
    "apiGrouping": null
  },
  mutations: {
    UPDATE_API_LIST(state, apis) {
      state.apis = apis
    },
    UPDATE_ENDPOINT_NAMES_FOR(state, {
      grouping,
      endpoints
    }) {
      state.data[grouping] = endpoints
    },
    UPDATE_ENDPOINT_DETAILS_FOR(state, {
      grouping,
      endpoint,
      data
    }) {
      state.data[grouping][endpoint] = {
        ...state.data[grouping][endpoint],
        ...data
      }
    },
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
    updateEndpoints(context, data) {
      context.commit("endpoints", )
    },
    updateApiList(context, data) {
      const apis = Object.assign({}, ...(data.map(item => ({
        [item.name]: item.friendly_name
      }))))
      context.commit("UPDATE_API_LIST", apis)
    },
    updateEndpointNameFor(context, data) {
      const endpoints = Object.assign({}, ...(data.endpoints.map(item => ({
        [item.friendly_name]: item
      }))))
      context.commit("UPDATE_ENDPOINT_NAMES_FOR", {
        "grouping": data.name,
        endpoints
      })
    },
    updateEndpointDetailsFor(context, data) {
      context.commit("UPDATE_ENDPOINT_DETAILS_FOR", data)
    },
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
    apiList: state => {
      return state.apis
    },
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
        if (state.apiGrouping) {
          const grouping = state.apiGrouping.name
          return state.data[grouping][name]
        } else {
          return null
        }
      }
    },
    dataKeys: (state) => {
      if (state.apiGrouping) {
        const grouping = state.apiGrouping.name
        return Object.keys(state.data[grouping])
      } else {
        return []
      }
    },
    grouping: (state) => {
      return state.apiGrouping
    }
  }
})
