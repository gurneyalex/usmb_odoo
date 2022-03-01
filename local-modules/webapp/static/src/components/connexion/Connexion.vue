<template>
  <div class="connexion">
    <button
      v-bind:class="
        'button is-light ' +
        (mq.phone ? ' is-small' : ' is-medium') +
        ' button-back'
      "
      @click="goTo('/')"
    >
      <span class="material-icons-outlined"> arrow_back </span>
    </button>
    <div>
      <img class="img-logo" :src="'images/logo.png'" alt="logo" />
    </div>
    <div id="notif-error" class="notification is-danger">
      <button class="delete" @click="removeNotif()"></button>
      {{ $t("connexion.msgerror") }}
    </div>
    <div class="form-connexion">
      <div class="m-2">{{ $t("connexion.username") }}</div>
      <input class="input is-medium m-2" v-model="username" type="text" />
      <div class="m-2">{{ $t("connexion.password") }}</div>
      <input
        class="input is-medium m-2"
        v-model="password"
        type="password"
        v-on:keypress.enter="login()"
      />
      <br />
      <button class="button login m-4" @click="login()">
        {{ $t("connexion.connect") }}
      </button>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  inject: ["mq"],
  name: "CartCatalog",

  computed: mapState({
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
    login() {
      let user = this.username;
      let pwd = this.password;
      this.$store
        .dispatch("user-auth.connect", { id: -1, user, pwd })
        .then(() => {
          if (this.$store.state.user.id != -1) {
            this.goTo("/");
          } else {
            document.getElementById("notif-error").style.display = "block";
          }
        });
    },
    removeNotif() {
      document.getElementById("notif-error").style.display = "none";
    },
  },
};
</script>


<style scoped>
.connexion {
  display: grid;
  justify-content: center;
  justify-items: center;
}
.form-connexion {
  display: grid;
  justify-items: center;
}
.img-logo {
  height: 35vh;
  width: auto;
  padding: 5%;
}
.login {
  background-color: #d2ffc3;
  border-color: #20ec65;
}
.notification {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: none;
  width: 100%;
  background-color: #ef5977;
}
.button-back {
  margin: 2rem;
  display: flex;
  justify-self: flex-start;
  position: absolute;
}
</style>