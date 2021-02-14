export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    try {
      await dispatch('user/loadStatus')
    } catch (error) {
      ctx.app.error(error)
    }
  },
}
