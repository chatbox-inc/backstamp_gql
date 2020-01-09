import {createNamespacedHelpers} from "vuex"
import {AuthUsecase} from "~/service/usecase/AuthUsecase";

export const dispather = {
  USER: (store) => store.dispatch("user/USER") ,
  LOGIN: (store,{token}) => store.dispatch("user/LOGIN",{token}) ,
  RELOGIN: (store) => store.dispatch("user/RELOGIN") ,
  LOGOUT: (store) => store.dispatch("user/LOGOUT") ,
}

export const userMapper = createNamespacedHelpers("AMMEKtPY/user")

export const state = () => {
  return {
    user: null,
    token: null
  }
}

export const mutations = {
  SET_USER(state,user){
    state.user = user
  },
  SET_TOKEN(state,token){
    state.token = token
  }
}

export const actions = {
  async USER({state,dispatch}){
    return state.user
  },
  async LOGIN({commit,app},{token}){
    if(token){
      await this.$apolloHelpers.onLogin(token)
    }
    commit("SET_TOKEN",token)
    const user = new AuthUsecase(this.app.apolloProvider.defaultClient).whoami()
    commit("SET_USER",user)
    return user
  },
  async RELOGIN({state,dispatch}){
    return dispatch("LOGIN",{token:state.token})
  },
  async LOGOUT({commit}){
    await this.$apolloHelpers.onLogout()
    commit("SET_USER",null)
    commit("SET_TOKEN",null)
  }
}
