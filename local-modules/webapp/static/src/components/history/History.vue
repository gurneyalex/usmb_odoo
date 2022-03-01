<template>
  <app-layout>
    <template v-slot:header>
      <history-bar />
    </template>

    <template v-slot:content>
      <HistoryList />
    </template>
  </app-layout>
</template>

<script>
import AppLayout from "@/components/layout/AppLayout";
import HistoryList from "@/components/history/HistoryList";
import HistoryBar from "@/components/history/HistoryBar";
export default {
  name: "History",
  components: {HistoryBar, HistoryList, AppLayout},
}
</script>

<style scoped>

</style>