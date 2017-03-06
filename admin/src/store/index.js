import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    siteInfo: {},
    list: [],
    curr: {},
    user: {}
  },

  actions: {

    GET_IMAGE_HEIGHT: ({ commit, state }, { url }) => {
      return api.getImageHeight(url).then(data => data.height || 100)
    },

    FETCH: ({ commit, state }, { model, query }) => {
      return api.fetchList(model, query)
    },

    FETCH_BY_ID: ({ commit, state }, { model, id, query }) => {
      return api.fetchByID(model, id, query)
    },

    FETCH_LIST: ({ commit, state }, { model, query }) => {
      return api.fetchList(model, query).then(obj => {
        commit('SET_LIST', { obj })
      })
    },

    FETCH_CREATE: ({ commit, state }, { model, id, query }) => {
      if (id === -1) {
        return api.fetchList(model, query).then(curr => {
          let obj = curr.reduce((prev, value) => {
            if (model === 'user') {
              Object.keys(value).forEach(item => {
                prev[item] = value[item]
              })
            }
            return prev
          }, {})
          commit('SET_CURR', { obj })
        })
      } else {
        return api.fetchByID(model, id, query).then(obj => {
          commit('SET_CURR', { obj })
        })
      }
    },
  
    POST: ({ commit, state }, { model, form }) => {
      //console.log(form)
      return api.post(model, form).then((result) => {
       
          commit('SET_CURR', { obj: result })
       
        return result
      })
    },

    GET_IMAGE_TOKEN: ({ commit, state }, body) => {
      return api.getImageToken(body)
    },

    PATCH: ({ commit, state }, { model, id, form }) => {
      return api.patchByID(model, id, form)
    },

    DELETE: ({ commit, state }, { model, id }) => {
      return api.deleteByID(model, id)
    },

    FETCH_USER: ({ commit, state }, { model, query }) => {
      
      return api.fetchList(model, query).then(result => {
        if  (result.length > 0) {
         
          commit('SET_USER', { user: result[0] })
           console.log(state.user)
        }

      })
    }
  },

  mutations: {
    SET_LIST: (state, { obj }) => {
      Vue.set(state, 'list', obj)
    },

    SET_CURR: (state, { obj }) => {
      Vue.set(state, 'curr', obj)
    },

    SET_USER: (state, { user }) => {
      Vue.set(state, 'user', user)
    }
  },

  getters: {

  }
})

export default store
