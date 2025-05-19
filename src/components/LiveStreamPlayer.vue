<template>
  <div class="live-stream-player" role="application" aria-label="Live Stream Player">
    <div v-if="!localVideoSrc" class="default-image" aria-label="Default Image Placeholder">
      <img src="@/assets/images/default_living.png" alt="No live stream available" />
    </div>
    <video
      v-else
      ref="videoPlayer"
      class="video-element"
      controls
      autoplay
      :src="localVideoSrc"
      @ended="onEnded"
      aria-live="assertive"
      aria-busy="false"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'LiveStreamPlayer',
  data() {
    return {
      localVideoSrc: '', // 初始化为空字符串
      isPlaying: false,
      isMuted: false,
    };
  },
  props: {
    selectedPerson: {
      type: String,
      required: true,
    },
  },
  watch: {
    selectedPerson(newPerson) {
      // TODO: Fetch live stream URL from API based on the selected person
      // Example:
      // fetch(`https://api.example.com/live-stream-url?person=${newPerson}`)
      //   .then(response => response.json())
      //   .then(data => { this.localVideoSrc = data.url; })
      //   .catch(error => console.error('Error fetching live stream URL:', error));
    },
  },
  methods: {
    onPlay() {
      this.isPlaying = true;
    },
    onPause() {
      this.isPlaying = false;
    },
    onEnded() {
      this.isPlaying = false;
    },
    togglePlay() {
      const video = this.$refs.videoPlayer;
      if (video && video.paused) {
        video.play();
      } else if (video) {
        video.pause();
      }
    },
    muteVideo() {
      const video = this.$refs.videoPlayer;
      if (video) {
        video.muted = !video.muted;
        this.isMuted = video.muted;
      }
    },
  },
  mounted() {
    // TODO: Fetch live stream URL from API when the component mounts
    // Example:
    // fetch(`https://api.example.com/live-stream-url?person=${this.selectedPerson}`)
    //   .then(response => response.json())
    //   .then(data => { this.localVideoSrc = data.url; })
    //   .catch(error => console.error('Error fetching live stream URL:', error));
  },
};
</script>

<style scoped>
.live-stream-player {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.default-image img {
  width: 100%;
  height: auto;
  display: block;
}

.video-element {
  width: 100%;
  height: auto;
  display: block;
}
</style>