<template>
  <div id="app" role="application" aria-label="AI Live Stream">
    <CelebritySelection v-if="!selectedCelebrity" @celebritySelected="handleCelebritySelected" />
    <VoicePackSelection v-else-if="!selectedVoicePack" :celebrity="selectedCelebrity" @voicePackSelected="handleVoicePackSelected" />
    <div v-else class="live-stream">
      <ProductDisplay :celebrity="selectedCelebrity" :voicePack="selectedVoicePack" />
      <ChatBox @productAsked="showProduct" />
    </div>
  </div>
</template>

<script>
import CelebritySelection from './components/CelebritySelection.vue';
import VoicePackSelection from './components/VoicePackSelection.vue';
import ProductDisplay from './components/ProductDisplay.vue';
import ChatBox from './components/ChatBox.vue';

export default {
  name: 'App',
  components: {
    CelebritySelection,
    VoicePackSelection,
    ProductDisplay,
    ChatBox
  },
  data() {
    return {
      selectedCelebrity: null,
      selectedVoicePack: null,
      currentProduct: null
    };
  },
  methods: {
    handleCelebritySelected(celebrity) {
      this.selectedCelebrity = celebrity;
    },
    handleVoicePackSelected(voicePack) {
      this.selectedVoicePack = voicePack;
    },
    showProduct(product) {
      this.currentProduct = product;
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>