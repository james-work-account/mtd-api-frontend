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
    "Content-Type": "application/json",
    "calculationId": "041f7e4d-87d9-4d4a-a296-3cfbdf92f7e2",
    "selfEmploymentId": "XAIS12345678901",
    "dateRange": "2018-19",
    "from": "2018-04-06",
    "to": "2018-10-03",
    "accountId": "XPIT00357725120",
    "periodKey": "A332",
    data: data,
    "apiDomain": "self-assessment",
    "groupedApis": {}
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
    UPDATE_API_DOMAIN(state, apiDomain) {
      state["apiDomain"] = apiDomain
    },
    SET_INITIAL_API_GROUPINGS(state, groupings) {
      state["groupedApis"] = groupings
    }
  },
  actions: {
    updateAuth(context, data) {
      context.commit("UPDATE_VRN", data)
      context.commit("UPDATE_NINO", data)
      context.commit("UPDATE_MTDITID", data)
      context.commit("UPDATE_ACCESS_TOKEN", data)
    },
    updateApiDomain(context, apiDomain) {
      context.commit("UPDATE_API_DOMAIN", apiDomain)
    },
    setInitialApiGroupings(context) {
      //TODO: Refactor
      let groupingsObject = {};
      for (let domain in this.getters.domains) {
        const apis = this.getters.dataKeys().map(key => [key, this.getters.data(key)]);
        const groupedApis = _.groupBy(apis, api => api[1].grouping);
        const groupings = Object.keys(groupedApis).map(group => [
          group,
          groupedApis[group].map(api => api[0])
        ]);
        groupingsObject[this.getters.domains[domain]] = Object.assign(...groupings.map(([key, value]) => ({
          [key]: value
        })))
      }
      context.commit("SET_INITIAL_API_GROUPINGS", groupingsObject)
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
        const domain = state.apiDomain
        return state.data[domain][name]
      }
    },
    dataKeys: (state) => {
      return (domain = state.apiDomain) => {
        return Object.keys(state.data[domain])
      }
    },
    domain: (state) => {
      return state.apiDomain
    },
    domains: (state) => {
      return Object.keys(state.data)
    },
    apiGroupings: (state) => {
      console.log(state.apiDomain, state.groupedApis[state.apiDomain])
      return state.groupedApis[state.apiDomain]
    }
  }
})
