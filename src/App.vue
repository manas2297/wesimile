<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatWidget from './components/ChatWidget.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <ChatWidget />
    <Footer />
  </div>
</template>