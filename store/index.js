export const state = () => ({
  setIndex: () => {}
})

export const mutations = {
  setIndexSetter (state, payload) {
    state.setIndex = payload
  }
}
