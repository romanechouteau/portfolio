export const state = () => ({
  worldSetters: { },
  indexPage: 0,
  ready: false,
  burgerShow: false
})

export const mutations = {
  setWorldSetters (state, payload) {
    state.worldSetters = payload
  },
  setIndexPage (state, payload) {
    state.indexPage = payload
  },
  isReady (state) {
    state.ready = true
  },
  toggleBurger (state, payload) {
    state.burgerShow = payload
  }
}
