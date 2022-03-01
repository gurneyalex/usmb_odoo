<template>
<div class="elementCart">

  <div class="name">
    {{ name }}
  </div>

  <div class="pack">
      {{ packag }}g x {{ quantity }}
  </div>

  <div class="price">
  {{ price }} CHF
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
    packag: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
};
</script>


<style scoped>

.elementCart{
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: white;
}
.name{
  justify-items: left;
  margin-left: 5px;
}
.price{
  margin-left: auto;
  margin-right: 5px;
  justify-items: right;
}
.pack{
  justify-items: center;
}


</style>
