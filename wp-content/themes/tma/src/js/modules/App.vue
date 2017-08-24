<template>
  <div class="wrapper">
    <div class="banner-bg">
      <AppHeader></AppHeader>
      <Banner></Banner>
    </div>
    <Posts></Posts>
  </div>
</template>

<script>
  import Posts from './Posts.vue'
  import Header from './Header.vue'
  import Banner from './Banner.vue'

  export default {
    components : {
      Posts: Posts,
      AppHeader: Header,
      Banner: Banner
    }
  }
</script>