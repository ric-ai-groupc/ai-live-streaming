<template>
  <div class="register-container" aria-labelledby="register-heading">
    <h2 id="register-heading">注册</h2>
    <form @submit.prevent="handleRegister" aria-label="注册表单">
      <input
        type="tel"
        v-model="phoneNumber"
        placeholder="手机号"
        aria-label="手机号"
        required
      />
      <button @click="sendVerificationCode" aria-label="获取验证码">
        获取验证码
      </button>
      <input
        type="text"
        v-model="verificationCode"
        placeholder="验证码"
        aria-label="验证码"
        required
      />
      <input
        type="text"
        v-model="name"
        placeholder="姓名"
        aria-label="姓名"
        required
      />
      <input
        type="date"
        v-model="birthdate"
        placeholder="生日"
        aria-label="生日"
        required
      />
      <select v-model="gender" aria-label="性别" required>
        <option value="male">男</option>
        <option value="female">女</option>
      </select>
      <select v-model="preferredDigitalPerson" aria-label="首选数字人" required>
        <option value="person1">王博</option>
        <option value="person2">王凌</option>
      </select>
      <button type="submit" aria-label="注册">注册</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      verificationCode: '',
      name: '',
      birthdate: '',
      gender: '',
      preferredDigitalPerson: ''
    };
  },
  methods: {
    sendVerificationCode() {
      // TODO: 实现发送验证码逻辑
      console.log(`发送验证码到 ${this.phoneNumber}`);
    },
    handleRegister() {
      // TODO: 实现注册逻辑
      const newUser = { /* ... */ }; // 假设这是从API返回的新用户信息
      console.log('注册成功', newUser);
      this.$router.push({ name: 'TA' });
    }
  }
};
</script>