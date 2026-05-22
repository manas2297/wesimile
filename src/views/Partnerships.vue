<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header / Introduction -->
      <div class="text-center mb-16">
        <span class="text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">B2B Collaboration</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
          Dental Product & Tech <span class="text-primary">Partnerships</span>
        </h1>
        <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          WeSmile partners with leading oral care brands, diagnostic AI startups, and medical equipment manufacturers to test, validate, and scale clinical innovations.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Info Cards column (left) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <span class="w-2 h-6 bg-teal-600 rounded mr-2.5"></span>
              Clinical Trials & Validation
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Leverage WeSmile's clinic network and expert dentists to run pilots, collect clinical diagnostics, and validate advanced imaging softwares or devices.
            </p>
          </div>

          <div class="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <span class="w-2 h-6 bg-teal-600 rounded mr-2.5"></span>
              Product Distribution
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Introduce premium oral care products directly to patients. We provide recommended toothpaste, electric brushes, and mouthwashes with direct in-clinic display.
            </p>
          </div>

          <div class="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <span class="w-2 h-6 bg-teal-600 rounded mr-2.5"></span>
              Co-Branded Aligners
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Certified preferred practitioner network for leading custom clear aligner manufacturers, ensuring top-tier orthodontics and patient compliance.
            </p>
          </div>
        </div>

        <!-- Form column (right) -->
        <div class="lg:col-span-7">
          <div class="bg-white p-8 rounded-md border border-slate-200 shadow-md">
            <h2 class="text-xl font-bold text-slate-900 mb-6">Partnership Application</h2>

            <!-- Success Alert -->
            <div v-if="submitSuccess" class="bg-teal-50 border border-teal-200 text-teal-800 rounded-md p-4 mb-6 text-sm">
              <div class="flex items-center space-x-2 font-semibold">
                <svg class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Submission Successful!</span>
              </div>
              <p class="mt-2 text-teal-700">Thank you for reaching out. Our business development team will review your proposal and contact you shortly.</p>
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
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="companyName" class="block text-sm font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    v-model="companyName"
                    type="text"
                    id="companyName"
                    required
                    maxlength="100"
                    placeholder="e.g. Acme Dental Tech"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow text-sm"
                  />
                </div>
                
                <div>
                  <label for="contactName" class="block text-sm font-semibold text-slate-700 mb-1">Contact Name</label>
                  <input
                    v-model="contactName"
                    type="text"
                    id="contactName"
                    required
                    maxlength="100"
                    placeholder="e.g. Dr. Rohan Sharma"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow text-sm"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="email" class="block text-sm font-semibold text-slate-700 mb-1">Business Email</label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    required
                    maxlength="100"
                    placeholder="rohan@company.com"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow text-sm"
                  />
                </div>
                
                <div>
                  <label for="phone" class="block text-sm font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    v-model="phone"
                    type="tel"
                    id="phone"
                    required
                    maxlength="15"
                    placeholder="e.g. 9876543210"
                    class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="partnershipType" class="block text-sm font-semibold text-slate-700 mb-1">Partnership Focus</label>
                <select
                  v-model="partnershipType"
                  id="partnershipType"
                  class="block w-full border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white text-sm"
                >
                  <option value="clinical_trials">Clinical Trials & AI Diagnostics</option>
                  <option value="distribution">Retail & Distribution Partnerships</option>
                  <option value="co_branding">Co-Branding & Sponsorships</option>
                  <option value="other">Other Collaboration</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-slate-700 mb-1">Proposal Pitch / Message</label>
                <textarea
                  v-model="message"
                  id="message"
                  required
                  rows="4"
                  maxlength="1000"
                  placeholder="Outline your partnership concept, product detail, or integration proposal..."
                  class="block w-full border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow text-sm"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-primary text-white py-3 rounded-md font-bold text-sm shadow hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span v-if="isSubmitting">Submitting Pitch...</span>
                  <span v-else>Submit Partnership Proposal</span>
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
import { usePartnershipForm } from '../composables/usePartnershipForm'

const {
  companyName,
  contactName,
  email,
  phone,
  partnershipType,
  message,
  isSubmitting,
  submitError,
  submitSuccess,
  handleSubmit
} = usePartnershipForm()
</script>
