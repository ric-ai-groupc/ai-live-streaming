<template>
  <div class="product-card" role="region" aria-labelledby="product-title">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <h2 id="product-title">{{ product.name }}</h2>
    <p>SKU: {{ product.sku }}</p>
    <p>Price: {{ product.price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  margin: 0.5rem 0;
}
</style>,