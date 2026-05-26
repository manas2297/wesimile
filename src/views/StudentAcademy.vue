<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Academy Header -->
      <div class="text-center mb-16">
        <span class="text-secondary font-bold uppercase tracking-wider text-xs bg-secondary-light px-3 py-1.5 rounded-full border border-secondary/20">Supervised Practice</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
          WeSmile <span class="text-primary">Clinical Academy</span>
        </h1>
        <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          Dental students and interns: practice under the supervision of board-certified clinical specialists, log clinical hours, and work with premium dental technologies.
        </p>
      </div>

      <!-- Perks & Application Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Benefits Panel (left) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <span class="w-2 h-6 bg-secondary rounded mr-2.5"></span>
              Supervised Guidance
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Receive live feedback during diagnostic analysis, chair-side procedures, and treatment planning from senior clinicians with 15+ years of clinical experience.
            </p>
          </div>

          <div class="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <span class="w-2 h-6 bg-secondary rounded mr-2.5"></span>
              Modern Clinical Stack
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Work with digital intraoral scanners, CBCT 3D radiography, electronic health records systems, and advanced rotary endodontics systems.
            </p>
          </div>

          <div class="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <span class="w-2 h-6 bg-secondary rounded mr-2.5"></span>
              Clinical Hour Verification
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Get certified validation for university/college clinical requirements. Our supervisors sign off on completed case logs and clinical training hours.
            </p>
          </div>
        </div>

        <!-- Intake Form Panel (right) -->
        <div class="lg:col-span-7">
          <div class="bg-white p-8 rounded-md border border-slate-200 shadow-md">
            <h2 class="text-xl font-bold text-slate-900 mb-6">Internship & Practice Application</h2>

            <!-- Success Alert -->
            <div v-if="submitSuccess" class="bg-secondary-light border border-secondary/30 text-secondary-dark rounded-md p-4 mb-6 text-sm">
              <div class="flex items-center space-x-2 font-semibold">
                <svg class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Application Submitted!</span>
              </div>
              <p class="mt-2 text-secondary-dark">Your details have been recorded. Our clinical supervision team will review your application and contact you/your university coordinator.</p>
            </div>

            <!-- Error Alert -->
            <div v-if="submitError" class="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6 text-sm">
              <div class="flex items-center space-x-2 font-semibold">
                <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Submission Failed</span>
              </div>
              <p class="mt-2 text-red-700">{{ submitError }}</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Honeypot: hidden from real users, bots will fill this -->
              <input
                type="text"
                name="_hp_website"
                v-model="honeypot"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;"
              />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="fullName" class="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    v-model="fullName"
                    type="text"
                    id="fullName"
                    required
                    maxlength="100"
                    placeholder="e.g. Rahul Verma"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-sm"
                  />
                </div>
                
                <div>
                  <label for="school" class="block text-sm font-semibold text-slate-700 mb-1">Dental School / University</label>
                  <input
                    v-model="school"
                    type="text"
                    id="school"
                    required
                    maxlength="150"
                    placeholder="e.g. Government Dental College"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-sm"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="email" class="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    required
                    maxlength="100"
                    placeholder="rahul@university.edu"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-sm"
                  />
                </div>
                
                <div>
                  <label for="phone" class="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    v-model="phone"
                    type="tel"
                    id="phone"
                    required
                    maxlength="15"
                    placeholder="e.g. 9876543210"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-sm"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="yearOfStudy" class="block text-sm font-semibold text-slate-700 mb-1">Year of Study</label>
                  <select
                    v-model="yearOfStudy"
                    id="yearOfStudy"
                    class="block w-full border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-sm"
                  >
                    <option value="1st_year">1st Year (BDS)</option>
                    <option value="2nd_year">2nd Year (BDS)</option>
                    <option value="3rd_year">3rd Year (BDS)</option>
                    <option value="4th_year">4th Year (BDS)</option>
                    <option value="residency">Resident / MDS Intern</option>
                    <option value="other">Other Trainee</option>
                  </select>
                </div>

                <div>
                  <label for="specialtyInterest" class="block text-sm font-semibold text-slate-700 mb-1">Specialty Focus</label>
                  <select
                    v-model="specialtyInterest"
                    id="specialtyInterest"
                    class="block w-full border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-sm"
                  >
                    <option value="general">General Dentistry & Scaling</option>
                    <option value="orthodontics">Orthodontics & Aligners</option>
                    <option value="implants">Implants & Restorative</option>
                    <option value="surgery">Oral Surgery</option>
                    <option value="pediatric">Pediatric Care</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="resumeUrl" class="block text-sm font-semibold text-slate-700 mb-1">Resume / LinkedIn Profile Link</label>
                <input
                  v-model="resumeUrl"
                  type="url"
                  id="resumeUrl"
                  required
                  maxlength="250"
                  placeholder="https://linkedin.com/in/yourprofile"
                  class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-sm"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-slate-700 mb-1">Statement of Purpose / Message</label>
                <textarea
                  v-model="message"
                  id="message"
                  required
                  rows="3"
                  maxlength="1000"
                  placeholder="Explain why you want to train under WeSmile and what clinical hours/verification requirements you have..."
                  class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-sm"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-primary text-white py-3 rounded-md font-bold text-sm shadow hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span v-if="isSubmitting">Submitting Application...</span>
                  <span v-else>Apply for Clinical Hours</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useStudentForm } from '../composables/useStudentForm'

const {
  fullName,
  email,
  phone,
  school,
  yearOfStudy,
  specialtyInterest,
  resumeUrl,
  message,
  honeypot,
  isSubmitting,
  submitError,
  submitSuccess,
  handleSubmit
} = useStudentForm()
</script>
