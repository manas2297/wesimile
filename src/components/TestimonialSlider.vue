<script setup lang="ts">
import { ref, computed } from 'vue'

interface Testimonial {
  name: string
  quote: string
  rating: number
}

const props = defineProps<{
  testimonials: Testimonial[]
}>()

const currentPage = ref(0)
const itemsPerPage = 3

const totalPages = computed(() => Math.ceil(props.testimonials.length / itemsPerPage))

const displayedTestimonials = computed(() => {
  const start = currentPage.value * itemsPerPage
  return props.testimonials.slice(start, start + itemsPerPage)
})

const nextSlide = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

const prevSlide = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <div class="relative px-16">
    <!-- Navigation Buttons -->
    <button 
      @click="prevSlide"
      class="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all z-10"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === 0 }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      @click="nextSlide"
      class="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all z-10"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages - 1 }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Testimonials Container -->
    <div>
      <div 
        class="grid grid-cols-1 md:grid-cols-3 gap-8 transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentPage * 100}%)` }"
      >
        <div 
          v-for="testimonial in displayedTestimonials" 
          :key="testimonial.name"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div class="flex items-center mb-4">
            <div class="text-yellow-400 flex">
              <svg 
                v-for="star in testimonial.rating" 
                :key="star" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <p class="text-gray-600 mb-4">"{{ testimonial.quote }}"</p>
          <div class="font-medium">
            <p class="text-gray-900">{{ testimonial.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Dots -->
    <div class="flex justify-center mt-8 space-x-2">
      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="goToPage(page - 1)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="currentPage === page - 1 ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'"
      >
        <span class="sr-only">Page {{ page }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide scrollbar */
.overflow-hidden::-webkit-scrollbar {
  display: none;
}

.overflow-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style> 