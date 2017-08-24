<template>
  <header id="sticky-header">
    <div class="container" v-for="img in media" :key="img.id" v-if="img.title.rendered === 'arrow'">
      <div class="dash-hidden" id="dash">
        <img :src="img['imgURL']" />
      </div>
      <div class="logo col-6" v-for="img in media"  v-if="img.title.rendered === 'logo'" :key="img.id">
        <img :src="img['imgURL']"/>
      </div>
      <nav class="col-6">
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#facts">Facts</a>
          </li>
          <li>
            <a href="#mission">Mission</a>
          </li>
          <li>
            <a href="#Articles">Articles</a> 
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import sticky from '../lib/zanim/components/sticky'

  export default {
    data() {
      return {
        media: {
          type: [Object]
        },
        zanim: {
          type: [Object]
        },
      }
    },
    
    mounted() {
      // Grab "imgURL" from attachments
      this.$http.get('http://192.168.99.100:32780/wp-json/wp/v2/media').then(response => {
        this.media = response.body
      }, response => {
        // error callback
        console.log('Didnt work')
      })
      window.onload = function() {
        this.zanim = new sticky({
          selector: 'sticky-header',
          direction: 'bottom',
          duration: '.9s',
          easing: 'ease-out'
        }) 
      }
    },
  }
</script>