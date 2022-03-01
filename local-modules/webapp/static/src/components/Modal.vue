<script>
export default {
  name: "Modal",
  props:{
    packages:{
      type: Array,
      required:true,
    },
    id_item: {
      type: Number,
      required:true,
    }
  },       
  methods: {
            addQuantity(id, pack) {
                this.$store.dispatch("cart.addItem", {id, pack, qt: 1})
            },

            rmQuantity(id, pack) {
                this.$store.dispatch("cart.deleteItem", {id, pack, qt: 1})
            },

            setQuantity(id, pack, qt) {
                this.$store.dispatch("cart.setItemCart", {id, pack, qt})
            },
            showPackage(quantity){
                var res ="";
                if(quantity<1000){
                  res = quantity + "g"
                }else{
                  res = ""+quantity/1000 +"kg";
                }
                return res;
                },
    
        },
};
</script>

<template>

      <table>
        <thead>
          <tr>
            <th>
              <h2>{{$t("packages.quantity")}}</h2>
            </th>
            
            <th>
                <h2>{{$t("packages.price")}}</h2>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class="ligne" v-for="packageI in packages" :key="packageI.id">

            <td  class="quantityValue">
              <h3>{{showPackage(packageI.quantity)}}</h3>
            </td>

            <td  class="priceValue">
              <h3>{{packageI.price}} CHF</h3>
            </td>

            <td class="buttonsValue" >
              <span id="buttonList" class="field has-addons">

                <span class="control">
                  <button id="boutonMoins" class="button is-primary is-rounded" @click="rmQuantity(id_item, packageI.quantity)">
                    <span class="material-icons">remove</span>
                  </button>
                </span>
                
                <span id="inputNb" class="control">
                  <input id="inputPopup" type="number"
                  class="input is-primary"
                  v-model="packageI.quantity_cart"
                  v-on:keypress.enter="setQuantity(id_item, packageI.quantity,packageI.quantity_cart)">

                </span>

                <span class="control">
                  <button id="boutonPlus" class="button is-primary is-rounded" @click="addQuantity(id_item,packageI.quantity)">
                    <span class="material-icons">add</span>
                  </button>
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
  
</template>

<style>

  #boutonPlus,#boutonMoins{
    width: 15px !important;
  }

  .buttonsValue{
    width: fit-content !important;
  }

  .quantityValue,.priceValue{
    width: 20%;
  }

  input{
    min-width: 35px;
    text-align: center;
  }

  input[type=number] {
  -moz-appearance: textfield;
}
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

  tr{
    width: fit-content !important;
  }

  table{
    width: fit-content !important;
  }

</style>