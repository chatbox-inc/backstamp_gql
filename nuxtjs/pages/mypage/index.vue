<template>
  <div class="container">
    <div>
<!--      <h1 class="title">-->
<!--        nuxtjs-->
<!--      </h1>-->
      <h2 class="subtitle">
        My riveting Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <div>{{issues}}</div>
    </div>
  </div>
</template>

<script>
import {IssueUsecase} from "~/service/usecase/IssueUsecase";

export default {
  layout: "mypage",
  data(){
    return {
      issues: []
    }
  },
  async mounted() {
    const user = await this.$_auth.user()
    console.log(user)
    this.issues = await new IssueUsecase(this.$apollo).getIssues()

  }
}
</script>

<style>
</style>
