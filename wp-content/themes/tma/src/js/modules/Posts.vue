<template>
  <div class="section-posts full-width">

    <!-- Post Filter -->
    <div class="post-filter" v-if="showFilter == true">
      <div class="container">
        <div class="post-filter-name">
          <h4>Filter by Name</h4>
          <input type="text" name="nameFilter" v-on:keyup="checkPosts" v-model="postFilter">
        </div>
        <div class="post-filter-category">
          <h4>Filter By Category</h4>
          <div class="category--radio" v-for="cat in categories" v-if="cat.name != 'Uncategorized' | cat.name == null" :key="cat.id">    
            <label>
              <!-- If radio button is checked set name filter value to null -->
              <input type="radio" v-on:change="removeValue" :value="cat['id']" v-model="postFilter">
              <div class="radio__icon"></div>
              <span>{{ cat.name }}</span> 
            </label>
          </div>
        </div>
      </div>
    </div>

    <section class="section-post-list full-width">
      <!-- Post List -->
      <div class="container">
        <h1>Articles</h1>

        <!--  Button for filter  -->
        <!--  Add Icon  -->
        <button v-on:click="openFilter" v-if="filterBtnOpen">v</button>
        <button v-on:click="closeFilter" v-else>^</button>

        <div class="post-list row">
          <!-- Use FilterBy function similiar to vuejs v1 filters -->
          <article v-for="post in filterBy(posts, postFilter, 'title', 'categories')" :key="post.id">
            <div class="post-content">
              <img v-bind:src="post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['300x180'].source_url" >
              <h3>{{ post.title.rendered }}</h3>
              <div class="post-content--body" v-html="post.excerpt.rendered"></div>
              <small class="post-categories" v-for="category in post['category_list']" :key="category.id">
                {{ category.name }}
              </small> 
            </div>
          </article>
        </div>
        <!-- If filter does not find a match display a message -->
        <div v-if="noPosts">
          <h3>Sorry, could not find any articles.</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    data() {
      return {
        posts: {
          type: [Object],
        },
        categories: {
          type: [Object]
        },
        articles: document.getElementsByTagName('article'),
        noPosts: false,
        postFilter: '',
        showFilter: false,
        filterBtnOpen: true,
      }
    },

    methods: {
      checkPosts: _.debounce(function() {
        if (this.articles.length > 0) {
          this.noPosts = false
        } 
        if (this.articles.length === 0) {
          this.noPosts = true
        }
      }, 1),
      removeValue() {
        let query = document.querySelector('.post-filter-name input[name="nameFilter"]')
        setTimeout(function(){
          return query.value = null
        }, 1)

      },
      openFilter() {
         this.showFilter = true
         this.filterBtnOpen = false
      },
      closeFilter() {
        this.showFilter = false
        this.filterBtnOpen = true
      }
    },

    mounted() {
      // Grab "posts" from the API
      this.$http.get('http://192.168.99.100:32780/wp-json/wp/v2/posts?_embed').then(response => {
        this.posts = response.body
      }, response => {
        // error callback
        console.log('Didnt work')
      })

      // Grab "categories" from the API
      this.$http.get('http://192.168.99.100:32780/wp-json/wp/v2/categories').then(response => {
        this.categories = response.body
      }, response => {
        console.log(response)
      })
    }
  }
</script>
