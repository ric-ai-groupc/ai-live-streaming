<template>
  <div id="app" aria-labelledby="app-heading">
    <h1 id="app-heading" class="sr-only">AI直播间</h1>
    <Navbar :selectedHostInfo="selectedHostInfo" />
    <div v-if="!isLoggedIn">
      <Login v-if="!hiddenLogin" @login-success="handleLoginSuccess" />
      <Register v-if="!hiddenRegister"/>
    </div>
    <div v-else class="main-content">
      <DigitalPersonSelection v-if="!selectedHostInfo" @person-selected="handlePersonSelected" />
      <div class="live-stream-chat-container" role="region" aria-labelledby="live-stream-label">
        <LiveStreamPlayer v-if="selectedHostInfo" class="live-stream-player" id="live-stream-player" aria-label="直播流播放器" />
        <div class="vertical-container" aria-labelledby="vertical-container-label">
          <ProductCard v-if="selectedHostInfo" :product="productInfo" class="product-card" />
          <ChatBox v-if="selectedHostInfo" :person-selected="selectedHostInfo" class="chat-box-container" /> <!-- ChatBox 不再固定在底部 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import DigitalPersonSelection from '@/components/DigitalPersonSelection.vue';
import LiveStreamPlayer from '@/components/LiveStreamPlayer.vue';
import ChatBox from '@/components/ChatBox.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: {
    Navbar,
    DigitalPersonSelection,
    LiveStreamPlayer,
    ChatBox,
    Login,
    Register,
    ProductCard
  },
  watch: {
    '$route'(to, from) {
      if (to.path === '/register'){
        this.hiddenLogin= true;
        this.hiddenRegister=false;
      } else if ( to.path === '/login'){
        this.hiddenLogin= false;
        this.hiddenRegister= true;
      } else if (to.path === '/TA'){
        this.hiddenLogin= true;
        this.hiddenRegister= true;
        this.isLoggedIn = true;
        this.selectedHostInfo= ''; // TODO: 清除用户会话或从API获取新的主持人信息
      }
    }
  },
  data() {
    return {
      hiddenLogin: false,
      hiddenRegister: true,
      selectedHostInfo: '',
      isLoggedIn: false,
      productInfo: {
        image: 'https://asset.swarovski.com/images/$size_2000/t_swa103/b_rgb:ffffff,c_scale,dpr_1.0,f_auto,w_580/5709951_png/idyllia-%E9%93%BE%E5%9D%A0%E5%92%8C%E8%83%B8%E9%92%88--%E6%B7%B7%E5%90%88%E5%88%87%E5%89%B2--%E5%AF%86%E9%95%B7--%E8%9D%B4%E8%9D%B6--%E6%B5%81%E5%85%89%E6%BA%A2%E5%BD%A9--%E9%95%80%E9%87%91%E8%89%B2%E8%B0%83-swarovski-5709951.png',
        sku: 'M5709951',
        name: 'Idyllia 链坠和胸针',
        price: '¥ 3,800',
        link: 'https://www.swarovski.com.cn/zh-CN/p-M5709951/Idyllia-%E9%93%BE%E5%9D%A0%E5%92%8C%E8%83%B8%E9%92%88-%E6%B7%B7%E5%90%88%E5%88%87%E5%89%B2-%E5%AF%86%E9%95%B7-%E8%9D%B4%E8%9D%B6-%E6%B5%81%E5%85%89%E6%BA%A2%E5%BD%A9-%E9%95%80%E9%87%91%E8%89%B2%E8%B0%83/?variantID=5709951'
      }
    };
  },
  methods: {
    handlePersonSelected(person) {
      this.selectedHostInfo = person; // TODO: 根据选定的数字人从API获取产品信息
    },
    handleLoginSuccess(userInfo) {
      this.isLoggedIn = true;
      this.selectedHostInfo = userInfo.defaultHostInfo; // 假设用户信息中包含默认数字人信息
    }
  }
};
</script>

<style scoped>
#app {
  height: 100vh; /* 使整个页面高度填满屏幕 */
  display: flex;
  flex-direction: column;
  background-image: url('@/assets/images/background3.jpg'); /* 添加背景图片 */
  background-size: cover;
  background-position: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* 用于隐藏视觉但保持可访问性 */
  border: 0;
}
</style>