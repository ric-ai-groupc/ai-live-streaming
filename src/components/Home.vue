<template>
  <div id="app">
    <Navbar :selectedHostInfo="selectedHostInfo" />
    <div v-if="!isLoggedIn">
      <Login v-if="!hiddenLogin" @login-success="handleLoginSuccess" />
      <Register v-if="!hiddenRegister"/>
    </div>
    <div v-else class="main-content">
      <DigitalPersonSelection v-if=(!selectedHostInfo) @person-selected="handlePersonSelected" />
      <div class="live-stream-chat-container">
        <LiveStreamPlayer v-if="selectedHostInfo" class="live-stream-player" />
        <ChatBox v-if="selectedHostInfo" :person-selected="selectedHostInfo" class="chat-box-container" />
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

export default {
  components: {
    Navbar,
    DigitalPersonSelection,
    LiveStreamPlayer,
    ChatBox,
    Login,
    Register
  },
  watch: {
    '$route'(to, from) {
      if (to.path === '/register'){
        this.hiddenLogin= true
        this.hiddenRegister=false
      } else if ( to.path === '/login'){
        this.hiddenLogin= false
        this.hiddenRegister= true
      } else if (to.path === '/TA'){
        this.hiddenLogin= true
        this.hiddenRegister= true
        this.selectedHostInfo=''
      }
    }
  },
  data() {
    return {
      hiddenLogin: false,
      hiddenRegister: true,
      selectedHostInfo: '',
      isLoggedIn: false
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
  flex: 3;
  margin-right: var(--padding);
}

.chat-box-container {
  flex: 1;
}
</style>