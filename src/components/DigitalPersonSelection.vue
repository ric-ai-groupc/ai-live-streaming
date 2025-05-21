<template>
  <div class="selection-container" aria-labelledby="selection-heading">
    <h2 id="selection-heading">请选择你的数字人</h2>
    <div class="avatars">
      <div
        @click="selectDigitalPerson('王博')"
        role="button"
        tabindex="0"
        aria-label="选择王博"
        :class="{ 'selected': selectedPerson === '王博' }"
      >
        <img :src="require('@/assets/images/wangbo.jpg')" alt="王博头像">
        <p>👋 你好呀~</p>
      </div>
      <div
        @click="selectDigitalPerson('王凌')"
        role="button"
        tabindex="0"
        aria-label="选择王凌"
        :class="{ 'selected': selectedPerson === '王凌' }"
      >
        <img :src="require('@/assets/images/wanglin.jpeg')" alt="王凌头像">
        <p>👋 嘿嘿~</p>
      </div>
    </div>
    <button
      @click="confirmSelection"
      aria-label="确认选择"
      class="confirm-button"
      :disabled="!selectedPerson"
    >
      确定
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPerson: ''
    };
  },
  methods: {
    selectDigitalPerson(person) {
      this.selectedPerson = person;
    },
    confirmSelection() {
      // TODO: Load the selected digital person and start the stream
      this.$emit('person-selected', this.selectedPerson);
      this.$router.push({ path: "/livingRoom/" + this.selectedPerson })
    }
  }
};
</script>

<style scoped>
.selection-container {
  text-align: center;
}

.avatars {
  display: flex;
  justify-content: center;
  gap: var(--padding);
}

.avatars div {
  margin: 0 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.avatars div img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.avatars div p {
  font-size: 14px;
}

.avatars div.selected {
  border: 2px solid red; /* 添加高亮效果 */
}

.confirm-button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin-top: var(--padding);
  font-size: 1rem;
  transition: background-color 0.3s;
}

.confirm-button:hover,
.confirm-button:focus {
  background-color: darken(var(--primary-color), 10%);
}

.confirm-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>