<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-3">
        Welcome to the <b>House of DIY</b> 👋
      </h1>
      <p class="subtitle">
        🛠 The tools <b>data</b> has been generated with ChatGPT.<br>
        📷 The <b>images</b> are drawn from the Pexels API (with the tools names as query).
      </p>

      <hr>

      <div class="box">
        <h3 class="title is-5">Filters</h3>
        <div class="field is-grouped">
          <button class="control button is-primary" :class="{ 'is-light': !filtering }" @click="toggleFilter()">
            See only available products
          </button>
          <div class="control">
            <input class="input" type="text" placeholder="Search for..." v-model="query">
          </div>
        </div>
      </div>


      <div class="gallery">
        <ToolElement v-for="t in filteredArray" :key="t.reference" 
        :name="t.name" :price="t.price"
          :reference="t.reference" :availability="t.availability" :description="t.description" :category="t.category" />

      </div>
      <div v-if="filteredArray.length == 0">
        <div class="notification is-danger">
          <h4 class="title is-5">Screw it! 😣</h4>
          <p>We're so sorry, but your search didn't match any of our products.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import tools from '../assets/data.js'

// @ is an alias to /src
import ToolElement from '@/components/Tool.vue'

export default {
  name: 'HomeView',
  components: {
    ToolElement
  },
  data: function () {
    return {
      db: tools,
      filtering: false,
      query: ''
    }
  },
  methods: {
    toggleFilter() {
      this.filtering = !this.filtering
    }
  },
  computed: {
    filteredArray() {
      let filtered = this.db
      if (this.filtering) {
        filtered = filtered.filter(e => e.availability == 'In stock')
      }
      if (this.query != '') {
        filtered = filtered.filter(e => e.name.toUpperCase().includes(this.query.toUpperCase()) || e.category.toUpperCase().includes(this.query.toUpperCase()))
      }
      return filtered
    }
  }
}
</script>

<style scoped lang="scss">
@media (min-width: 1281px) {
  .section {
    width: 60%;
    margin: auto;

    .gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }
  }
}
@media (min-width: 481px) and (max-width: 1280px) {
  .section {
    width: 80%;
    margin: auto;

    .gallery {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }
}
@media (min-width: 320px) and (max-width: 480px) {
  
.field.is-grouped {
  display: block;
  .control:first-child{
    margin-bottom: 1em;
  }
}

.gallery {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 30px;
    }
  
}
</style>