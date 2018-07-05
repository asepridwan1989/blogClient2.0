import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorLog: '',
    error:'',
    articles: '',
    user: '',
    artProf:'',
    singArt: '',
    messagewarn: '',
    statLog: '',
    titlesing: 'default',
    contentsing:'default',
    loadStat:false
  },
  mutations: {
    deleteArt (state, payload) {
      let art = state.articles
      let post = state.artProf
      const artdel = art.filter(data => data._id == payload);
      const posttdel = post.filter(data => data._id == payload);
      state.articles.splice(state.articles.indexOf(artdel[0]), 1);
      state.artProf.splice(state.artProf.indexOf(posttdel[0]), 1);
      if(state.artProf.length ==0){
        state.artProf = undefined
      }
    },
    setLoadStat(state, payload) {
      state.loadStat = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setStatLog (state, payload) {
      state.statLog = payload
    },
    setWarn (state, payload) {
      state.messagewarn = payload
    },
    setErrorLog (state, payload) {
      state.errorLog = payload
    },
    setArticles (state, payload) {
      state.artProf = payload
      state.loadStat = true
    },
    setArticlesHome (state, payload) {
      state.articles = payload
      state.loadStat = true
    },
    setSingArticle (state, payload) {
      state.singArt = payload
    },
    setComments (state, payload) {
      state.singArt.comments = payload
    },
    setLike (state) {
      state.singArt.like = state.singArt.like + 1 
    },
    setOneArticle (state, payload) {
      state.singArt = payload
      state.titlesing = payload.title
      state.contentsing = payload.content
      state.loadStat = true
    },
    setStatSing (state, payload) {
      state.titlesing = payload
    },
    pushData (state, payload) {     
      if(state.artProf == undefined){
        state.artProf = []
      }
      if(state.articles == undefined){
        state.articles = []
      }
      payload.userId = {name:localStorage.getItem('blog-name')}
      state.artProf.push(payload)
      state.articles.push(payload)
    }
  },
  actions: {
    signup: function (context, payload) {
      axios.post('http://35.240.160.136/users/signup', payload)
        .then(response => {
          swal('successfuly registered')
        })
        .catch(function (err) {
          let errorMsg = err.response.data.message
          context.commit('setError', errorMsg)
        })
    },
    signin: function (context, payload) {
      axios.post('http://35.240.160.136/users/signin', payload)
        .then(response => {
          let token = response.data.token
          let userblog = response.data.dataUser.name
          let id = response.data.dataUser._id
          localStorage.setItem('blog-id', id)
          localStorage.setItem('blog-name', userblog)
          localStorage.setItem('blog-token', token)
          context.commit('setStatLog', true)
        })
        .catch(function (err) {
          let errorMsg = err.response.data.message
          context.commit('setErrorLog', errorMsg)
        })
    },
    fbnGoogSignin: function (context, payload) {
      axios.post('http://35.240.160.136/users/signinFB', payload)
      .then(response => {
        let token = response.data.token
        let userblog = response.data.dataUser.name
        let id = response.data.dataUser._id
        localStorage.setItem('blog-id', id)
        localStorage.setItem('blog-name', userblog)
        localStorage.setItem('blog-token', token)
        context.commit('setStatLog', true)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    signinSteam: function (context, payload) {
      axios({
        method: 'get',
        url: 'http://35.240.160.136/users/steam/authenticate'
      }).then(response => {

        var myWindow = window.open(response.data, "myWindow", "width=500, height=700");
        // setTimeout(function(){ myWindow.close() }, 10000);
        // myWindow.close()
      }).catch(err => {
        console.log(err);
      })
    },
    signinGithub: function (context, payload) {
      OAuth.initialize('M4L8E9dVTfx5qS1IWslOYc0gx_c')
      OAuth.popup('github').then((github) => {
        github.me().then((data) => {
          const body = {
            name: data.alias,
            email: data.email,
            password: data.id + data.alias
          }
          axios.post('http://35.240.160.136/users/signinFB', body)
          .then(response => {
            let token = response.data.token
            let userblog = response.data.dataUser.name
            let id = response.data.dataUser._id
            localStorage.setItem('blog-id', id)
            localStorage.setItem('blog-name', userblog)
            localStorage.setItem('blog-token', token)
            context.commit('setStatLog', true)
          })
          .catch(function (err) {
            console.log(err)
          })
        })
      })
    },    
    upload: function (context, payload) {
      let headers = payload.headers
      axios.post('http://35.240.160.136/articles', payload.body, {headers})
      .then(response => {
        context.commit('pushData', response.data.data)
        swal('successfuly created new article')
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getSingpos: function (context, payload) {
      axios.get('http://35.240.160.136/articles/profile', {headers: payload})
      .then(response => {
        if(response.data.message == 'you dont have any article'){
          context.commit('setWarn', response.data.message)
        }
        context.commit('setArticles', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    deleteArticle: function (context, payload) {
      axios.delete(`http://35.240.160.136/articles/${payload.id}`, {headers: payload.headers})
        .then( response => {
          context.commit('deleteArt', payload.id)
          swal('successfuly deleted article')
          this.$router.push({'path' : '/blog'})
        })
        .catch( err => {
            // this.error = err.response.data.message
        })
    },
    getAllPost: function (context) {
      axios.get('http://35.240.160.136/articles/home')
      .then(response => {
        context.commit('setArticlesHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    updateArticle: function (context, payload) {
      axios.put(`http://35.240.160.136/articles/${payload.id}`, payload.body, {headers: payload.headers})
      .then(response => {
        context.commit('setStatSing', 'default')
        swal('successfuly updated article') 
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    search: function (context, payload) {
      axios.get(`http://35.240.160.136/articles/search?title=${payload}`)
      .then(response => {
        context.commit('setArticlesHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getOneArticle (context, payload) {
      axios.get(`http://35.240.160.136/articles/view/${payload}`)
      .then(response => {
        context.commit('setOneArticle', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    updateLike (context, payload) {
      axios.put(`http://35.240.160.136/articles/like/${payload.id}`, payload.body, {headers: payload.headers})
      .then(response => {
        context.commit('setLike')
        swal('successfuly like article') 
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    makeStatLoad (context, payload) {
      context.commit('setLoadStat', payload)
    },
    uploadComment: function (context, payload) {
      let headers = payload.headers
      axios.put(`http://35.240.160.136/articles/add-comment/${payload.id}`, payload.body, {headers})
      .then(() => {
        axios.get(`http://35.240.160.136/articles/view/${payload.id}`)
        .then(response => {
          context.commit('setOneArticle', response.data.data)
          swal('successfuly submit comment')
        })
      })
      .catch(function (err) {
        console.log(err)
      })
    },
  }
})
