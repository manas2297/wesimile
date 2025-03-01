<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{
  title?: string
  description?: string
  buttonText?: string
}>()

const defaultProps = {
  title: 'Ready to Schedule Your Visit?',
  description: 'Contact us today to schedule an appointment. We look forward to helping you achieve a healthy, beautiful smile.',
  buttonText: 'Book Your Appointment'
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.2
  })

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Background with gradient and pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary">
      <div class="absolute inset-0 opacity-10" 
           style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')">
      </div>
    </div>

    <!-- Content -->
    <div class="container-custom relative z-10 py-20">
      <div class="text-center text-white max-w-4xl mx-auto animate-on-scroll fade-up">
        <!-- Decorative elements -->
        <div class="absolute top-0 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s;"></div>

        <h2 class="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll fade-up">
          {{ title || defaultProps.title }}
        </h2>
        
        <p class="text-lg mb-8 text-white/90 max-w-3xl mx-auto animate-on-scroll fade-up" style="animation-delay: 0.2s;">
          {{ description || defaultProps.description }}
        </p>
        
        <router-link 
          to="/contact" 
          class="inline-flex items-center px-8 py-4 bg-white text-primary-dark rounded-full font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl animate-on-scroll fade-up group"
          style="animation-delay: 0.4s;"
        >
          {{ buttonText || defaultProps.buttonText }}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>

        <!-- Optional: Floating shapes for added visual interest -->
        <div class="absolute left-10 top-10 animate-float" style="animation-delay: 0.5s;">
          <div class="w-3 h-3 bg-white/30 rounded-full"></div>
        </div>
        <div class="absolute right-10 bottom-10 animate-float" style="animation-delay: 1s;">
          <div class="w-4 h-4 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.show {
  opacity: 1;
  transform: translateY(0);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

.animate-pulse {
  animation: pulse 4s ease-in-out infinite;
}
</style> 