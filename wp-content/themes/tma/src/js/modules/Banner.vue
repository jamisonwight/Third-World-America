<template>
  <div class="banner">
    <div class="container">
      <div class="row">
        <div class="banner-teepee u-center" v-for="img in imgURL" v-if="img.title.rendered === 'logo-teepee'" :key="img.key">
          <img :src="img['imgURL']">
        </div>
        <div class="banner-heading">
          <h1>Third World America</h1>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        imgURL: {
          type: [Object]
        }
      }
    }, 

    mounted() {
      // Grab "imgURL" from attachments
      this.$http.get('http://192.168.99.100:32780/wp-json/wp/v2/media').then(response => {
        this.imgURL = response.body
      }, response => {
        // error callback
        console.log(response)
      })
    }
  }
</script>