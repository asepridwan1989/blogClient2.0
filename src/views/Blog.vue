<template>
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Timeline</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-contact-tab" role="tab" href="#" @click="logout">Logout</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <Timeline></Timeline>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <Profile></Profile>
      </div>
      <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">abraham</div>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile'
import Timeline from '../components/Timeline'
export default {
  name: 'Blog',
  components: {
    Profile,
    Timeline
  },
  methods: {
    logout () {
      localStorage.removeItem('blog-token')
      window.location.reload(true);
    }
  },
  created () {
    let headers = {
        token : window.localStorage["blog-token"]
      }
    this.$store.dispatch('getSingpos', headers)
    this.$store.dispatch('getAllPost')
  },
}
</script>

<style>

</style>