<template>
  <article class="card">
    <div class="overlay has-background-success has-text-primary-light animate__animated" v-if="animateThanks">
      🛒<br>Added to cart
    </div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="imgUrl" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title is-4">{{ name }}</p>
        <span class="tag is-info">{{ category }}</span>

        <p>{{ description }}</p>

        <p class="subtitle is-6">
          {{ availability }}
          <span v-if="available">🟢</span>
          <span v-else>🔴</span>
        </p>

        <div class="buttons">
          <button class="button" :class="{ 'is-info': available }" :disabled="!available"
            @click="() => { goToProduct(reference) }">
            See more
          </button>

          <button class="button" :class="{ 'is-success': available }" :disabled="!available" @click="thanks()">
            Add to cart ({{ price }})
          </button>
        </div>

      </div>
    </div>
  </article>
</template>

<script>
import { useCartStore } from '@/stores/cart'

import { createClient } from 'pexels'
const client = createClient('TAU91VsC78Fc7jXwghtIHI46WkdPKLk1r3NivySGJQJrDeq4VMd8MoxN')

export default {
  name: 'ToolElement',
  data: function () {
    return {
      imgUrl: 'https://bulma.io/images/placeholders/1280x960.png',
      animateThanks: false
    }
  },
  props: {
    name: String,
    price: String,
    reference: String,
    availability: String,
    description: String,
    category: String
  },
  mounted() {
    client.photos.search({ query: this.name, per_page: 1 }).then(photos => {
      this.imgUrl = photos.photos[0].src.medium
    })
  },
  computed: {
    available() { return this.availability == 'In stock' }
  },
  methods: {
    thanks() {
      const store = useCartStore()
      store.addProduct({ name: this.name, price: this.price }) 
      this.animateThanks = true
      setTimeout(() => { this.animateThanks = false }, 1500)
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`)
    }
  }

}
</script>

<style scoped lang="scss">
article {
  position: relative;
  transition: all 200ms linear;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
  }

  .title {
    margin-bottom: 0.5em;
  }

  .tag {
    margin-bottom: 1em;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 300%;
    font-weight: 100;
    transition: 2s all linear;
  }

}
</style>
