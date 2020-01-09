import {dispather} from "~/store/user";

export default ({store}, inject) => {
  inject('_auth', {
    async user(){
      let user = await dispather.USER(store)
      if(user){
        return user
      }
      await true // 1 thread 遅延させるために必要。
      user = await dispather.RELOGIN(store)
      if(user){
        return user
      }else{
        return null
      }
    },
    async forceRelogin(){
      await true; // 1 thread 遅延させるために必要。
      const user = await dispather.RELOGIN(store)
      if(user){
        return user
      }else{
        return null
      }
    },
    async login({token}){
      await dispather.LOGIN(store,{token})
    },
    async logout(){
      await await dispather.LOGOUT(store)
    },
  });
};
