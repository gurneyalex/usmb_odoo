<template>
    <div class="wrapper">
        <span class="material-icons-outlined">
            person
        </span>

        <span class="material-icons-outlined">
            shopping_cart
        </span>

        <span class="material-icons-outlined">
            language
        </span>
    </div>
</template>


<script>
    export default {
        name: "UserBar",
        components: {
        },
    }
</script>


<style scoped>
    .wrapper {
        height: 50px;
        padding: 5px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        gap: 20px;
    }
</style>
