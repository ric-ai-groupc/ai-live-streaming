<template>
  <div class="product-card" role="region" aria-labelledby="product-title">
    <!-- TODO: 获取并填充实际的产品官网链接 -->
    <a :href="product.link || '#'"
       target="_blank"
       rel="noopener noreferrer"
       @click="handleClick"
       class="product-link"
       aria-label="Visit the official website of the product">
      <img :src="product.image" :alt="product.name" class="product-image" />
    </a>
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
      required: true,
      // 预期的product对象结构应包含link属性，若无则需对接后端API进行获取
      validator: function(product) {
        return typeof product.image === 'string' &&
               typeof product.name === 'string' &&
               typeof product.sku === 'string' &&
               typeof product.price === 'string';
      }
    }
  },
  methods: {
    handleClick() {
      // 可以在此处添加额外的逻辑，例如记录点击行为等
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

.product-link {
  text-decoration: none;
}
</style>