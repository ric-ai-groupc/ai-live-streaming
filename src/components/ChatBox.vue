<template>
  <div class="chat-box" aria-live="polite">
    <div ref="messagesContainer" class="messages">
      <div v-for="(message, index) in messages" :key="index" :class="{ system: message.type === 'system', gift: message.type === 'gift', product: message.type === 'product' }">
        <strong>{{ message.sender }}:</strong> {{ message.content }}
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入弹幕...">
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    personSelected: {
      type: String,
      required: true,
      default: '主播'
    }
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
    this.scrollToBottom();
    this.startAutoChat();
  },
  updated() {
    this.scrollToBottom();
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
        const greetings = ['你好！', '欢迎来到直播间！', '有什么可以帮您~', '我很高兴见到你！'];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        this.addAutoMessage(randomGreeting);
      }, 5000);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      });
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
  display: flex;
  flex-direction: column;
}

.chat-box .messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: var(--padding);
  flex: 1;
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

.input-container {
  display: flex;
  justify-content: space-between;
}

.input-container input {
  width: calc(100% - 2 * var(--padding) - 60px); /* Adjusted for button width */
  padding: var(--padding);
  border: 1px solid #E5E5EA;
  border-radius: var(--border-radius);
  margin-bottom: var(--padding);
}

.input-container button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  width: 70px;
  height: 40px;
  align-self: center;
}
</style>