<template>
    <div class="cart">
        <div class="box" v-if="productsInCart > 0">
            <h4 class="title is-4">Your cart</h4>
            <div class="content">
                <ul>
                    <li v-for="p in cart" :key="p.name">{{ p.name }} - {{ p.price }}</li>
                </ul>
            </div>
            <div class="buttons">
                <button class="button is-primary is-light is-small">Pay (${{ total }})</button>
                <button class="button is-danger is-light is-small" @click="empty">Empty cart</button>
            </div>


        </div>
        <button class="button is-primary is-rounded">
            <div>
                <span class="tag is-danger">
                    {{ productsInCart }}
                </span>
                Panier 🛒
            </div>
        </button>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
    name: 'CartElement',
    computed: {
        productsInCart() {
            const store = useCartStore()
            return store.nbProducts
        },
        cart() {
            const store = useCartStore()
            return store.products
        },
        total() {
            const store = useCartStore()
            return store.total
        }
    },
    methods: {
        empty() {
            const store = useCartStore()
            store.empty()
        }
    }
}
</script>

<style scoped lang="scss">
.cart {
    position: fixed;
    bottom: 20px;
    right: 12.5%;
    z-index: 999;

    >.box {
        position: absolute;
        bottom: 30px;
        width: 250px;
    }
}
</style>