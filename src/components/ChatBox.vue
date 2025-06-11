<template>
  <div class="chat-box" aria-live="polite">
    <div ref="messagesContainer" class="messages">
      <div v-for="(message, index) in latestMessages" :key="index" :class="{ system: message.type === 'system', gift: message.type === 'gift', product: message.type === 'product', audio: message.type === 'audio' }">
        <strong>{{ message.sender }}:</strong> 
        <span v-if="message.type !== 'audio'">{{ message.content }}</span>
        <audio v-else controls :src="message.content"></audio>
      </div>
    </div>
    <!-- 礼物选项 -->
    <div v-if="showGiftOptions" class="gift-options" role="menu" aria-label="选择礼物">
  <button v-for="(gift, index) in gifts" :key="index" @click="sendGift(gift.symbol)" role="menuitem">{{ gift.symbol }}</button>
    </div>
    <div class="input-container">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入弹幕..." />
      <button @click="sendMessage">发送</button>
      <!-- 礼物按钮 -->
      <button @click="showGiftOptions = true" aria-haspopup="true" :aria-expanded="showGiftOptions ? 'true' : 'false'">礼物</button>
      <!-- 语音输入按钮 -->
      <button @click="toggleVoiceRecognition" aria-label="语音输入" :disabled="!isSpeechSupported">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 1.5em; height: 1.5em;">
          <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm7 4H5v2h14v-2z"/>
        </svg>
      </button>
    </div>
    <!-- 礼物动画效果 -->
    <transition name="gift-animation">
      <div v-if="showGiftAnimation" class="gift-animation-container" aria-live="assertive">
        <span class="gift-symbol">{{ currentGift }}</span>
      </div>
    </transition>
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
      ],
      showGiftOptions: false,
      showGiftAnimation: false,
      currentGift: '',
      isSpeechSupported: false,
      recognition: null,
      isListening: false,
      mediaRecorder: null,
      audioChunks : [] ,
      gifts : [] //虚拟礼物列表
    };
  },
  computed: {
    latestMessages() {
      // 仅保留最新的10条消息
      return this.messages.slice(-10);
    }
  },
  mounted() {
    this.scrollToBottom();
    this.startAutoChat();
    this.checkSpeechSupport();
    this.fetchGifts();
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
    fetchGifts() {
    // Replace with your actual API endpoint
    fetch('/api/gifts')
      .then(response => response.json())
      .then(data => {
        this.gifts = data;
      })
      .catch(error => {
        console.error('Error fetching gifts:', error);
      });
  },
    sendGift(giftSymbol) {
      this.currentGift = giftSymbol;
      this.showGiftAnimation = true;
      setTimeout(() => {
        this.showGiftAnimation = false;
      }, 2000);
      this.messages.push({ sender: '用户', content: `送了一个${giftSymbol}`, type: 'gift' });
      this.showGiftOptions = false;
      // TODO: Send gift to backend via API
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
    },
    checkSpeechSupport() {
      this.isSpeechSupported = 'webkitSpeechRecognition' in window;
      if (this.isSpeechSupported) {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = true; // 设置为持续监听
        this.recognition.interimResults = true;
        this.recognition.lang = 'zh-CN';

        this.recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              this.newMessage += event.results[i][0].transcript;
              this.sendMessage();
            } else {
              this.newMessage = event.results[i][0].transcript;
            }
          }
        };

        this.recognition.onerror = (event) => {
          console.error('语音识别错误:', event.error);
        };

        this.recognition.onend = () => {
          if (this.isListening) {
            this.recognition.start();
          }
        };
      }
    },
    toggleVoiceRecognition() {
      if (this.recognition) {
        if (this.isListening) {
          this.recognition.stop();
          this.mediaRecorder.stop();
          this.isListening = false;
        } else {
          this.recognition.start();
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
              this.mediaRecorder = new MediaRecorder(stream);
              this.mediaRecorder.ondataavailable = event => {
                this.audioChunks.push(event.data);
              };
              this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                this.messages.push({ sender: '用户', content: audioUrl, type: 'audio' });
                this.audioChunks = [];
              };
              this.mediaRecorder.start();
            })
            .catch(error => {
              console.error('无法访问麦克风:', error);
            });
          this.isListening = true;
        }
      }
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
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保聊天框高度固定 */
}

.chat-box .gift-options {
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--padding);
  margin-bottom: var(--padding);
  display: flex;
  justify-content: space-around;
}

.chat-box .gift-options button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: 0 var(--padding); /* 垂直方向上没有填充 */
  border-radius: var(--border-radius);
  cursor: pointer;
  height: 40px; /* 固定按钮高度 */
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center; /* 文字居中 */
}

.chat-box .messages {
  max-height: calc(100% - 160px); /* 减去输入容器和礼物选项的高度 */
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

.chat-box .messages .audio audio {
  width: 100%;
}

.input-container {
  display: flex;
  align-items: center; /* 确保所有元素垂直居中 */
}

.input-container input {
  width: calc(100% - 2 * var(--padding) - 260px); /* 调整输入框宽度以适应三个按钮 */
  padding: var(--padding);
  border: 1px solid #9dd9e4;
  border-radius: var(--border-radius);
  margin-right: var(--padding); /* 添加右侧间距 */
}

.input-container button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: 0 var(--padding); /* 垂直方向上没有填充 */
  border-radius: var(--border-radius);
  cursor: pointer;
  height: 40px; /* 固定按钮高度 */
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center; /* 文字居中 */
}

/* 礼物动画样式 */
.gift-animation-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5em;
  z-index: 1000;
}

.gift-animation-enter-active, .gift-animation-leave-active {
  transition: all 2s ease;
}

.gift-animation-enter-from, .gift-animation-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.gift-animation-enter-to, .gift-animation-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
</style>
