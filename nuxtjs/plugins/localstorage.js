import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'BLGAPP_TOKEN',
      paths: [
        "user.token",
      ],
    })(store)
  })
}
