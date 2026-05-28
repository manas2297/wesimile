<template>
  <div class="min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden font-sans">
    <!-- Left panel - Branding and Features (visible on desktop) -->
    <div class="relative hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-slate-900 border-r border-white/5 overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none"></div>
      <!-- Grid overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none"></div>

      <!-- Top Branding -->
      <div class="relative z-10 flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <span class="text-xl font-bold text-white tracking-tight">WeSmile Admin</span>
      </div>

      <!-- Features / Info section -->
      <div class="relative z-10 my-auto max-w-lg space-y-8">
        <div class="space-y-4">
          <h2 class="text-4xl font-extrabold text-white tracking-tight leading-tight">
            Centralized Platform <br/>
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-slate-200 to-secondary">Management Console</span>
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed">
            Welcome to the secure administrative portal. Access advanced tools to streamline dental clinic operations, engage with patients, and manage platform resources.
          </p>
        </div>

        <div class="grid gap-6">
          <!-- Feature 1 -->
          <div class="flex items-start space-x-4">
            <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-primary flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-sm">Real-time Patient Chat</h3>
              <p class="text-slate-400 text-xs mt-0.5">Communicate directly with clinic visitors and potential patients in real time.</p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="flex items-start space-x-4">
            <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-secondary flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-sm">B2B Partnership Approvals</h3>
              <p class="text-slate-400 text-xs mt-0.5">Review partner inquiries, corporate dental packages, and B2B requests.</p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="flex items-start space-x-4">
            <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-indigo-400 flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-sm">Student Academy Portal</h3>
              <p class="text-slate-400 text-xs mt-0.5">Manage enrollments, review resumes, and process new student applications.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Left Bottom Footer -->
      <div class="relative z-10 text-xs text-slate-500 font-medium">
        © 2026 WeSmile Clinic. All rights reserved.
      </div>
    </div>

    <!-- Right panel - Login form (centered flex container) -->
    <div class="relative flex-1 flex items-center justify-center p-8 lg:p-12 bg-slate-950 overflow-hidden">
      <!-- Background elements for right side on mobile/tablet (hidden/subtle on desktop) -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 lg:hidden pointer-events-none"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px] lg:hidden pointer-events-none"></div>

      <div class="max-w-md w-full relative z-10">
        <!-- Logo/Header (only visible on mobile/tablet instead of left branding) -->
        <div class="text-center mb-8 lg:hidden">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary mb-3 shadow-lg shadow-primary/20">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white mb-1">WeSmile Admin Portal</h1>
          <p class="text-slate-400 text-sm">Sign in to manage the platform</p>
        </div>

        <div class="mb-8 hidden lg:block">
          <h1 class="text-3xl font-extrabold tracking-tight text-white mb-2 bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Sign In
          </h1>
          <p class="text-slate-400 text-sm font-medium">Please enter your credentials to access the admin console.</p>
        </div>

        <!-- Login Card (Glassmorphism) -->
        <div class="backdrop-blur-xl bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
          <form @submit.prevent="handleLogin" class="space-y-6">
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
            
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Email Address
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  class="block w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-white placeholder-slate-500 text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  class="block w-full pl-11 pr-11 py-3 bg-slate-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-white placeholder-slate-500 text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="displayError" class="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl flex items-start animate-shake">
              <svg class="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <span class="text-xs font-medium">{{ displayError }}</span>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>
        </div>

        <p class="text-center text-xs text-slate-600 mt-6 font-semibold tracking-wider uppercase lg:hidden">
          Secure Admin Environment
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useAntiBot } from '../composables/useAntiBot'
import { useRateLimit } from '../composables/useRateLimit'

const router = useRouter()
const { login, error: authError, loading } = useAuth()
const { honeypot, checkBot } = useAntiBot()
const { isRateLimited } = useRateLimit()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const localError = ref('')

const displayError = computed(() => localError.value || authError.value)

const handleLogin = async () => {
  localError.value = ''

  // 1. Honeypot/Timing Bot Check
  const botError = checkBot()
  if (botError) {
    localError.value = botError
    return
  }

  // 2. Rate Limiting Check
  if (await isRateLimited(email.value)) {
    localError.value = 'Too many attempts. Please try again in 5 minutes.'
    return
  }

  const success = await login(email.value, password.value)
  if (success) {
    router.push('/admin/dashboard')
  }
}
</script>
