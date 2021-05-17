export const state = () => ({
  indexSetters: { },
  indexPage: 0
})

export const mutations = {
  setIndexSetters (state, payload) {
    state.indexSetters = payload
  },
  setIndexPage (state, payload) {
    state.indexPage = payload
  }
}
