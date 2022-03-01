<template>

    <div class="empty_msg" v-if="hist.length == 0">{{$t("history.empty_hist")}}</div>
  <div
      class="list"
      v-for="element in hist"
      :key="element.id"
  >

    <div class="element" @click="show_element(element.id)">
      <div class="heading">
      <div class="order">
        {{$t("history.order")}} : {{element.date}}
      </div>

        <div class="tag">
          {{$t("history.total")}} : {{element.price}}
        </div>

        <div>
        <span class="material-icons-outlined">
          arrow_drop_down
        </span>
        </div>

      </div>

       <div v-bind:class="'ordered_item ' + [element.id]" v-for="cart in element.content"

          :key="cart">
        <HistoryElement :name="cart.name" :quantity="cart.quantity" :packag="cart.package" :price="cart.price" />
      </div>



    </div>
   
  </div>
</template>

<script>
import { mapState } from "vuex"
import HistoryElement from "@/components/history/HistoryElement";
export default {
  name: "HistoryList",
  components: {HistoryElement},
  computed: mapState({
    hist: state => state.hist,
  }),
  mounted(){
    this.$store.dispatch("hist.fetchHist")
  },
  methods:{
    show_element(id){
        var el = document.getElementsByClassName(id);
        for(var i = 0 ; i < el.length ; i++){
          el[i].classList.toggle("diplay_block")
        }
    }
  }
}
</script>

<style scoped>
.list{
  width: 100%;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
}
.heading{
  background-color: #D2FFC3;
  border: 2px solid #20ec65;
  padding: 5px;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
}
.element{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ordered_item{
  display:none;
  padding: 5px;
}
.tag {
  background-color: #F3970C;
  border-color: #B4710C;
  color: black;
  margin-right: 10px;
  margin-left: auto;
}

.diplay_block{
  display: block;
}

.empty_msg{
  text-align: center;
}

</style>