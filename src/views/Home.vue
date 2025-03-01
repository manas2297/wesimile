<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-light to-primary-dark text-white overflow-hidden">
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      </div>

      <div class="container-custom py-20 md:py-32 relative">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="animate-fade-in-left space-y-6">
            <div class="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-base md:text-lg font-medium mb-4">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-300 to-blue-300 animate-gradient font-bold">
                Welcome to WeSmile Multi Speciality Dental Clinic
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              You Smile, We Too
              <!-- <span class="relative">
                Passion
                <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5.8c54-4 98.5-4.3 137.3-1.2 35.9 2.9 71.8 2.9 107.7 0 38.8-3.1 83.3-2.8 137.3 1.2" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </span> -->
            </h1>
            <p class="text-xl md:text-2xl text-gray-100">
              Experience exceptional dental care with our team of experts. We're committed to giving you the healthy, beautiful smile you deserve.
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <router-link 
                to="/contact" 
                class="btn bg-white text-primary hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                Book Appointment
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
              <router-link 
                to="/about" 
                class="btn border-2 border-white text-white hover:bg-white hover:text-primary transform hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Learn More
              </router-link>
            </div>

            <!-- Trust Indicators -->
            <div class="flex flex-wrap gap-6 pt-8">
              <div class="flex items-center space-x-2">
                <div class="bg-white/20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span class="text-sm">Trusted by 20+ Patients</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-white/20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-sm">24/7 Emergency Care</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-white/20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span class="text-sm">7+ Years Experience</span>
              </div>
            </div>
          </div>

          <!-- Image Section -->
          <div class="hidden md:block animate-fade-in-right relative">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Dental Care" 
              class="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 object-cover w-full h-[600px]"
            >
            <!-- Floating Achievement Cards -->
            <div class="absolute -left-8 top-1/4 bg-white p-4 rounded-lg shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
              <div class="flex items-center space-x-3">
                <div class="bg-primary/10 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="text-gray-800 font-semibold">Expert Dentist</p>
                  <p class="text-gray-500 text-sm">Highly Qualified</p>
                </div>
              </div>
            </div>
            <div class="absolute -right-8 bottom-1/4 bg-white p-4 rounded-lg shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
              <div class="flex items-center space-x-3">
                <div class="bg-primary/10 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-gray-800 font-semibold">Affordable Care</p>
                  <p class="text-gray-500 text-sm">Best Quality Plans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Stats/Highlights -->
    <section class="py-12 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div class="p-6 bg-gradient-to-br from-primary-light to-primary rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div class="text-4xl font-bold mb-2">7+</div>
            <div class="text-sm">Years of Experience</div>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-primary-light to-primary rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div class="text-4xl font-bold mb-2">20+</div>
            <div class="text-sm">Happy Patients</div>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-primary-light to-primary rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div class="text-4xl font-bold mb-2">5+</div>
            <div class="text-sm">Successful Surgeries </div>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-primary-light to-primary rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
            <div class="text-4xl font-bold mb-2">24/7</div>
            <div class="text-sm">Emergency Care</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="section-title">Our Services</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">We offer a comprehensive range of dental services to meet all your oral health needs.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(service, index) in featuredServices" 
               :key="index"
               class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-300 animate-fade-in-up"
               :style="{ animationDelay: `${index * 200}ms` }">
            <div class="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <h3 class="text-xl font-bold text-center mb-2">{{ service.title }}</h3>
            <p class="text-gray-600 text-center">{{ service.description }}</p>
          </div>
        </div>
        
        <div class="text-center mt-10">
          <router-link to="/about" class="btn btn-primary">View All Services</router-link>
        </div>
      </div>
    </section>
    
    <!-- Special Offers -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Special Offers</h2>
          <p class="text-gray-300">Take advantage of our current promotions</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(offer, index) in specialOffers" 
               :key="index"
               :class="[
                 'p-6 rounded-lg border transform hover:scale-105 transition-all duration-300 relative',
                 offer.popular 
                   ? 'bg-gradient-to-br from-primary to-primary-dark border-primary-light text-white' 
                   : 'bg-white/10 backdrop-blur-lg border-white/20 text-white'
               ]">
            <div v-if="offer.popular" 
                 class="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              Popular
            </div>
            <div class="text-2xl font-bold mb-2" 
                 :class="offer.popular ? 'text-white' : 'text-primary-light'">
              {{ offer.title }}
            </div>
            <div class="text-4xl font-bold mb-4">{{ offer.price }}</div>
            <ul class="space-y-2 mb-6" :class="offer.popular ? 'text-white' : 'text-gray-300'">
              <li v-for="feature in offer.features" :key="feature">✓ {{ feature }}</li>
            </ul>
            <router-link to="/contact" 
                         class="btn w-full"
                         :class="offer.popular ? 'bg-white text-primary hover:bg-gray-100' : 'bg-primary-light text-white hover:bg-primary'">
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
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" 
               :key="index"
               class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
               :style="{ animationDelay: `${index * 200}ms` }">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 flex">
                <svg v-for="star in testimonial.rating" :key="star" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
              <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
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
    
    <!-- CTA Section -->
    <section class="bg-primary-dark text-white py-16">
      <div class="container-custom text-center animate-fade-in-up">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Schedule Your Visit?</h2>
        <p class="text-lg mb-8 max-w-3xl mx-auto">Contact us today to schedule an appointment. We look forward to helping you achieve a healthy, beautiful smile.</p>
        <router-link to="/contact" class="btn bg-white text-primary-dark hover:bg-gray-100">Book Your Appointment</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHome } from '../composables/useHome'

const { featuredServices, testimonials, specialOffers } = useHome()
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
  animation: gradient 3s linear infinite;
}
</style>