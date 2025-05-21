<template>
  <div id="app">
    <Navbar :selectedHostInfo="selectedHostInfo" />
    <div v-if="!isLoggedIn">
      <Login v-if="!hiddenLogin" @login-success="handleLoginSuccess" />
      <Register v-if="!hiddenRegister"/>
    </div>
    <div v-else class="main-content">
      <DigitalPersonSelection v-if="!selectedHostInfo" @person-selected="handlePersonSelected" />
      <div class="live-stream-chat-container" role="region" aria-labelledby="live-stream-label">
        <LiveStreamPlayer v-if="selectedHostInfo" class="live-stream-player" id="live-stream-player" aria-label="Live Stream Player" />
        <div class="vertical-container" aria-labelledby="vertical-container-label">
          <ProductCard v-if="selectedHostInfo" :product="productInfo" class="product-card" />
          <ChatBox v-if="selectedHostInfo" :person-selected="selectedHostInfo" class="chat-box-container" />
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
        this.selectedHostInfo=null;
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
        image: 'https://www.vancleefarpels.com/content/dam/rcq/vca/20/82/06/9/2082069.png.transform.vca-w820-1x.png',
        sku: 'VCARP4KO00',
        name: 'Magic Alhambra長項鍊，1枚四葉幸運圖騰',
        price: '¥ 73,500'
      }
    };
  },
  methods: {
    handlePersonSelected(person) {
      this.selectedHostInfo = person;
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
}

.main-content {
  display: flex;
  flex: 1;
  max-width: 1200px; /* 使内容区域居中 */
  width: 100%;
  flex-direction: column;
  margin: 0 auto; /* 使内容区域居中 */
}

.live-stream-chat-container {
  display: flex;
  flex: 1;
}

.live-stream-player {
  flex: 7; /* 调整以适应垂直容器的宽度 */
  margin-right: var(--padding);
}

.vertical-container {
  display: flex;
  flex-direction: column;
  flex: 2; /* 固定为页面宽度的20% */
  min-height: 100%; /* 与 live-stream-player 高度保持一致 */
}

.product-card {
  margin-bottom: var(--padding);
}

.chat-box-container {
  flex: 1;
}
</style>