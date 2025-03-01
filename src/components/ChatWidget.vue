<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const message = ref('')
const messages = ref([
  { text: 'Hello! How can we help you today?', isBot: true }
])

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const sendMessage = () => {
  if (!message.value.trim()) return
  
  // Add user message
  messages.value.push({ text: message.value, isBot: false })
  
  // Clear input
  message.value = ''
  
  // Simulate bot response
  setTimeout(() => {
    messages.value.push({
      text: "Thanks for your message! We'll get back to you soon.",
      isBot: true
    })
  }, 1000)
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Button -->
    <button 
      @click="toggleChat"
      class="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 group"
      :class="{ 'rotate-360': isOpen }"
    >
      <svg 
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 group-hover:scale-110 transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg 
        v-else
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Chat Window -->
    <div 
      v-show="isOpen"
      class="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-2xl transform transition-all duration-300"
      :class="isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
    >
      <!-- Header -->
      <div class="bg-primary text-white p-4 rounded-t-lg">
        <h3 class="text-lg font-semibold">Chat with Us</h3>
        <p class="text-sm opacity-90">We typically reply within a few minutes</p>
      </div>

      <!-- Messages -->
      <div class="h-96 overflow-y-auto p-4 space-y-4">
        <div 
          v-for="(msg, index) in messages" 
          :key="index"
          class="flex"
          :class="msg.isBot ? 'justify-start' : 'justify-end'"
        >
          <div 
            class="max-w-[80%] rounded-lg px-4 py-2"
            :class="msg.isBot ? 'bg-gray-100' : 'bg-primary text-white'"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 border-t">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input 
            v-model="message"
            type="text"
            placeholder="Type your message..."
            class="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-primary"
          >
          <button 
            type="submit"
            class="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-360 {
  transform: rotate(360deg);
}

/* Custom Scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E2E8F0 #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E2E8F0;
  border-radius: 3px;
}
</style> 