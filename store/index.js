export const state = () => ({
  worldSetters: { },
  indexPage: 0
})

export const mutations = {
  setWorldSetters (state, payload) {
    state.worldSetters = payload
  },
  setIndexPage (state, payload) {
    state.indexPage = payload
  }
}
