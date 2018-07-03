<template>
  <div>
    <h1>{{warning}}</h1>
    <div class="card" style="width: auto; margin-bottom:20px" v-for="(article, index) in artProf" v-bind:key="index">
    <div class="card-body">
      <h5 class="card-title">{{article.title}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">posted at: {{article.createdAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">last update: {{article.updatedAt | moment("MMMM Do YYYY, h:mm:ss")}}</h6>
      <!-- <p style="text-align: justify;">{{article.content}}</p> -->
      <!-- <div>{{{article.content}}}</div> -->
      <!-- <div v-html="article.content" style="margin 30px"></div> -->
      <div class="column has-text-centered">
        <router-link :to="{ name: 'detail', params: { id: article._id }}">view detail</router-link>
        <router-view/>
    </div>
    </div>
    <div class="d-flex flex-row">
      <div class="p-2">
        <div class="wrap">
        <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#update" :data-id="article._id" @click="getDataSing">Edit Article</button>
        <div class="modal" tabindex="-1" role="dialog" id='update'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit article</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>title</p>
                        <input type="text" class="form-control" v-model="title">
                    </div>
                      <div class="container">
                        <p>content</p>
                        <wysiwyg v-model="content"/>
                      </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" :data-id="article._id" @click="updateArticle">submit</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
      <div class="p-2">
        <button @click="deleteArt" :data-id="article._id" class="btn btn-outline-secondary" >delete</button>
      </div>
    </div>   
  </div>
  </div>  
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ArticleProf',
  data: function () {
    return {
      title: '',
      content: '',
      warning: '',
      num : '',
      idArticle:''
      }
  },
  computed: {
    ...mapState([
      'artProf','singArt', 'titlesing', 'contentsing'
    ])
  },
  watch : {
    artProf () {
      if (this.artProf !== undefined) {
        this.warning = ''
      }else{
        this.warning = 'you dont have any article, lets make a new one'
      }
    },
    titlesing () {
      if(this.titlesing != 'default'){
        this.title = this.titlesing
        this.content = this.contentsing
      }
      if (this.titlesing == 'default') {
        let headers = {
            token : window.localStorage["blog-token"]
        }
        this.$store.dispatch('getSingpos', headers)
        this.$store.dispatch('getAllPost')
      } 
    }
  },
  methods: {
    getDataSing() {
      let id = event.srcElement.dataset.id
      this.idArticle = id
      let self = this
      console.log(id)
      this.$store.dispatch('getOneArticle', id)
    },
    deleteArt() {
      var r = confirm("delete article!");
      if (r == true) {
        this.godeleteArt()
      }
    },
    godeleteArt () {
      let id = event.srcElement.dataset.id
      let headers = {
            token : window.localStorage["blog-token"]
          }
      let payload = {
        id,
        headers
      }
      this.$store.dispatch('deleteArticle', payload)
      this.$router.push({'path' : '/blog'})
    },
    updatepage (header) {
      this.$store.dispatch('getSingpos', header)
      this.$store.dispatch('getAllPost')
    },
    updateArticle() {
      let id = this.idArticle
      console.log(id)
      let body = {
              title : this.title,
              content : this.content 
          }
      let headers = {
            token : window.localStorage["blog-token"]
          }
      let payload = {
        id,
        body,
        headers
      }
      console.log('payload', payload)
      this.$store.dispatch('updateArticle', payload)      
    }
  }
}
</script>

<style>

</style>
