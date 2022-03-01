<template>
  <div class="card">
    <div class="img-card">
      <figure class="image is-16by9 m-0">
        <img class="img_product" :src="'images/' + image" :alt="image" />
      </figure>
    </div>

    <div class="custom-card-content">
      <div class="name">{{ name }}</div>
      <div class="price">{{ pricePerKg }}CHF/{{ elementPackage }}G</div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CartElement",

  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    elementPackage: {
      type: String,
      required: true,
    },
    pricePerKg: {
      type: String,
      required: true,
    },
  },
};
</script>


<style scoped>
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
  width: 50%;
  text-align: left;
}
.price {
  vertical-align: middle;
  line-height: 5vh;
  width: 50%;
  text-align: right;
}
</style>
