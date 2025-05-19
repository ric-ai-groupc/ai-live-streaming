import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import LiveStreamPlayer from '@/components/LiveStreamPlayer.vue';
import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/TA',
      name: 'TA',
      component: Home
    },
    {
      path: '/LivingRoom',
      name: 'livingRoom',
      component: LiveStreamPlayer
    }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;