<template>
  <div>
    <app-header/>
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import AppHeader from "@/components/layout/AppHeader.vue"
  export default {
    components:{
      AppHeader
    }
  }
</script>

<style>
  .container{
    max-width: 640px;
    padding: 50px 0;
  }

</style>
