<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatWidget from './components/ChatWidget.vue'

const route = useRoute()

// Check if we are on admin dashboard or admin login
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})

// Check if we are on a page that starts with a dark hero section
const isDarkHeroPage = computed(() => {
  return route.path === '/' || route.path === '/about'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar v-if="!isAdminRoute" />
    <main :class="['flex-grow', { 'pt-20': !isDarkHeroPage && !isAdminRoute }]">
      <router-view />
    </main>
    <ChatWidget v-if="!isAdminRoute" />
    <Footer v-if="!isAdminRoute" />
  </div>
</template>