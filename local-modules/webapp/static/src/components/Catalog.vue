<template>
  <app-layout>
    <template v-slot:header>
      <catalog-search-bar />
    </template>

    <template v-slot:menu>
      <catalog-side-menu />
    </template>

    <template v-slot:content>
      <div class="catalog" @scroll="onScroll">
        <div v-if="products.length > 0">
          <div
            v-bind:class="
              'products ' +
              (mq.tablet || mq.other ? 'products-tablet' : 'products-phone')
            "
          >
            <card-image
              v-for="product in products"
              :key="product.id"
              :name="product.name"
              :image="product.image"
              :origin="product.origin"
              :pricePerKg="product.pricePerKg"
              :seasonal="product.seasonal"
              :discount="product.discount"
              :favorite="isFavorite(product.id)"
              :packages="getPackages(product)"
              :id_item="product.id"
            />
          </div>
        </div>

        <div v-else>
          <p style="text-align: center">Aucun résultat trouvé...</p>
        </div>

        <div v-if="loading">
          <progress class="progress is-large is-info" max="100">60%</progress>
        </div>
      </div>
    </template>
  </app-layout>
</template>


<script setup>
import { useMq } from "vue3-mq";

const mq = useMq();
</script>


<script>
import AppLayout from "./layout/AppLayout.vue";
import CatalogSearchBar from "./CatalogSearchBar.vue";
import CatalogSideMenu from "./catalog/CatalogSideMenu.vue";
import CardImage from "./CardImage.vue";
import { mapState } from "vuex";

export default {
  inject: ["mq"],
  name: "Catalog",

  components: {
    AppLayout,
    CatalogSearchBar,
    CatalogSideMenu,
    CardImage,
  },

  computed: mapState({
    loading: (state) => state.catalog.loading,
    products: (state) => state.catalog.products,
  }),
  methods: {
    onScroll(e) {
      const el = e.target;
      const store = this.$store.state;

      if (
        store.catalog.lastPageLoaded < store.catalog.totalPages &&
        Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight
      )
        this.$store.dispatch("catalog.fetchProducts");
    },
    getPackages(product) {
      var data = [];
      for (var i = 0; i < product.packages.length; i++) {
        var quant = product.packages[i].quantity;
        var priceI = product.packages[i].price;
        var pack = {
          quantity: quant,
          quantity_cart: this.findQuantityCart(product, quant),
          price: priceI,
        };
        data.push(pack);
      }
      return data;
    },
    isFavorite(idProd){
      var fav = this.$store.state.user.favori_list;
      return fav.filter(el => el == idProd).length == 1
    },
    findQuantityCart(product, packag) {
      var qt = 0;
      var cart = this.$store.state.cart.data;
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id && cart[i].package === packag) {
          qt = cart[i].quantity;
          break;
        }
      }
      return qt;
    },
  },

  mounted() {
    // Fetch the first page of the catalog
    this.$store.dispatch("catalog.fetchProducts");
  },
};
</script>


<style scoped>
.catalog {
  width: 100%;
  height: 100%;

  overflow-y: scroll;
}

.products {
  display: grid;
  gap: 2vw;
}

.products-phone {
  grid-template-columns: 1fr;
}

.products-tablet {
  grid-template-columns: 1fr 1fr;
}
</style>
