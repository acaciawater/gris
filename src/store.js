import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: {
      location: [20, 20],
      zoom: 3,
      center: [20, 20]
    },
    survey: undefined,
    indicators: []
  },
  getters: {
    map: state => {
      return state.map
    },
    survey: state => {
      return state.survey
    },
    indicators: state => {
      return state.indicators
    },
    location: state => {
      return state.map.location
    },
    zoom: state => {
      return state.map.zoom
    },
    center: state => {
      return state.map.center
    }
  },
  mutations: {
    map: (state, payload) => {
      state.map = payload
    },
    survey: (state, payload) => {
      state.survey = payload
    },
    indicators: (state, payload) => {
      state.indicators = payload
    },
    location: (state, payload) => {
      state.map.location = payload
    },
    zoom: (state, payload) => {
      state.map.zoom = payload
    },
    center: (state, payload) => {
      state.map.center = payload
    }
  },
  actions: {
    map: (context, payload) => {
      context.commit('map', payload)
    },
    survey: (context, payload) => {
      context.commit('survey', payload)
    },
    indicators: (context, payload) => {
      context.commit('indicators', payload)
    },
    location: (context, payload) => {
      context.commit('location', payload)
    },
    zoom: (context, payload) => {
      context.commit('zoom', payload)
    },
    center: (context, payload) => {
      context.commit('center', payload)
    }
  }
})
