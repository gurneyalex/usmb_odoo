<template>
    <app-layout>
        <template v-slot:header>
            <cart-header-bar />
        </template>

        <template v-slot:content>
            <cart-catalog />
        </template>
    </app-layout>
</template>


<script>
    import AppLayout from "../layout/AppLayout.vue"
    import CartHeaderBar from "./CartHeaderBar.vue"
    import CartCatalog from "./CartCatalog.vue"


    export default {
        name: "Cart",

        components: {
            AppLayout,
            CartHeaderBar,
            CartCatalog,
        },
    }
</script>


<style scoped>
</style>
