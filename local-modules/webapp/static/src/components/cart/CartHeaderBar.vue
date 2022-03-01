<template>
    <menu-button />

    <span class="tag bar-element">
        {{ $t("cart.total") }} : {{cart.total}} CHF
    </span>

    <button class="button bar-element">
        {{ $t("cart.buy")}}
    </button>
</template>


<script>
    import { mapState } from "vuex"
    import MenuButton from "../layout/MenuButton.vue"


    export default {
        name: "CartHeaderBar",

        components: {
            MenuButton,
        },

        computed: mapState({
            cart: state => state.cart,
        }),

        mounted() {
            this.$store.dispatch("cart.fetchCart")
        },
    }
</script>


<style scoped>
    .button {
        background-color: #D2FFC3;
        border-color: #20ec65;
    }

    .tag {
        background-color: #F3970C;
        border-color: #B4710C;
        color: black;
    }

    .bar-element {
        height: 80%;
    }
</style>
