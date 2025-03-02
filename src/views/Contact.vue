<template>
  <div>
    <section class="section">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="bg-gradient-to-br from-primary-light to-primary p-1 rounded-2xl shadow-xl">
            <div class="bg-white p-8 rounded-2xl">
              <h2 class="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Contact Us</h2>
              <p class="text-gray-600 text-center mb-8">We're here to help! Send us a message and we'll get back to you soon.</p>
              
              <form 
                @submit.prevent="handleSubmit" 
                class="space-y-6"
                data-netlify="true"
                name="contact"
                method="POST"
                id="contact-form"
                autocomplete="on">
                <input type="hidden" name="form-name" value="contact" />
                <div v-if="submitSuccess" class="p-4 bg-green-50 text-green-700 rounded-lg mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
                <div v-if="submitError" class="p-4 bg-red-50 text-red-700 rounded-lg mb-6">
                  {{ submitError }}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="relative">
                    <label for="contact-name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      id="contact-name" 
                      v-model="name" 
                      required
                      autocomplete="name"
                      class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                      placeholder="John Doe"
                      :disabled="isSubmitting"
                    >
                  </div>
                  
                  <div class="relative">
                    <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      id="contact-email" 
                      v-model="email" 
                      required
                      autocomplete="email"
                      class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                      placeholder="john@example.com"
                      :disabled="isSubmitting"
                    >
                  </div>
                </div>
                
                <div class="relative">
                  <label for="contact-phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </span>
                    <input 
                      name="phone"
                      type="tel" 
                      id="contact-phone" 
                      v-model="phone"
                      autocomplete="tel"
                      class="mt-1 block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                      placeholder="+91 98765 43210"
                      :disabled="isSubmitting"
                    >
                  </div>
                </div>
                
                <div class="relative">
                  <label for="contact-message" class="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea 
                    name="message"
                    id="contact-message" 
                    v-model="message" 
                    rows="4" 
                    required
                    autocomplete="off"
                    class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                    placeholder="Tell us how we can help you..."
                    :disabled="isSubmitting"
                  ></textarea>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input 
                      type="checkbox" 
                      id="privacy-policy" 
                      name="privacy"
                      required
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      :disabled="isSubmitting"
                    >
                    <label for="privacy-policy" class="ml-2 block text-sm text-gray-700">
                      I agree to the privacy policy
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    id="submit-button"
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting">Sending...</span>
                    <span v-else>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Contact Info Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div class="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Phone</h3>
              <p class="text-gray-600">{{ contact.phone.primary }}</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div class="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Social Media</h3>
              <p class="text-gray-600">{{ contact.social.email }}</p>
              <p class="text-gray-600">{{ contact.social.instagram }}</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div class="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Location</h3>
              <p class="text-gray-600">{{ contact.location.address }}</p>
              <p class="text-gray-600">{{ contact.location.city }}, {{ contact.location.state }} {{ contact.location.pincode }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">Find answers to some of the most common questions about our dental services.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(faq, index) in contact.faqs" 
               :key="index" 
               class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-3">{{ faq.question }}</h3>
            <p class="text-gray-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useContent } from '../composables/useContent'
import { useContactForm } from '../composables/useContactForm'

const { contact } = useContent()
const {
  name,
  email,
  phone,
  message,
  isSubmitting,
  submitError,
  submitSuccess,
  handleSubmit
} = useContactForm()
</script>