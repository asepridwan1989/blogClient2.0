<template>
  <div class="container" style="margin-top:50px">
    <div style="text-align:center">
      <h1 style="font-family: 'Shrikhand', cursive;">welcome to blogger app</h1>
    </div>
    <br><br>
    <div class="container">
      <div class="row">
        <div class="col">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Login</a>
              <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Register</a>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <div class="card">
                <div class="card-header">
                  Login first if you have an account
                </div>
                <div class="card-body">
                  <div class="card">
                    <div class="card-body">
                      <form>
                        <p style="color:red">{{errorLog}}</p>
                        <div class="form-group">
                          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailLog">
                        </div>
                        <div class="form-group">
                          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="passwordLog">
                        </div>
                        <p style="text-align: justify"><button class="btn btn-primary" @click="login">Login</button></p>                    
                      </form>
                    </div>
                  </div> 
                  <br>
                  <p>--Or you can log in with your social media--</p>                
                  <div class="card">
                    <div class="card-body">
                      <button @click="loginfb()" class="btn btn-info">Login with Facebook</button>
                      <br><br>
                      <button id="github-button" class="btn-github" style="cursor: pointer" @click='loginGithub'>
                        <i class="fa fa-github"></i> Sign in with Github
                      </button>
                      <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                      </g-signin-button>
                      <!-- <a type="button" class="btn" name="button" @click='steamSignIn'>Sign In with Steam</a> -->
                    </div>
                  </div> 
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div class="card">
                <div class="card-header">
                  Register first if you don't have an account
                </div>
                <div class="card-body">
                  <div class="card">
                    <div class="card-body">
                      <form>
                        <div class="form-group">
                          <input type="text" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter your full name" v-model="nameReg">
                        </div>
                        <div class="form-group">
                          <p style="color:red">{{error.mail}}</p>
                          <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailReg">
                        </div>
                        <div class="form-group">
                          <p style="color:red">{{error.pass}}</p>
                          <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" v-model="passwordReg">
                        </div>
                        <p style="text-align: justify"><button class="btn btn-primary" @click="register">Register</button></p>                    
                      </form>
                    </div>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'home',
  data: function () {
    return {
      nameReg: '',
      emailReg: '',
      passwordReg: '',
      emailLog: '',
      passwordLog: '',
      googleSignInParams: {
        client_id: '169887872962-c4gse03311mkdv5n2g3qdst6o0gikjp0.apps.googleusercontent.com'
      }
    }
  },
  created: function () {
    let tokenStore = localStorage.getItem('blog-token')
    if(tokenStore){
      this.$router.push({'path' : '/blog'})
    }
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939"
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '272709716803429',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      })
    }
  },
  computed: {
    ...mapState([
      'errorLog', 'error', 'statLog'
    ])
  },
  components: {
  },
  watch : {
    statLog () {
      // this.status = this.$store.state.status
      if (this.statLog == true) {
        this.$router.push({'path' : '/blog'})
      }
    }
  },
  methods: {
    register () {
      let body = {
        name: this.nameReg,
        email: this.emailReg,
        password: this.passwordReg
      }
      this.$store.dispatch('signup', body)
    },
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      let body = {
        name: profile.getName(),
        email: profile.getEmail(),
        password: profile.getId()+profile.getName()
      }
      this.$store.dispatch('fbnGoogSignin', body)
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    steamSignIn(){
      this.$store.dispatch('signinSteam')               
    },
    login () {
      let body = {
        email: this.emailLog,
        password: this.passwordLog
      }
      this.$store.dispatch('signin', body)
      .then(()=>{
        this.$router.push({'path' : '/blog'})
      })
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile()
    },
    loginfb () {
      window.FB.login((response) => {
        if (response.status === 'connected') {
          this.testAPI(this.$store.dispatch)
        } else {
          alert('please login')
        }
      })
    },
    loginGithub () {
      this.$store.dispatch('signinGithub')
      .then(()=>{
        this.$router.push({'path' : '/blog'})
      })
    },
    testAPI (cb) {
      FB.api('/me', {fields: ['name','email','picture']}, function(response) {
      let idFB = response.id
      this.nameReg = response.name
      this.emailReg = `${idFB}@facebook.com`
      this. passwordReg = `${idFB}@facebook.com`
      let body = {
        name: this.nameReg,
        email: this.emailReg,
        password: this.passwordReg
      }
      cb('fbnGoogSignin', body)
    });
    }
  }
  
}
</script>

<style scoped>

</style>