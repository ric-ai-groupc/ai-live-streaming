<template>
  <div class="chat-box" aria-live="polite">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" :class="{ system: message.type === 'system', gift: message.type === 'gift', product: message.type === 'product' }">
        <strong>{{ message.sender }}:</strong> {{ message.content }}
      </div>
    </div>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入弹幕...">
    <button @click="sendMessage">发送</button>
  </div>
</template>

<script>
export default {
  props: {
    personSelected: "主播"
  },
  data() {
    return {
      newMessage: '',
      messages: [
        { sender: '系统消息', content: '欢迎光临~~', type: 'system' }
      ]
    };
  },
  mounted() {
    this.startAutoChat();
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.messages.push({ sender: '用户', content: this.newMessage, type: 'normal' });
        this.newMessage = '';
        // TODO: Send message to backend via WebSocket
      }
    },
    addAutoMessage(content) {
      this.messages.push({ sender: this.personSelected, content: content, type: 'system' });
    },
    startAutoChat() {
      setInterval(() => {
        const greetings = ['你好！', '欢迎来到直播间！', '有什么问题吗？', '我们很高兴见到你！'];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        this.addAutoMessage(randomGreeting);
      }, 5000);
    }
  }
};
</script>

<style scoped>
.chat-box {
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--padding);
  margin-top: auto;
}

.chat-box .messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: var(--padding);
}

.chat-box .messages div {
  margin-bottom: 10px;
}

.chat-box .messages .system {
  color: #999999;
}

.chat-box .messages .gift {
  color: #FF9500;
}

.chat-box .messages .product {
  color: #15803D;
}

.chat-box input {
  width: calc(100% - 2 * var(--padding));
  padding: var(--padding);
  border: 1px solid #E5E5EA;
  border-radius: var(--border-radius);
  margin-bottom: var(--padding);
}

.chat-box button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  width: 100%;
}
</style>