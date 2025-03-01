<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-white shadow-sm">
    <div class="container-custom py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-primary">
            WeSmile
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-primary font-medium">Home</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-primary font-medium">About</router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-primary font-medium">Contact</router-link>
          <a href="tel:+1234567890" class="btn btn-primary">Book Appointment</a>
        </nav>
        
        <!-- Mobile menu button -->
        <button 
          @click="toggleMenu" 
          class="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4">
        <div class="flex flex-col space-y-4">
          <router-link @click="isMenuOpen = false" to="/" class="text-gray-700 hover:text-primary font-medium">Home</router-link>
          <!-- <router-link @click="isMenuOpen = false" to="/about" class="text-gray-700 hover:text-primary font-medium">About</router-link> -->
          <router-link @click="isMenuOpen = false" to="/contact" class="text-gray-700 hover:text-primary font-medium">Contact</router-link>
          <a href="tel:+919559760487" class="btn btn-primary inline-block text-center">Book Appointment</a>
        </div>
      </div>
    </div>
  </header>
</template>