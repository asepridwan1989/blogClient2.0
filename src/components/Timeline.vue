<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="query">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="search">Search</button>
      </form>
    </nav>
    <div class="card" style="width: auto;" v-for="(article, index) in articles" v-bind:key="index">
    <div class="card-body">
      <h5 class="card-title">{{article.title}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">posted by: {{article.username}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">posted at: {{article.createdAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">last update: {{article.updatedAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
      <p style="text-align: justify;">{{article.content}}</p>
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
    'articles'
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
