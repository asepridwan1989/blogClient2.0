import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorLog: '',
    error:'',
    articles: [],
    user: '',
    artProf:[],
    singArt: '',
    messagewarn: ''
  },
  mutations: {
    deleteArt (state, payload) {
      let art = state.articles
      let post = state.artProf
      const artdel = art.filter(data => data._id == payload);
      const posttdel = post.filter(data => data._id == payload);
      console.log(artdel, '+', posttdel)
      state.articles.splice(state.articles.indexOf(artdel[0]), 1);
      state.artProf.splice(state.artProf.indexOf(posttdel[0]), 1);
      console.log('panjang nyaaaa,....',state.artProf.length)
      if(state.artProf.length ==0){
        state.artProf = undefined
      }
      console.log('paihfj[oaihf[oah',state.artProf)
    },
    setError (state, payload) {
      console.log('commit', payload)
      state.error = payload
    },
    setWarn (state, payload) {
      state.messagewarn = payload
    },
    setErrorLog (state, payload) {
      console.log('commit', payload)
      state.errorLog = payload
    },
    setArticles (state, payload) {
      state.artProf = payload
    },
    setArticlesHome (state, payload) {
      state.articles = payload
    },
    setOneArticle (state, payload) {
      state.singArt = payload
    },
    pushData (state, payload) {
      console.log('ngepush euuuy')
      state.articles.push(payload)
      if(state.artProf == undefined){
        state.artProf = []
      }
      state.artProf.push(payload)
    }
  },
  actions: {
    signup: function (context, payload) {
      console.log(payload)
      axios.post('http://localhost:3000/users/signup', payload)
        .then(response => {
          console.log('success', response)
          swal('successfuly registered')
        })
        .catch(function (err) {
          console.log(err.response.data.message)
          let errorMsg = err.response.data.message
          context.commit('setError', errorMsg)
        })
    },
    signin: function (context, payload) {
      axios.post('http://localhost:3000/users/signin', payload)
        .then(response => {
          console.log('success', response.data)
          let token = response.data.token
          let userblog = response.data.dataUser.name
          localStorage.setItem('blog-name', userblog)
          localStorage.setItem('blog-token', token)
          window.location.reload(true)
        })
        .catch(function (err) {
          console.log(err.response.data.message)
          let errorMsg = err.response.data.message
          context.commit('setErrorLog', errorMsg)
        })
    },
    fbSignin: function (context, payload) {
      axios.post('http://localhost:3000/users/signinFB', payload)
      .then(response => {
        console.log('success', response.data)
        let token = response.data.token
        let userblog = response.data.dataUser.name
        localStorage.setItem('blog-name', userblog)
        localStorage.setItem('blog-token', token)
        swal('successfuly logged in')
        window.location.reload(true)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    signinSteam: function (context, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/steam/authenticate'
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
          console.log(body)
          axios.post('http://localhost:3000/users/signinFB', body)
          .then(response => {
            console.log('success', response.data)
            let token = response.data.token
            let userblog = response.data.dataUser.name
            localStorage.setItem('blog-name', userblog)
            localStorage.setItem('blog-token', token)
            window.location.reload(true)
          })
          .catch(function (err) {
            console.log(err)
          })
        })
      })
    },
    upload: function (context, payload) {
      let headers = payload.headers
      axios.post('http://localhost:3000/articles', payload.body, {headers})
      .then(response => {
        console.log('success ieu datana', response.data)
        context.commit('pushData', response.data.data)
        swal('successfuly created new article')
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getSingpos: function (context, payload) {
      console.log('udinnnnnnnnn',payload)
      axios.get('http://localhost:3000/articles/profile', {headers: payload})
      .then(response => {
        console.log('success', response.data)
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
      console.log('id yang mau dikirim',payload.id)
      axios.delete(`http://localhost:3000/articles/${payload.id}`, {headers: payload.headers})
        .then( response => {
          context.commit('deleteArt', payload.id)
          swal('successfuly deleted article')
        })
        .catch( err => {
            // this.error = err.response.data.message
        })
    },
    getAllPost: function (context, payload) {
      console.log('ke home action')
      axios.get('http://localhost:3000/articles/home')
      .then(response => {
        console.log('success', response.data)
        context.commit('setArticlesHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    updateArticle: function (context, payload) {
      console.log(payload)
      axios.put(`http://localhost:3000/articles/${payload.id}`, payload.body, {headers: payload.headers})
      .then(response => {
        console.log('success', response.data)
        swal('successfuly updated article') 
        // context.commit('setArticlesHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    search: function (context, payload) {
      axios.get(`http://localhost:3000/articles/search?title=${payload}`)
      .then(response => {
        console.log('success', response.data)
        context.commit('setArticlesHome', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getOneArticle (context, payload) {
      axios.get(`http://localhost:3000/articles/detail/${payload}`)
      .then(response => {
        console.log('success', response.data)
        context.commit('setOneArticle', response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }
})
