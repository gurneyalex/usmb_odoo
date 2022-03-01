<template>
  <div class="wrapper">
    <menu-button />

    <form id="search-form" class="search-form" @submit.prevent="onSubmit">
      <input
        class="search-input input"
        type="text"
        :placeholder="$t('catalog.hintResearch')"
        :value="value"
        @input="onInput"
      />

      <div class="search-buttons">
        <button
          id="search-button"
          type="submit"
          class="button is-light is-small"
        >
          <span class="material-icons"> search </span>
        </button>

        <button @click.prevent="clear" class="button is-light is-small">
          <span class="material-icons-outlined"> backspace </span>
        </button>
      </div>
    </form>

    <div
      :class="'button ' + (favorite ? 'selected' : 'not-selected')"
      @click="onFavoriteClick"
    >
      <span class="material-icons-outlined" v-if="favorite"> favorite </span>
      <span class="material-icons-outlined" v-else> favorite_border </span>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import MenuButton from "./layout/MenuButton.vue";

export default {
  name: "CatalogSearchBar",

  components: {
    MenuButton,
  },

  data: () => ({
    value: "",
    hidden: false,
  }),

  computed: mapState({
    favorite: (state) => state.catalog.filters.favorite,
  }),

  methods: {
    onFavoriteClick() {
      this.$store.dispatch("catalog.updateFilters", {
        favorite: !this.favorite,
      });
    },

    onInput(e) {
      this.value = e.target.value;
    },

    clear() {
      this.value = "";
      this.$store.dispatch("catalog.updateFilters", { search: this.value });
    },

    onSubmit() {
      this.$store.dispatch("catalog.updateFilters", { search: this.value });
    },

    show_menu() {
      this.hidden = true;
      var content = document.querySelector(".side_menu_container");
      if (content != null) {
        content.classList.toggle("slideout");
        document.querySelector(".side_menu_flou").classList.toggle("bgout");
      }
    },
    hide_menu() {
      var content = document.querySelector(".side_menu_container");
      if (content != null) {
        content.classList.toggle("slideout");
        document.querySelector(".side_menu_flou").classList.toggle("bgout");
      }
    },
  },
};
</script>


<style scoped>
.form {
  width: 100%;
  height: 100%;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
}

.search-form {
  flex-grow: 1;
  position: relative;
}

.search-buttons {
  position: absolute;
  top: 0;
  right: 8px;
  bottom: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
}

.search-input {
  height: 50px;
}
.input {
  text-align: start;
}

/* bouton affichage du menu */
.side_menu_container {
  position: absolute;
  top: 0;
  height: 100%;
  min-width: 20%;
  background-color: #d2ffc3;
  padding-right: 4px;
  border-right: solid black 2px;
  z-index: 4;
  animation: slidein 0.2s ease-in-out;
}
.slideout {
  animation: slideout 0.2s ease-in-out forwards !important;
}
.bgout {
  animation: reverse_bg 0.2s ease-in-out forwards !important;
  transform: translateX(-100%);
}
.side_menu_flou {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.65);
  z-index: 3;
  animation: bg 0.2s ease-in-out;
}
@keyframes slidein {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}
@keyframes bg {
  0% {
    background-color: rgba(200, 200, 200, 0);
  }
  100% {
    background-color: rgba(200, 200, 200, 0.65);
    transform: translateX(0);
  }
}
@keyframes slideout {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
@keyframes reverse_bg {
  0% {
    background-color: rgba(200, 200, 200, 0.65);
  }
  100% {
    background-color: rgba(156, 53, 53, 0);
  }
}
</style>
