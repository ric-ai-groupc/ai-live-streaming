<template>
  <div class="login-modal" aria-labelledby="loginModalLabel" role="dialog" aria-modal="true" >
    <div class="modal-content" id="loginModalLabel">
      <h2>登录</h2>
      <button @click="loginAsGuest" class="guest-login-button" aria-label="游客登录">游客登录</button>
      <button @click="navigateToRegister" class="register-button" aria-label="注册">注册</button>
      <form @submit.prevent="handleLogin" class="login-form">
        <label for="phone-number" class="visually-hidden">手机号</label>
        <input
          type="tel"
          id="phone-number"
          v-model="phoneNumber"
          placeholder="手机号"
          required
          aria-required="true"
        />
        <button @click="sendVerificationCode" class="send-code-button" aria-label="获取验证码">获取验证码</button>
        <label for="verification-code" class="visually-hidden">验证码</label>
        <input
          type="text"
          id="verification-code"
          v-model="verificationCode"
          placeholder="验证码"
          required
          aria-required="true"
        />
        <button type="submit" class="login-button" aria-label="登录">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      verificationCode: ''
    };
  },
  methods: {
    loginAsGuest() {
      // TODO: 实现游客登录逻辑
      const guestInfo = { /* ... */ }; // 假设这是游客的信息
      this.$emit('login-success', guestInfo);
      this.$router.push({ name: 'TA' });
    },
    navigateToRegister() {
      // 导航到注册页面
      this.$router.push({ name: 'Register' });
    },
    sendVerificationCode() {
      // TODO: 实现发送验证码逻辑
      console.log(`发送验证码到 ${this.phoneNumber}`);
    },
    handleLogin() {
      // TODO: 实现登录逻辑
      const userInfo = { /* ... */ }; // 假设这是从API返回的用户信息
      this.$emit('login-success', userInfo);
      this.$router.push({ name: 'TA' });
    }
  }
};
</script>

<style scoped>
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--padding);
  text-align: center;
  width: 300px;
}

.modal-content h2 {
  margin-bottom: var(--padding);
}

.guest-login-button, .send-code-button, .login-button, .register-button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  width: 100%;
  margin-bottom: var(--padding);
}

.guest-login-button {
  margin-bottom: calc(var(--padding) / 2);
}

.login-form input {
  width: calc(100% - 2 * var(--padding));
  padding: var(--padding);
  border: 1px solid #E5E5EA;
  border-radius: var(--border-radius);
  margin-bottom: var(--padding);
}

.visually-hidden {
  clip: rect(0 0 0 0);
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
}
</style>