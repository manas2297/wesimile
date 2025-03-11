<script setup lang="ts">
import { useAbout } from '../composables/useAbout'
import CTASection from '../components/CTASection.vue'
import BouncingBall from '../components/BouncingBall.vue'

const { allServices, team } = useAbout()

// Social icons component function
const getSocialIcon = (platform: string) => {
  return {
    template: platform === 'facebook' 
      ? '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>'
      : platform === 'instagram'
      ? '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>'
      : '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>'
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-primary text-white py-16 relative overflow-hidden">
      <!-- Add the bouncing balls -->
      <BouncingBall />
      <BouncingBall />
      <BouncingBall />
      
      <div class="container-custom relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">About WeSmile</h1>
        <p class="text-lg max-w-3xl">Learn more about our clinic, our team, and our commitment to providing exceptional dental care.</p>
      </div>
    </section>
    
    <!-- Our Story Section -->
    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="section-title">Our Story</h2>
            <p class="text-gray-600 mb-6">
              Welcome to WeSmile Multi Speciality Dental Clinic, where we are dedicated to providing exceptional dental care with a personal touch. With over 7 years of experience, our skilled team of dental professionals, led by Dr. Neha, is committed to ensuring your oral health and comfort are our top priorities. 
            </p>
            <p class="text-gray-600 mb-6">
              Dr. Neha is also certified in endodontics and oral surgery procedures. She had worked for 5 years at Delhi dental academy in New Delhi as an associate dentist and mentor for the students guiding various dental procedure to them. Now she is practicing since 2023 in varanasi as a dentist.
            </p>
            <p class="text-gray-600">
              She had performed over 100 root canal procedures, 50+ surgeries, specialising in the most advanced techniques to preserve your natural teeth
            </p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Dental Team" class="rounded-lg shadow-xl">
          </div>
        </div>
      </div>
    </section>
    
    <!-- Our Team Section -->
    <section class="section bg-gradient-to-br from-gray-50 to-white overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23000000&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      </div>

      <div class="container-custom">
        <div class="text-center mb-16 animate-on-scroll fade-up">
          <span class="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Expert
          </span>
          <h2 class="section-title">Meet Dr. Neha</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">Your trusted dental care provider, committed to delivering exceptional dental services with a gentle touch.</p>
        </div>
        
        <div class="max-w-4xl mx-auto relative">
          <!-- Decorative Elements -->
          <div class="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>

          <div class="bg-white rounded-2xl overflow-hidden shadow-2xl relative z-10 animate-on-scroll fade-up">
            <div class="grid md:grid-cols-2 gap-0">
              <!-- Image Section -->
              <div class="relative overflow-hidden animate-on-scroll fade-left">
                <img 
                  :src="team[0].image" 
                  :alt="team[0].name" 
                  class="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-700"
                  style="min-height: 400px;"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <!-- Floating Stats -->
                <div class="absolute bottom-4 left-4 right-4 flex justify-between text-white">
                  <div class="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div class="font-bold">7+</div>
                    <div class="text-sm">Years Experience</div>
                  </div>
                  <div class="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div class="font-bold">100+</div>
                    <div class="text-sm">Happy Patients</div>
                  </div>
                </div>
              </div>

              <!-- Content Section -->
              <div class="p-8 md:p-12 flex flex-col justify-center animate-on-scroll fade-right">
                <div class="space-y-6">
                  <div>
                    <h3 class="text-3xl font-bold text-gray-900 mb-2">{{ team[0].name }}</h3>
                    <p class="text-primary font-medium text-lg">{{ team[0].role }}</p>
                  </div>
                  
                  <p class="text-gray-600 leading-relaxed">{{ team[0].description }}</p>
                  
                  <!-- Specializations -->
                  <div class="space-y-3">
                    <h4 class="font-semibold text-gray-900">Specializations:</h4>
                    <ul class="grid grid-cols-2 gap-2">
                      <li v-for="spec in ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics']" 
                          :key="spec"
                          class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {{ spec }}
                      </li>
                    </ul>
                  </div>

                  <!-- Social Links -->
                  <div class="flex space-x-4 pt-4">
                    <a v-for="(link, platform) in team[0].social" 
                       :key="platform"
                       :href="link"
                       class="transform hover:scale-110 transition-transform duration-300"
                       :class="link !== '#' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 cursor-not-allowed'"
                       :title="platform">
                      <component :is="getSocialIcon(platform)" class="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="section-title">Our Services</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">We offer a comprehensive range of dental services to meet all your oral health needs.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="service in allServices" 
               :key="service.title"
               class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <!-- Preventive Care -->
                  <path v-if="service.icon === 'shield-check'" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  
                  <!-- Cosmetic -->
                  <path v-if="service.icon === 'smile'" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  
                  <!-- Restorative -->
                  <path v-if="service.icon === 'refresh'" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  
                  <!-- Add other icons based on service.icon -->
                  <path v-if="service.icon === 'x-ray'" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  
                  <!-- Generic icon for other services -->
                  <path v-else
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-medium text-gray-900">{{ service.title }}</h3>
              <p class="mt-2 text-gray-600">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Replace the CTA section with the new component -->
    <CTASection />
  </div>
</template>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.fade-left {
  transform: translateX(-20px);
}

.animate-on-scroll.fade-right {
  transform: translateX(20px);
}

.animate-on-scroll.show {
  opacity: 1;
  transform: translate(0);
}

/* Optional: Add staggered delays for child elements */
.animate-on-scroll.fade-up:nth-child(2) {
  transition-delay: 0.2s;
}

.animate-on-scroll.fade-up:nth-child(3) {
  transition-delay: 0.4s;
}

/* Add smooth transition for hover effects */
.transform {
  transition: all 0.3s ease-in-out;
}

/* Optional: Add floating animation for decorative elements */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.decorative-float {
  animation: float 6s ease-in-out infinite;
}
</style>