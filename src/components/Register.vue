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

      <!-- 性别选项 -->
      <label for="gender-select" aria-label="性别选择">性别</label>
      <select id="gender-select" v-model="gender" aria-label="性别" required>
        <option value="male">男</option>
        <option value="female">女</option>
      </select>

      <!-- 首选数字人选项 -->
      <label for="digital-person-select" aria-label="首选数字人选择">首选数字人</label>
      <select id="digital-person-select" v-model="preferredDigitalPerson" aria-label="首选数字人" required>
        <option value="person1">王博</option>
        <option value="person2">王凌</option>
      </select>

      <button type="submit" aria-label="注册">注册</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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
      console.log(`发送验证码到 ${this.phoneNumber}`);
    },
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:8080/register', {
          phone: this.phoneNumber,
          name: this.name,
          birth_date: this.birthdate,
          gender: this.gender,
          favorite_digital_human: this.preferredDigitalPerson
        });

        if (response.data.code === 0) {
          console.log('注册成功:', response.data.data);
          this.$router.push({ name: 'TA' });
        } else {
          alert(response.data.message || '注册失败');
        }
      } catch (error) {
        let message = '网络错误，请稍后再试';

        if (error.response && error.response.data) {
          message = error.response.data.message;
        }

        alert(message);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-container h2 {
  text-align: center;
}

.register-container input,
.register-container select,
.register-container button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
