<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[95vh] lg:min-h-screen bg-gradient-to-br from-[#c15029] via-[#ac401a] to-[#7f2b0f] text-white flex flex-col justify-between overflow-hidden">
      <!-- Ambient light glowing effects -->
      <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <!-- Center bright glow behind implant -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-200/25 via-orange-300/10 to-transparent rounded-full blur-[130px]"></div>
        <!-- Left ambient light -->
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[120px]"></div>
        <!-- Subtle dark vignette at the bottom/sides -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15"></div>
      </div>

      <!-- Main Content Container -->
      <div class="container-custom flex-grow flex flex-col justify-center relative z-10 pt-28 lg:pt-32 pb-0">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full py-6 lg:py-10">
          
          <!-- Column 1: Headline, Subtitle & CTAs -->
          <div class="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8 animate-fade-in-left">
            <!-- Welcome Tag -->
            <div class="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold max-w-max border border-white/10 text-white/90">
              <span class="tracking-wide font-bold">
                {{ t('hero.welcome') }}
              </span>
            </div>
            
            <!-- Headline (typographic contrast: normal/light vs bold) -->
            <h1 class="text-6xl md:text-7xl lg:text-[6.5rem] font-light leading-[1.0] tracking-tight text-white select-none">
              You Smile,<br />
              <span class="font-bold text-white">We Too</span>
            </h1>
            
            <p class="text-lg md:text-xl text-white/85 max-w-[540px] leading-relaxed">
              {{ t('hero.subtitle') }}
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-2">
              <router-link 
                to="/contact" 
                class="btn bg-white text-[#ac401a] hover:bg-white/90 shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-center font-bold px-8 py-3.5 rounded-lg"
              >
                {{ t('hero.cta') }}
              </router-link>
              <router-link 
                to="/about" 
                class="btn border border-white/30 text-white hover:bg-white/10 transform hover:-translate-y-0.5 transition-all duration-300 text-center font-semibold px-8 py-3.5 rounded-lg"
              >
                {{ t('hero.learnMore') }}
              </router-link>
            </div>
          </div>
          
          <!-- Column 2: Premium Clinic/Dental Image -->
          <div class="lg:col-span-5 flex justify-center items-center relative py-6 lg:py-0 min-h-[360px] lg:min-h-[480px] animate-fade-in-right">
            <!-- Ambient glows behind the image -->
            <div class="absolute w-[320px] h-[320px] bg-amber-400/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div class="absolute w-56 h-56 bg-orange-500/15 rounded-full blur-[60px] pointer-events-none"></div>
            
            <img 
              :src="perfectSmileHero" 
              alt="WeSmile Premium Dental Clinic" 
              class="relative z-10 w-full max-w-[340px] md:max-w-[380px] lg:max-w-full h-[380px] md:h-[420px] lg:h-[480px] object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 select-none pointer-events-none transform hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          
        </div>
      </div>
      
      <!-- Bottom Row Metadata Stats -->
      <div class="border-t border-white/15 w-full mt-auto">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-0 text-left">
            <!-- Stat 1 -->
            <div class="md:col-span-5 py-4 md:py-6 md:pr-8 flex flex-col justify-center space-y-1 border-b border-white/10 md:border-b-0 md:border-r border-white/15">
              <span class="text-white/60 text-[10px] md:text-xs font-semibold uppercase tracking-widest">Clinical Reputation</span>
              <span class="text-sm md:text-base font-bold text-white tracking-wider">Varanasi's Leading Dentistry 2026</span>
            </div>
            
            <!-- Stat 2 -->
            <div class="md:col-span-4 py-4 md:py-6 md:px-8 flex flex-col justify-center space-y-1 border-b border-white/10 md:border-b-0 md:border-r border-white/15">
              <span class="text-white/60 text-[10px] md:text-xs font-semibold uppercase tracking-widest">Varanasi Local Time</span>
              <span class="text-sm md:text-base font-bold text-white font-mono tracking-wider">
                {{ localTime || '19:00:00 GMT+5:30' }}
              </span>
            </div>
            
            <!-- Stat 3 -->
            <div class="md:col-span-3 py-4 md:py-6 md:pl-8 flex flex-col justify-center space-y-1">
              <span class="text-white/60 text-[10px] md:text-xs font-semibold uppercase tracking-widest">Advanced Technology</span>
              <span class="text-sm md:text-base font-bold text-white tracking-wider">Micro-Endodontics & 3D Imaging</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Stats/Highlights -->
    <section class="py-12 bg-slate-50 border-y border-slate-200">
      <div class="container-custom">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-6 bg-white border border-slate-200 rounded-md shadow-sm transform hover:-translate-y-0.5 transition-all duration-300">
            <div class="text-4xl font-extrabold text-primary mb-2">7+</div>
            <div class="text-sm font-semibold text-slate-700">Years of Experience</div>
          </div>
          
          <div class="p-6 bg-white border border-slate-200 rounded-md shadow-sm transform hover:-translate-y-0.5 transition-all duration-300">
            <div class="text-4xl font-extrabold text-primary mb-2">100+</div>
            <div class="text-sm font-semibold text-slate-700">Happy Patients</div>
          </div>
          
          <div class="p-6 bg-white border border-slate-200 rounded-md shadow-sm transform hover:-translate-y-0.5 transition-all duration-300">
            <div class="text-4xl font-extrabold text-primary mb-2">50+</div>
            <div class="text-sm font-semibold text-slate-700">Successful Surgeries</div>
          </div>
          
          <div class="p-6 bg-white border border-slate-200 rounded-md shadow-sm transform hover:-translate-y-0.5 transition-all duration-300">
            <div class="text-4xl font-extrabold text-primary mb-2">100%</div>
            <div class="text-sm font-semibold text-slate-700">Patient Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="section bg-slate-50">
      <div class="container-custom">
        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="section-title text-primary">Our Featured Services</h2>
          <p class="text-slate-600 max-w-3xl mx-auto">We offer a comprehensive range of dental services to meet all your oral health needs with professional care.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(service, index) in featuredServices" 
               :key="index"
               class="bg-white p-6 rounded-md border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
               :style="{ animationDelay: `${index * 200}ms` }">
            <div class="w-16 h-16 bg-secondary-light rounded-md flex items-center justify-center mb-4 mx-auto text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="service.title === 'Preventive Care'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                
                <path v-if="service.title === 'Cosmetic Dentistry'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                
                <path v-if="service.title === 'Restorative Dentistry'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                
                <path v-if="service.title === 'Digital X-rays'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                
                <path v-if="service.title === 'Orthodontic Treatment'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                
                <path v-if="service.title === 'Endodontics'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 3c1.5 0 2.5 1 3 2 1.5 0 2.5 1 3 2 1 2 1 4-1 8-1 2-2 3-3 4-1 1-1.5 1.5-2 1.5s-1-.5-2-1.5c-1-1-2-2-3-4-2-4-2-6-1-8 .5-1 1.5-2 3-2 .5-1 1.5-2 3-2z" />
                
                <path v-if="service.title === 'Oral Surgery'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                
                <path v-if="service.title === 'Pediatric Dentistry'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                
                <path v-if="service.title === 'Implants'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 text-center mb-2">{{ service.title }}</h3>
            <p class="text-slate-600 text-center text-sm leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
        
        <div class="text-center mt-10">
          <router-link to="/about" class="btn btn-primary shadow-sm hover:shadow-md transition-shadow">View All Services</router-link>
        </div>
      </div>
    </section>
    
    <!-- Special Offers -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-primary">Special Offers</h2>
          <p class="text-slate-600">Take advantage of our clinical care promotions</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(offer, index) in specialOffers" 
               :key="index"
               :class="[
                 'p-8 rounded-md border transition-all duration-300 relative flex flex-col justify-between shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
                 offer.popular 
                   ? 'bg-primary border-primary text-white shadow-md' 
                   : 'bg-slate-50 border-slate-200 text-slate-800'
               ]">
            <div>
              <div v-if="offer.popular" 
                   class="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                Popular
              </div>
              <div class="text-2xl font-bold mb-2" 
                   :class="offer.popular ? 'text-white' : 'text-primary'">
                {{ offer.title }}
              </div>
              <div class="text-4xl font-extrabold mb-4" :class="offer.popular ? 'text-white' : 'text-slate-900'">{{ offer.price }}</div>
              <ul class="space-y-3 mb-8" :class="offer.popular ? 'text-slate-100' : 'text-slate-600'">
                <li v-for="feature in offer.features" :key="feature" class="flex items-center text-sm font-medium">
                  <svg class="h-5 w-5 mr-2 shrink-0" :class="offer.popular ? 'text-secondary-light' : 'text-secondary'" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <router-link to="/contact" 
                         class="btn w-full text-center py-3 font-semibold rounded-md shadow-sm transition-all duration-300 text-sm"
                         :class="offer.popular ? 'bg-secondary text-white hover:bg-secondary-dark' : 'bg-primary text-white hover:bg-primary-dark'">
              Book Now
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Why Choose Us Section -->
    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in-left">
            <h2 class="section-title">Why Choose WeSmile?</h2>
            <div class="space-y-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-medium text-gray-900">Experienced Team</h3>
                  <p class="mt-2 text-gray-600">Our team of dental professionals has years of experience and stays up-to-date with the latest techniques.</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-medium text-gray-900">Modern Facility</h3>
                  <p class="mt-2 text-gray-600">Our clinic is equipped with state-of-the-art technology to provide the best possible care.</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-medium text-gray-900">Patient-Centered Approach</h3>
                  <p class="mt-2 text-gray-600">We prioritize your comfort and satisfaction, ensuring a positive dental experience.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="animate-fade-in-right">
            <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Dental Office" class="rounded-lg shadow-xl">
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="section-title">What Our Patients Say</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">Don't just take our word for it. Here's what our patients have to say about their experience with us.</p>
        </div>
        
        <TestimonialSlider :testimonials="testimonials" />
              </div>
    </section>
    
    <!-- Our Latest Technology -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Latest Technology</h2>
          <p class="text-gray-600">Experience modern dentistry with our state-of-the-art equipment</p>
            </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <!-- Replace with actual image -->
              <img src="https://plus.unsplash.com/premium_photo-1658506655357-8713cf0c6b69??ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                   alt="Digital X-Ray" 
                   class="w-full h-full object-cover">
            </div>
            <h3 class="text-xl font-bold mb-2">Digital X-Rays</h3>
            <p class="text-gray-600">Less radiation, instant results, and better diagnosis with our digital X-ray technology.</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <!-- Replace with actual image -->
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                   alt="Intraoral Camera" 
                   class="w-full h-full object-cover">
            </div>
            <h3 class="text-xl font-bold mb-2">Intraoral Camera</h3>
            <p class="text-gray-600">See what we see with HD intraoral cameras that show the details of your oral health.</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <!-- Replace with actual image -->
              <img src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                   alt="Laser Dentistry" 
                   class="w-full h-full object-cover">
            </div>
            <h3 class="text-xl font-bold mb-2">Laser Dentistry</h3>
            <p class="text-gray-600">Precise, comfortable treatments with advanced dental laser technology.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Replace the CTA section with the new component -->
    <CTASection 
      title="Transform Your Smile Today" 
      description="Experience the difference of modern dentistry with our expert care and state-of-the-art technology."
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHome } from '../composables/useHome'
import { useTranslations } from '../locales/translations'
import TestimonialSlider from '../components/TestimonialSlider.vue'
import CTASection from '../components/CTASection.vue'
import perfectSmileHero from '../assets/perfect_smile_hero.png'

const { featuredServices, testimonials, specialOffers } = useHome()
const { t } = useTranslations()

// Live local Varanasi time clock
const localTime = ref('')
const updateTime = () => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  try {
    localTime.value = new Intl.DateTimeFormat('en-US', options).format(new Date()) + ' GMT+5:30'
  } catch (e) {
    localTime.value = new Date().toLocaleTimeString()
  }
}

onMounted(() => {
  updateTime()
  const timer = setInterval(updateTime, 1000)
  onUnmounted(() => clearInterval(timer))
})
</script>

<style>
/* Animation Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* Animation Classes */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.6s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.6s ease-out forwards;
  opacity: 0;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Hover Animations */
.transform {
  transition-property: transform;
}

.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:-translate-y-2:hover {
  transform: translateY(-8px);
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s ease infinite;
  background-clip: text;
  -webkit-background-clip: text;
}
</style>