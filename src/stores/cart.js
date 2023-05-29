import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: []
    }),
    getters: {
        nbProducts: (state) => state.products.length,
        total: (state) => 
             state.products.reduce((sum, c) => sum + parseInt(c.price.slice(1)), 0)
    },
    actions: {
        addProduct(p) {
            this.products.unshift(p)
        },
        empty() {
            this.products = []
        }
    },
})