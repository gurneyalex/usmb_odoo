<template>
  <div v-if="this.$store.state.catalog.filters.favorite && favorite || !this.$store.state.catalog.filters.favorite" class="popover is-popover-bottom">
    <div
      @click="showModal()"
      @mousedown="start"
      @mouseleave="stop"
      @mouseup="stop"
      @touchstart="start"
      @touchend="stop"
      @touchcancel="stop"
      class="card block mb-0"
      card-radius="1rem"
    >
      <div class="popover-trigger">
        <div class="card block" card-radius="1rem">
          <div
            id="favorite"
            class="favorite"
            v-if="favorite"
            @click="changeFavorite(id_item)"
          >
            <img :src="'images/favorite.png'" :alt="image" />
          </div>
          <div
            id="favorite"
            class="favorite"
            v-else
            @click="changeFavorite(id_item)"
          >
            <img :src="'images/notfavorite.png'" :alt="image" />
          </div>
          <div v-if="seasonal" class="wrap">
            <span class="ribbon6">{{ $t("catalog.seasonal") }}</span>
          </div>
          <div v-if="discount > 0" class="discount">{{ discount }}%</div>
          <div class="img-card">
            <figure class="image is-16by9 m-0">
              <img class="img_product" :src="'images/' + image" :alt="image" />
            </figure>
          </div>
          <div class="custom-card-content">
            <div class="name">{{ name }} - {{ origin }}</div>
            <div class="price">
              {{ pricePerKg }} {{ $t("catalog.priceKG") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.$store.state.user.id != -1" class="popover-content">
      <Modal :packages="packages" :id_item="id_item" :qt_item="0" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Modal from "./Modal.vue";

export default {
  inject: ["mq"],
  name: "CardImage",
  components: {
    Modal,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    pricePerKg: {
      type: String,
      required: true,
    },
    seasonal: {
      type: Boolean,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
    },
    packages: {
      type: Array,
      required: true,
    },
    id_item: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      interval: false,
      count: 0,
    };
  },
  computed: mapState({
    user: (state) => state.user,
  }),
  methods: {
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => this.count++, 30);
      }
    },
    stop() {
      if (this.count > 20) {
        console.log("appuie long");
      }
      clearInterval(this.interval);
      this.interval = false;
      this.count = 0;
    },
    showModal() {
      var popover = document.getElementsByClassName("popover");
      var up = document.getElementsByClassName("popover is-popover-top");
      var down = document.getElementsByClassName("popover is-popover-bottom");
      if (window.innerHeight / 2 > event.clientY) {
        for (let i = 0; i < popover.length; i++) {
          popover[i].className = "popover is-popover-bottom";
        }

        for (let i = 0; i < up.length; i++) {
          up[i].className = "popover is-popover-bottom";
        }
      } else {
        for (let i = 0; i < popover.length; i++) {
          popover[i].className = "popover is-popover-top";
        }

        for (let i = 0; i < down.length; i++) {
          down[i].className = "popover is-popover-top";
        }
      }
    },
    changeFavorite(idProd) {
      this.$store.dispatch("favori.setFavori", idProd);
    },
  },
};
</script>

<style>
/* discount */
.discount {
  display: table-cell;
  position: absolute;
  overflow: hidden;
  z-index: 2;
  background: rgb(255, 60, 46);
  background: linear-gradient(
    230deg,
    rgba(255, 60, 46, 1) 0%,
    rgba(160, 0, 0, 0.7060690487132353) 100%
  );
  clip-path: polygon(
    50% 0%,
    44.99% 10.32%,
    37.57% 1.57%,
    35.28% 12.81%,
    25.91% 6.18%,
    26.49% 17.64%,
    15.77% 13.55%,
    19.18% 24.5%,
    7.78% 23.21%,
    13.81% 32.97%,
    2.45% 34.55%,
    10.71% 42.5%,
    0.1% 46.86%,
    10.08% 52.51%,
    0.89% 59.37%,
    11.96% 62.36%,
    4.76% 71.29%,
    16.23% 71.43%,
    11.47% 81.87%,
    22.62% 79.16%,
    20.61% 90.45%,
    30.73% 85.05%,
    31.59% 96.49%,
    40.05% 88.74%,
    43.73% 99.61%,
    50% 90%,
    56.27% 99.61%,
    59.95% 88.74%,
    68.41% 96.49%,
    69.27% 85.05%,
    79.39% 90.45%,
    77.38% 79.16%,
    88.53% 81.87%,
    83.77% 71.43%,
    95.24% 71.29%,
    88.04% 62.36%,
    99.11% 59.37%,
    89.92% 52.51%,
    99.9% 46.86%,
    89.29% 42.5%,
    97.55% 34.55%,
    86.19% 32.97%,
    92.22% 23.21%,
    80.82% 24.5%,
    84.23% 13.55%,
    73.51% 17.64%,
    74.09% 6.18%,
    64.72% 12.81%,
    62.43% 1.57%,
    55.01% 10.32%
  );
  padding: 6%;
  font-size: 1.5em;
  color: white;
  right: 10%;
  bottom: 30%;
}

/* ribbon */
.wrap {
  width: 100%;
  height: 188px;
  position: absolute;
  top: -8px;
  left: 8px;
  overflow: hidden;
}
.wrap:before,
.wrap:after {
  content: "";
  position: absolute;
}
.wrap:before {
  width: 40px;
  height: 8px;
  right: 100px;
  background: #4d6530;
  border-radius: 8px 8px 0px 0px;
}
.wrap:after {
  width: 8px;
  height: 40px;
  right: 0px;
  top: 100px;
  background: #4d6530;
  border-radius: 0px 8px 8px 0px;
}
.ribbon6 {
  width: 200px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 30px;
  right: -50px;
  z-index: 2;
  overflow: hidden;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  background: rgb(189, 0, 49);
  background: linear-gradient(
    190deg,
    rgba(189, 0, 49, 1) 0%,
    rgba(93, 8, 50, 0.7060690487132353) 100%
  );
  color: white;
  text-align: center;
}

/*card*/
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.custom-card-content {
  position: absolute;
  display: inline-flex;
  bottom: 0;
  left: 0;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: fit-content;
  background-color: rgba(196, 196, 196, 0.8);
}
.img_product {
  height: 100%;
}
.name {
  vertical-align: middle;
  line-height: 5vh;
  width: 100%;
  text-align: left;
}
.price {
  vertical-align: middle;
  line-height: 5vh;
  width: 50%;
  text-align: right;
}

.favorite {
  position: absolute;
  z-index: 2;
  align-content: start;
  width: 20%;
  height: 20%;
  padding-left: 2%;
  padding-top: 2%;
}

.popover-content {
  width: 100% !important;
  /*width: fit-content !important;*/
}
</style>