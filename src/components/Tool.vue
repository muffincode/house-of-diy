<template>
  <article class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="imgUrl" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title is-4">{{ name }}</p>
        <p class="subtitle is-6">
          {{ availability }}
          <span v-if="available">🟢</span>
          <span v-else>🔴</span>
        </p>
        <p>{{ description }}</p>

        <button class="button" :class="{ 'is-success': available }" :disabled="!available">
          Buy for {{ price }}
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { createClient } from 'pexels'
const client = createClient('TAU91VsC78Fc7jXwghtIHI46WkdPKLk1r3NivySGJQJrDeq4VMd8MoxN')

export default {
  name: 'ToolElement',
  data: function () {
    return {
      imgUrl: 'https://bulma.io/images/placeholders/1280x960.png'
    }
  },
  props: {
    name: String,
    price: String,
    reference: String,
    availability: String,
    description: String
  },
  mounted() {
    client.photos.search({ query: this.name, per_page: 1 }).then(photos => {
      this.imgUrl = photos.photos[0].src.medium
    })
  },
  computed: {
    available() { return this.availability == 'In stock' }
  }

}
</script>

<style scoped lang="scss">
article {
  transition: all 200ms linear;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 40px rgba(0,0,0,0.2);
  }

}
</style>
