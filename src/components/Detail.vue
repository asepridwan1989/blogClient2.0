<template>
  <div>
    <div style="text-align:center" v-if="!loadStat">
      <img src="https://loading.io/spinners/hourglass/lg.sandglass-time-loading-gif.gif" alt="">
    </div>
    <div class="container" style="margin-top:100px" v-if="loadStat">
      <div class="container">
        <button type="button" class="btn btn-info btn-lg" @click="backpage">back to timeline</button>
      </div>
      <br><br>
      <div style="background-color:white border-radius:25%">
        <div class="card-body">
          <h2 class="card-title">{{singArt.title}}</h2>
          <h6 class="card-subtitle mb-2 text-muted" >posted by: {{singArt.userId.name}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">user id: {{singArt.userId._id}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">posted at: {{singArt.createdAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">last update: {{singArt.updatedAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
          <div style="text-align: justify;" v-html="singArt.content"></div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Detail',
  computed: {
    ...mapState([
      'singArt', 'loadStat'
    ])
  },
  created() {
    let tokenStore = localStorage.getItem('blog-token')
    if(!tokenStore){
      this.$router.push({'path' : '/'})
    }
    this.$store.dispatch('makeStatLoad', false)
    this.$store.dispatch('getOneArticle', this.$route.params.id)
  },
  methods: {
    backpage() {
      this.$router.push({'path' : '/blog'})
    }
  }
}
</script>

<style>

</style>
