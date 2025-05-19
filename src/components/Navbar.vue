<template>
  <nav aria-label="Main Navigation">
    <div class="navbar-container">
      <img src="@/assets/logo.png" alt="AI直播Logo" class="navbar-logo">
      <button @click="handleBackClick" aria-label="返回上一页">返回</button>
      <h1 style="color: red;">AI直播间</h1> <!-- AI直播间变成红色 -->
      <div>
        <span>{{ selectedHostInfo }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    selectedHostInfo: {
      type: String,
      required: true,
      default: '王博'
    }
  },
  data() {
    return {
      liveRoomName: 'AI直播间',
    };
  },
  methods: {
    handleBackClick() {
      if (this.$router) {
        this.$router.go(-1);
      } else {
        console.error('路由实例未定义');
      }
    }
  }
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Navbar 内容居中 */
  gap: var(--padding); /* 添加间距以优化布局 */
}

.navbar-logo {
  height: 40px; /* 根据实际尺寸调整 */
}
</style>