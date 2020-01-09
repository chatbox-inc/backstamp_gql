<template>
  <div>
    <h2>ログイン</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi doloremque ea error, fuga magni modi necessitatibus nostrum omnis repellendus, vero voluptates? Commodi, corporis ducimus nostrum placeat sunt totam velit.</p>
    <div class="mt-5">
      <div class="form-group">
        <label>ユーザ選択</label>
        <select class="form-control" v-model="user">
          <option :value="null">ユーザを選択してください。</option>
          <option :value="user" v-for="user in  users" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
      <a href="#" class="btn btn-primary" @click.prevent="submit">ログインメール送信</a>
    </div>

  </div>
</template>

<script>
import getUsers from "~/service/graphql/getUsers.gql"
import gqlLogin from "~/service/graphql/login.gql"
import {AuthUsecase} from "~/service/usecase/AuthUsecase";

export default {
  components: {},
  data() {
    return {
      users: [],
      user: null
    }
  },
  async mounted(){
    this.users = await new AuthUsecase(this.$apollo).getUsers()
  },
  methods:{
    async submit(){
      const {token} = await new AuthUsecase(this.$apollo).login(this.user.email)
      this.$router.push(`/login/${token}`)
    }
  }
}
</script>

<style>
</style>
