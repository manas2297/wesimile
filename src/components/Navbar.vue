<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useTranslations } from '../locales/translations'

const route = useRoute()
const { t } = useTranslations()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Check if current page is one of the dark hero pages (Home or About)
const isDarkHeroPage = computed(() => {
  return route.path === '/' || route.path === '/about'
})

// Determine if we should display transparent styling
const isTransparent = computed(() => {
  return isDarkHeroPage.value && !isScrolled.value && !isMenuOpen.value
})

const isLinkActive = (path: string) => {
  return route.path === path
}

const headerClasses = computed(() => {
  if (isTransparent.value) {
    return 'fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none border-b border-transparent py-4 shadow-none transition-all duration-300 ease-in-out'
  } else {
    return 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/80 py-4 shadow-sm transition-all duration-300 ease-in-out'
  }
})

const logoClasses = computed(() => {
  return isTransparent.value 
    ? 'text-2xl font-black text-white tracking-tight transition-colors duration-300 ease-in-out' 
    : 'text-2xl font-black text-primary tracking-tight transition-colors duration-300 ease-in-out'
})

const navItems = [
  { path: '/', label: 'nav.home' },
  { path: '/about', label: 'nav.about' },
  { path: '/partnerships', label: 'nav.partnerships' },
  { path: '/students', label: 'nav.students' },
  { path: '/contact', label: 'nav.contact' }
]
</script>

<template>
  <header :class="headerClasses">
    <div class="container-custom">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" :class="[logoClasses, 'flex items-center space-x-2.5']">
            <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="8" height="8" rx="2.5" />
              <rect x="13" y="3" width="8" height="8" rx="2.5" />
              <rect x="3" y="13" width="8" height="8" rx="2.5" />
              <rect x="14.5" y="14.5" width="6.5" height="6.5" rx="2" class="opacity-95" />
            </svg>
            <span class="font-extrabold tracking-tight">WeSmile</span>
          </router-link>
        </div>
        
        <!-- Language Switcher & Navigation -->
        <div class="flex items-center space-x-6">
          <LanguageSwitcher />
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <router-link 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path" 
              :class="[
                isTransparent 
                  ? 'text-white/80 hover:text-white flex items-center' 
                  : 'text-slate-600 hover:text-primary flex items-center',
                isLinkActive(item.path) 
                  ? (isTransparent ? 'text-white font-bold border-b-2 border-white pb-1' : 'text-primary font-bold border-b-2 border-primary pb-1')
                  : 'border-b-2 border-transparent pb-1',
                'transition-all duration-300 ease-in-out font-medium text-sm tracking-wide'
              ]"
            >
              <span class="w-1.5 h-1.5 rounded-full inline-block shrink-0 mr-1.5 transition-colors duration-300" :class="isTransparent ? 'bg-amber-300/90 shadow-[0_0_8px_rgba(253,216,53,0.6)]' : 'bg-secondary'"></span>
              <span>{{ t(item.label) }}</span>
            </router-link>
            
            <!-- Appointment Button -->
            <a 
              href="tel:+918299792775" 
              :class="[
                isTransparent
                  ? 'btn border border-white/80 text-white hover:bg-white hover:text-primary'
                  : 'btn border border-primary bg-primary text-white hover:bg-primary-dark hover:border-primary-dark shadow-sm hover:shadow-md',
                'transition-all duration-300 ease-in-out font-bold text-sm px-5 py-2'
              ]"
            >
              {{ t('nav.bookAppointment') }}
            </a>
          </nav>
        </div>
        
        <!-- Mobile menu button -->
        <button 
          @click="toggleMenu" 
          :class="[
            isTransparent ? 'text-white' : 'text-slate-700',
            'md:hidden focus:outline-none transition-colors duration-300 ease-in-out p-1.5 rounded-md hover:bg-slate-100/10'
          ]"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4 border-t border-slate-100 pt-4">
          <div class="flex flex-col space-y-3">
            <router-link 
              v-for="item in navItems" 
              :key="item.path"
              @click="isMenuOpen = false" 
              :to="item.path" 
              :class="[
                isLinkActive(item.path) ? 'text-primary font-bold bg-slate-50' : 'text-slate-700 hover:text-primary hover:bg-slate-50',
                'px-3 py-2 rounded-md font-semibold text-sm transition-all'
              ]"
            >
              {{ t(item.label) }}
            </router-link>
            <a 
              href="tel:+918299792775" 
              class="btn btn-primary w-full text-center py-2.5 font-bold shadow-sm"
            >
              {{ t('nav.bookAppointment') }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>