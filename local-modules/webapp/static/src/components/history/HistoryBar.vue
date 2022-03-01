<template>
    <menu-button />
    <div class="bar">
      <span v-bind:class="'tag is-large '+ (mq.phone ? 'phone' : '')">
            {{ $t("history.history") }}
        </span>
    </div>
</template>

<script setup>
import { useMq } from "vue3-mq"


const mq = useMq()
</script>

<script>
import MenuButton from "@/components/layout/MenuButton"

export default {
  inject: ["mq"],
  name: "HistoryBar",
  components: {MenuButton},
}
</script>

<style scoped>
.tag {
  background-color: #F3970C;
  border-color: #B4710C;
  color: black;
}
.phone{
  width: 100%;
  height: 100%;
}
.bar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>