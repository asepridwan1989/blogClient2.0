<template>
  <div>
    <div style="text-align:center" v-if="!loadStat">
      <img src="https://loading.io/spinners/hourglass/lg.sandglass-time-loading-gif.gif" alt="">
      <h1>Please Wait</h1>
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
          <h6 class="card-subtitle mb-2 text-muted">like: {{singArt.like}}</h6>
          <button type="button" class="btn btn-info btn-sm" v-if="singArt.userId._id !== idUser" @click="like">like</button>
          <button type="button" class="btn btn-primary disabled" v-if="singArt.userId._id == idUser" @click="unlike">like</button>
          <br>
          <div style="text-align: justify;" v-html="singArt.content"></div>
        </div>
        <div class="container">
          <h1>Comment</h1>
          <wysiwyg v-model="comment" />
          <br>
          <button type="button" class="btn btn-info btn-sm" @click="postComment">post comment</button>
          <br><br>
          <br>
          <div class="card" style="width: auto; margin-bottom:20px" v-for="(comment, index) in singArt.comments" v-bind:key="index" v-if="loadStat">      
            <div class="card-body">
              <h5 class="card-title">{{comment.user}}</h5>
             <div style="text-align: justify;" v-html="comment.comment"></div>
              <!-- <p style="text-align: justify;" v-html="article.content"></p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'
import swal from 'sweetalert'
export default {
  name: 'Detail',
  data: function () {
    return {
      idUser: localStorage.getItem('blog-id'),
      comment: ''
    }
  },
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
    },
    unlike() {
      swal('you cant like your own post')
    },
    like() {
      let like = this.singArt.like + 1
      let id = this.$route.params.id
      let body = {
              like
          }
      let headers = {
            token : window.localStorage["blog-token"]
          }
      let payload = {
        id,
        body,
        headers
      }
      this.$store.dispatch('updateLike', payload)      
    },
    postComment() {
      let idPage = this.$route.params.id
      let body = {
        user: window.localStorage["blog-name"],
        comment: this.comment
      }
      let headers = {
        token : window.localStorage["blog-token"]
      }
      let  id = this.$route.params.id
      let payload = {
        id,
        body,
        headers
      }
      this.$store.dispatch('uploadComment', payload)
    }
  }
}
</script>

<style>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
