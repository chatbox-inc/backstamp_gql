<template>
  <div>
  </div>
</template>

<script>
import {userMapper} from "~/store/user";

export default {
  components: {},
  data() {
    return {}
  },
  computed:{
    token(){
      return this.$route.params.token
    }
  },
  async mounted(){
    await this.LOGIN({token: this.token})
    this.$router.push("/mypage")
  },
  methods:{
    ...userMapper.mapActions(["LOGIN"])
  }
}
</script>

<style>
</style>
