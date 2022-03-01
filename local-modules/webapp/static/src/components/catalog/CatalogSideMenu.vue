<template>
  <h4 class="is-size-4 section-title">{{ $t("sidemenu.filters") }}</h4>

  <div class="side-menu-bar">
    <div
      :class="'button ' + (seasonal ? 'selected' : 'not-selected')"
      @click="onSeasonalClick"
    >
      {{ $t("catalog.seasonal") }}
    </div>

    <p class="menu-label">{{ $t("sidemenu.discount") }}</p>
    <div class="select">
      <select id="discount" @change="onDiscountChange">
        <option :selected="discount === 0" value="0">
          {{ $t("sidemenu.filtersPlaceHolder") }}
        </option>
        <option :selected="discount === 20" value="20">20%</option>
        <option :selected="discount === 40" value="40">40%</option>
        <option :selected="discount === 60" value="60">60%</option>
        <option :selected="discount === 80" value="80">80%</option>
      </select>
    </div>

    <div class="menu-label">
      {{ $t("sidemenu.origin") }}
      <input
        class="search-input input"
        type="text"
        :placeholder="$t('catalog.hintResearch')"
        :value="origin"
        @change="onOriginChange"
      />
    </div>
    <div class="menu-label">{{ $t("sidemenu.category") }}</div>
    <div class="select">
      <select id="category" @change="onCategoryChange">
        <option :selected="category === ''" value="">
          {{ $t("sidemenu.allCategories") }}
        </option>
        <option :selected="category === 'citrus'" value="citrus">citrus</option>
        <option :selected="category === 'tuber'" value="tuber">tuber</option>
        <option :selected="category === 'seeds'" value="seeds">seeds</option>
        <option :selected="category === 'leaf'" value="leaf">leaf</option>
        <option :selected="category === 'root'" value="root">root</option>
      </select>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "CatalogSideMenu",

  computed: mapState({
    seasonal: (state) => state.catalog.filters.seasonal,
    origin: (state) => state.catalog.filters.origin,
    discount: (state) => state.catalog.filters.discount,
    category: (state) => state.catalog.filters.category,
  }),

  methods: {
    onSeasonalClick() {
      this.$store.dispatch("catalog.updateFilters", {
        seasonal: !this.seasonal,
      });
    },

    onOriginChange(e) {
      this.$store.dispatch("catalog.updateFilters", { origin: e.target.value });
    },

    show_value() {
      const slider = document.getElementById("discount");
      const output = document.getElementById("valueSlider");
      output.innerHTML = slider.value;
    },

    onDiscountChange(e) {
      this.$store.dispatch("catalog.updateFilters", {
        discount: parseInt(e.target.value),
      });
    },

    onCategoryChange(e) {
      this.$store.dispatch("catalog.updateFilters", {
        category: e.target.value,
      });
    },
  },
};
</script>


<style scoped>
.section-title {
  text-align: center;
  border-top: 1px solid #20ec65;
  border-bottom: 1px solid #20ec65;
}
.side-menu-bar {
  padding-left: 5px;
  padding-right: 5px;
}

.slidecontainer {
  width: 100%;
}

.slider {
  width: 80%;
}
#valueSlider {
  text-align: center;
  width: 20%;
}

.not-selected {
  background: white;
}
.selected {
  background: rgb(81, 207, 91);
}
.section-title {
  text-align: center;
  border-top: 1px solid #20ec65;
  border-bottom: 1px solid #20ec65;
}
.side-menu-bar {
  padding-top: 10px;
  padding-left: 5px;
  text-align: center;
}
</style>
