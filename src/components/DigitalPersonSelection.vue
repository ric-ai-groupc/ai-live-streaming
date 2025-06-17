<template>
  <div class="selection-container" aria-labelledby="selection-heading">
    <h2 id="selection-heading" v-if="!selectedPerson">请选择你的数字人</h2>
    <div class="avatars" v-if="!selectedPerson">
      <div
        @click="selectDigitalPerson(person)"
        role="button"
        tabindex="0"
        :aria-label="'选择' + person.name"
        :class="{ 'selected': selectedPerson === person }"
        v-for="person in digitalPeople"
        :key="person.name"
      >
        <img :src="person.avatar" :alt="person.name + '头像'" />
        <p>{{ person.greeting }}</p>
      </div>
    </div>
    <div v-else class="single-avatar">
      <img :src="selectedPerson.avatar" :alt="selectedPerson.name + '头像'" class="zoomed-avatar" />
      <p>{{ selectedPerson.greeting }}</p>
      <button
        @click="deselectDigitalPerson"
        aria-label="返回选择列表"
        class="back-button"
      >
        返回选择列表
      </button>
    </div>
    <button
      @click="confirmSelection"
      aria-label="确认选择"
      class="confirm-button"
      :disabled="!selectedPerson"
      v-if="selectedPerson"
    >
      确定
    </button>
  </div>
</template>

<script>
import {videoStreamApiClient} from '@/utils/apiClient';
export default {
  data() {
    return {
      selectedPerson: null,
      digitalPeople: []
    };
  },
  async created() {
    try {
      console.log(videoStreamApiClient.defaults.baseURL)
      const response = await videoStreamApiClient.get('/api/ai-characters');
      if (!response.ok) throw new Error('Failed to fetch AI characters');
      const paginatedData = await response.json();
      this.digitalPeople = paginatedData.data.map(item => ({
        name: item.name,
        avatar: item.imageUrl,
        greeting: `👋 ${item.name} 你好呀~`
      }));
    } catch (error) {
      console.error('Error fetching AI characters:', error);
    }
  },
  methods: {
    selectDigitalPerson(person) {
      if (this.selectedPerson && this.selectedPerson.name === person.name) {
        this.deselectDigitalPerson();
      } else {
        this.selectedPerson = person;
      }
    },
    deselectDigitalPerson() {
      this.selectedPerson = null;
    },
    confirmSelection() {
      this.$emit('person-selected', this.selectedPerson.name);
      this.$router.push({ path: "/livingRoom/" + this.selectedPerson.name });
    }
  }
};
</script>

<style scoped>
.selection-container {
  text-align: center;
}

.avatars {
  display: flex;
  justify-content: center;
  gap: var(--padding);
}

.avatars div {
  margin: 0 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.avatars div img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.avatars div p {
  font-size: 14px;
}

.avatars div.selected {
  border: 2px solid red; /* 添加高亮效果 */
}

.confirm-button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin-top: var(--padding);
  font-size: 1rem;
  transition: background-color 0.3s;
}

.confirm-button:hover, .confirm-button:focus {
  background-color: darken(var(--primary-color), 10%);
}

.confirm-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.single-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.zoomed-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: transform 0.2s;
}

.back-button {
  background-color: var(--primary-color);
  color: #FFFFFF;
  border: none;
  padding: var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: var(--padding);
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-button:hover, .back-button:focus {
  background-color: darken(var(--primary-color), 10%);
}
</style>