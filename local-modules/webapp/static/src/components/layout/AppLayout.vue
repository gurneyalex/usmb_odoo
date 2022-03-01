<template>
  <div class="horizontal-wrapper">
    <div
      v-bind:class="
        'side-menu ' +
        (mq.tablet || mq.other
          ? ''
          : 'side-menu-mobile ' +
            (sideMenuShown
              ? 'side-menu-mobile-shown'
              : 'side-menu-mobile-hidden'))
      "
    >
      <div class="side-menu-buttons">
        <button class="button is-light is-small" @click="goTo('/')">
          <span class="material-icons-outlined"> home </span>
        </button>
        <button
          v-if="user.id === -1"
          class="button is-light is-small"
          @click="goTo('/connexion')"
        >
          <span class="material-icons-outlined"> person </span>
        </button>
        <button
          v-else
          class="button is-light is-small"
          @click="goTo('/history')"
        >
          <span class="material-icons-outlined"> person </span>
        </button>

        <button
          v-if="user.id >= 0"
          class="button is-light is-small"
          @click="goTo('/cart')"
        >
          <span class="material-icons-outlined"> shopping_cart </span>
        </button>

        <span class="material-icons-outlined"> language </span>

        <button
          v-if="user.id >= 0"
          class="button is-light is-small"
          @click="logout()"
        >
          <span class="material-icons-outlined"> logout </span>
        </button>
      </div>

      <slot name="menu" />
    </div>

    <div
      v-if="!mq.tablet && sideMenuShown"
      class="backdrop"
      @click="closeSideMenu()"
    />

    <div class="vertical-wrapper">
      <div class="header">
        <slot name="header" />
      </div>

      <div class="content">
        <slot name="content" />
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

export default {
  inject: ["mq"],
  name: "AppLayout",

  computed: mapState({
    sideMenuShown: (state) => state.sideMenuShown,
    user: (state) => state.user,
  }),

  methods: {
    closeSideMenu() {
      this.$store.commit("sideMenu.close");
    },

    goTo(route) {
      this.$router.push(route);
      this.closeSideMenu();
    },
    logout() {
      this.$store.dispatch("user-auth.getUser", {
        id: -1,
        user: "",
        pwd: "",
      });
      this.goTo("/");
    },
  },
};
</script>


<style scoped>
.horizontal-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}

.side-menu {
  min-width: 25%;
  background-color: #d2ffc3;
}

.side-menu-mobile {
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  border-right: solid black 2px;

  z-index: 4;

  transition: transform 0.2s ease-in;
}

.side-menu-mobile-shown {
  transform: translateX(0);
}

.side-menu-mobile-hidden {
  transform: translateX(-100%);
}

.side-menu-buttons {
  height: 50px;
  padding: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 3;

  background-color: rgba(200, 200, 200, 0.65);

  animation: backdrop-fade 0.2s ease-in-out;
}

@keyframes backdrop-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.vertical-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.header {
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
}

.content {
  flex-grow: 1;
  padding: 10px;
  overflow: auto;
}
</style>
