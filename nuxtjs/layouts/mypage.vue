<template>
  <div>
    <mypage-header v-if="user" :user="user"/>
    <div class="container" v-if="user">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import MypageHeader from "@/components/layout/MypageHeader.vue"
  export default {
    components:{
      MypageHeader
    },
    data(){
      return {
        user:null
      }
    },
    async mounted() {
      await true
      setTimeout(async ()=>{
        console.log("start relogin",this.$store.state.user.token)
        this.user = await this.$_auth.user()
      },0)
    }
  }
</script>

<style>
  .container{
    max-width: 640px;
    padding: 50px 0;
  }

</style>
