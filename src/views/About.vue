<script setup lang="ts">
import { useContent } from '../composables/useContent'
const { services, team } = useContent()

// Combine featured and all services for the About page
const allServices = [...services.featured, ...services.all]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-primary text-white py-16">
      <div class="container-custom">
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
              Founded in 2005, WeSmile has been providing quality dental services to our community for over 20 years. What started as a small practice has grown into a modern dental clinic with state-of-the-art equipment and a team of experienced professionals.
            </p>
            <p class="text-gray-600 mb-6">
              Our mission is to deliver exceptional dental care in a comfortable and welcoming environment. We believe that everyone deserves a healthy, beautiful smile, and we're committed to making that a reality for all our patients.
            </p>
            <p class="text-gray-600">
              At WeSmile, we combine advanced technology with personalized care to ensure that each patient receives the best possible treatment tailored to their unique needs.
            </p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Dental Team" class="rounded-lg shadow-xl">
          </div>
        </div>
      </div>
    </section>
    
    <!-- Our Team Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="section-title">Meet Our Team</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">Our team of dental professionals is dedicated to providing you with the highest quality care in a comfortable and friendly environment.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="member in team" :key="member.name" class="bg-white rounded-lg overflow-hidden shadow-md">
            <img :src="member.image" :alt="member.name" class="w-full h-64 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ member.name }}</h3>
              <p class="text-primary font-medium mb-3">{{ member.role }}</p>
              <p class="text-gray-600 mb-4">{{ member.description }}</p>
              <div class="flex space-x-3">
                <a v-if="member.social.facebook" :href="member.social.facebook" class="text-gray-400 hover:text-primary">
                  <!-- Facebook icon -->
                </a>
                <a v-if="member.social.instagram" :href="member.social.instagram" class="text-gray-400 hover:text-primary">
                  <!-- Instagram icon -->
                </a>
                <a v-if="member.social.twitter" :href="member.social.twitter" class="text-gray-400 hover:text-primary">
                  <!-- Twitter icon -->
                </a>
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
    
    <!-- CTA Section -->
    <section class="bg-primary-dark text-white py-16">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Schedule Your Visit?</h2>
        <p class="text-lg mb-8 max-w-3xl mx-auto">Contact us today to schedule an appointment. We look forward to helping you achieve a healthy, beautiful smile.</p>
        <router-link to="/contact" class="btn bg-white text-primary-dark hover:bg-gray-100">Book Your Appointment</router-link>
      </div>
    </section>
  </div>
</template>