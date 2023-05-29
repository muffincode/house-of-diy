<template>
  <section class="section">
    <div class="container">
      <RouterLink to="/">Back</RouterLink>

      <hr>

      <h2 class="title is-3">
        {{ p.name }}
      </h2>
      <p class="subtitle">
        {{ p.description }}
      </p>

      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, placeat cumque quod, asperiores repudiandae dolorem praesentium perferendis libero eveniet, suscipit eaque vel. Tenetur provident quasi numquam nemo consequuntur voluptas. Itaque!</p>

      <button class="button" :class="{ 'is-success': available }" :disabled="!available" @click="add">
          Buy for {{ p.price }}
        </button>

    </div>
  </section>
</template>

<script>
import tools from '../assets/data.js'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'ProductView',
  components: {
  },
  data: function () {
    return {
      p: {}
    }
  },
  mounted() {
    this.p = tools.find((e) => e.reference == this.$route.params.id)
  },
  computed: {
    available() { return this.p.availability == 'In stock' }
  },
  methods: {
    add() {
      const store = useCartStore()
      store.addProduct({ name: this.p.name, price: this.p.price }) 
    }
  }
}
</script>

<style scoped lang="scss">
@media (min-width: 1281px) {

}
@media (min-width: 481px) and (max-width: 1280px) {

}
@media (min-width: 320px) and (max-width: 480px) {
  
}
</style>