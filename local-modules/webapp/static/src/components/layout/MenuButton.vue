<template>
    <mq-responsive target="phone">
        <button class="button is-medium" v-on:click="openSideMenu()">
            <span class="material-icons">
                menu
            </span>
        </button>
    </mq-responsive>
</template>


<script>
    import { MqResponsive } from "vue3-mq"


    export default {
        name: "MenuButton",

        components: {
            MqResponsive,
        },

        methods: {
            openSideMenu() {
                this.$store.commit("sideMenu.open")
            },
        },
    }
</script>


<style scoped>
</style>
