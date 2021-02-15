import login from '@/gql/login.gql'
import fetchCurrent from '@/gql/fetchCurrent.gql'

export const state = () => ({
  name: null,
  isAdmin: null,
  id: null,
})

export const mutations = {
  setState(state, { name, isAdmin, id }) {
    state.name = name
    state.isAdmin = isAdmin
    state.id = id
  },

  resetState(oldState) {
    Object.assign(oldState, state())
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.name != null
  },

  isAdmin(state) {
    return state.isAdmin
  },
}

export const actions = {
  async login({ commit }, { name, password }) {
    const { data } = await this.app.apolloProvider.defaultClient.mutate({
      mutation: login,
      variables: {
        name,
        password,
      },
    })

    commit('setState', {
      ...data.login,
    })
  },

  async loadStatus({ commit }) {
    try {
      const { data } = await this.app.apolloProvider.defaultClient.query({
        query: fetchCurrent,
      })

      commit('setState', {
        ...data.user,
      })
    } catch {
      // do nothing.
      // session is not existed.
    }
  },
}
