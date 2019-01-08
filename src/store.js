import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: {
      location: [20, 20],
      zoom: 3,
      center: [20, 20]
    }
  },
  getters: {
    map: state => {
      return state.map
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
