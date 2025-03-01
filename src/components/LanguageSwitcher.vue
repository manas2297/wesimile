<script setup lang="ts">
import { useLanguage } from '../stores/useLanguage'

const { currentLanguage, toggleLanguage } = useLanguage()
</script>

<template>
  <div class="flex items-center space-x-2">
    <button 
      @click="toggleLanguage"
      class="relative inline-flex items-center h-8 rounded-full w-14 transition-colors focus:outline-none bg-primary"
      :class="currentLanguage === 'en' ? 'bg-primary' : 'bg-primary-dark'"
    >
      <span class="sr-only">Toggle Language</span>
      <!-- Switch -->
      <span 
        class="inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-200 ease-in-out"
        :class="currentLanguage === 'en' ? 'translate-x-1' : 'translate-x-7'"
      />
      <!-- Language Indicators -->
      <span 
        class="absolute text-xs font-medium text-white"
        :class="currentLanguage === 'en' ? 'right-2' : 'left-2'"
      >
        {{ currentLanguage === 'en' ? 'EN' : 'हि' }}
      </span>
    </button>
  </div>
</template> 