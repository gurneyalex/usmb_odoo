<template>
  <div class="list-element">
    <div class="empty_msg" v-if="cart.data.length == 0">
      {{ $t("cart.empty_cart") }}
    </div>
    <div
      v-bind:class="
        'element ' +
        (mq.tablet || mq.other ? 'element-tablet' : 'element-phone')
      "
      v-for="element in cart.data"
      :key="element.id"
    >
      <cart-element
        v-bind:class="
          'product ' +
          (mq.tablet || mq.other ? 'product-tablet' : 'product-phone')
        "
        :image="element.image"
        :name="element.name"
        :quantity="element.quantity"
        :elementPackage="element.package"
        :pricePerKg="element.price"
      />

      <div
        v-bind:class="
          'field has-addons add-tool ' +
          (mq.tablet || mq.other ? 'add-tool-tablet' : 'add-tool-phone')
        "
      >
        <span class="control">
          <button
            id="add"
            v-bind:class="
              'is-primary is-rounded button' +
              (mq.tablet || mq.other ? ' ' : ' phone')
            "
            @click="rmQuantity(element.id, element.package)"
          >
            <span class="material-icons-outlined"> remove </span>
          </button>
        </span>

        <input
          v-bind:class="
            'control tag' + (mq.tablet || mq.other ? ' ' : '-phone')
          "
          v-model="element.quantity"
          v-on:keypress.enter="
            setQuantity(element.id, element.package, element.quantity)
          "
        />

        <span class="control">
          <button
            v-bind:class="
              'is-primary is-rounded button' +
              (mq.tablet || mq.other ? ' ' : ' phone')
            "
            @click="addQuantity(element.id, element.package)"
          >
            <span class="material-icons-outlined"> add </span>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useMq } from "vue3-mq";

const mq = useMq();
</script>


<script>
import { mapState } from "vuex";
import CartElement from "./CartElement.vue";

export default {
  inject: ["mq"],
  name: "CartCatalog",

  components: {
    CartElement,
  },

  computed: mapState({
    cart: (state) => state.cart,
  }),

  mounted() {
    this.$store.dispatch("cart.fetchCart");
  },

  methods: {
    addQuantity(id, pack) {
      this.$store.dispatch("cart.addItem", { id, pack, qt: 1 });
    },

    rmQuantity(id, pack) {
      this.$store.dispatch("cart.deleteItem", { id, pack, qt: 1 });
    },

    setQuantity(id, pack, qt) {
      this.$store.dispatch("cart.setItemCart", { id, pack, qt });
    },
  },
};
</script>


<style scoped>
.element {
  background-color: #d2ffc3;
  padding: 20px;
  border-radius: 15px;

  display: grid;
  gap: 1rem;
  justify-content: flex-start;
  align-content: center;

  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
}
.element-phone {
  grid-template-columns: 1fr;
}
.element-tablet {
  grid-template-columns: 1fr 1fr;
}

.product {
  height: 100%;
  width: 100%;
  border-radius: 15px;
}
.add-tool {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.add-tool-phone {
  align-items: center;
  justify-content: center;
}

.button {
  height: 6vw;
  width: 6vw;
}
.tag {
  height: 6vw;
  width: 12vw;
  font-size: 3vw;
  text-align: center;
}
.empty_msg {
  text-align: center;
}
.phone {
  height: 12vw;
  width: 12vw;
}
.tag-phone {
  height: 12vw;
  width: 24vw;
  font-size: 6vw;
}
</style>
