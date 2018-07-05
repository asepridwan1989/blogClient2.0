<template>
  <div class="container" style="margin-top:100px">
    <nav class="navbar navbar-light bg-dark" style="margin-bottom:20px">
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="query">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="search">Search</button>
      </form>
    </nav>
    <div style="text-align:center" v-if="!loadStat">
      <img src="https://loading.io/spinners/hourglass/lg.sandglass-time-loading-gif.gif" alt="">
       <h1>Please Wait</h1>
    </div>
    <div class="card" style="width: auto; margin-bottom:20px" v-for="(article, index) in articles" v-bind:key="index" v-if="loadStat"> 
      <div class="card-body">
        <h5 class="card-title">{{article.title}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">like: {{article.like}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">comment: {{article.comments.length}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">posted by: {{article.userId.name}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">user id: {{article.userId._id}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">posted at: {{article.createdAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">last update: {{article.updatedAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
          <div class="column has-text-centered">
            <router-link :to="{ name: 'detail', params: { id: article._id }}">view detail</router-link>
            <router-view/>
          </div>
        <!-- <p style="text-align: justify;" v-html="article.content"></p> -->
      </div>
  </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Timeline',
  data: function () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapState([
      'articles', 'loadStat'
    ])
  },
  created () {
    // let headers = {
    //     token : window.localStorage["blog-token"]
    //   }
    // this.$store.dispatch('getAllPost', headers)    
  },
  methods: {
    search () {
      let payload = this.query
      this.$store.dispatch('search', payload)
    }
  }
}
</script>

<style>

</style>
