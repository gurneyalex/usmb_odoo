<template>
    <router-view />
</template>


<script>
    export default {
        name: "App",
    }
</script>


<style>
    html {
        overflow: hidden !important;
    }

    body {
        width: 100vw;
        height: 100vh;

        background-color: #EFEDE6;
    }

    #app {
        width: 100%;
        height: 100%;
    }
</style>
