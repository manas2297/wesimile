<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

interface Message {
  text: string
  isBot: boolean
  isHtml?: boolean
}

const isOpen = ref(false)
const message = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const messages = ref<Message[]>([
  { text: "Hello! 👋 I'm your WeSmile Assistant. How can I help you today?", isBot: true }
])

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })

const quickActions = [
  { label: '📅 Book Appointment', action: 'book' },
  { label: '🕒 Clinic Hours', action: 'hours' },
  { label: '📍 Address & Location', action: 'location' },
  { label: '🦷 Special Packages', action: 'prices' },
  { label: '📞 Emergency Contact', action: 'emergency' }
]

const handleQuickAction = (action: string) => {
  let userText = ''
  let botReply = ''
  let isHtml = false

  switch (action) {
    case 'book':
      userText = 'How do I book an appointment?'
      botReply = 'You can easily book an appointment by calling us directly at **+91 9559760487**, or by filling out our online request form on the <a href="/contact" class="text-primary underline font-bold">Contact Page</a>. We look forward to seeing you!'
      isHtml = true
      break
    case 'hours':
      userText = 'What are your opening hours?'
      botReply = 'We are open Monday to Saturday:<br>• **Morning:** 10:00 AM - 2:00 PM<br>• **Evening:** 4:30 PM - 8:30 PM<br>• **Sunday:** On Appointment only.'
      isHtml = true
      break
    case 'location':
      userText = 'Where is the clinic located?'
      botReply = 'WeSmile is located at:<br>📍 **Ground Floor, B 32/112 P, Sushant Smriti, Behind Sankat Mochan Mandir, Near Ram Mishthan, Saket Nagar, Varanasi, 221005**.'
      isHtml = true
      break
    case 'prices':
      userText = 'Do you have any special offers or prices?'
      botReply = 'Yes! We have premium packages available:<br>• **New Patient Package (₹999):** Exam, Digital X-rays, Ultrasonic Scaling, Hygiene consultation.<br>• **Teeth Whitening Offer (₹5999):** Consultation + Full shade whitening session.'
      isHtml = true
      break
    case 'emergency':
      userText = 'I have a dental emergency!'
      botReply = 'If you are experiencing severe pain or a dental emergency, please call Dr. Neha immediately at **+91 9559760487**. We prioritize emergency checkups to get you out of pain fast!'
      isHtml = true
      break
  }

  messages.value.push({ text: userText, isBot: false })
  triggerBotResponse(botReply, isHtml)
}

const triggerBotResponse = (replyText: string, isHtml = false) => {
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({ text: replyText, isBot: true, isHtml })
  }, 1000)
}

const sendMessage = () => {
  if (!message.value.trim()) return

  const userQuery = message.value.trim()
  messages.value.push({ text: userQuery, isBot: false })
  message.value = ''

  const queryLower = userQuery.toLowerCase()
  let botReply = "Thanks for your message! Dr. Neha's team will get back to you shortly. You can also reach us directly at **+91 9559760487**."
  let isHtml = false

  if (queryLower.includes('book') || queryLower.includes('appoint') || queryLower.includes('slot') || queryLower.includes('visit')) {
    botReply = 'You can book a slot instantly by calling us at **+91 9559760487**, or via our <a href="/contact" class="text-primary underline font-bold">Contact Form</a>.'
    isHtml = true
  } else if (queryLower.includes('hour') || queryLower.includes('time') || queryLower.includes('open') || queryLower.includes('sunday')) {
    botReply = 'Our hours are:<br>• **Morning:** 10:00 AM - 2:00 PM<br>• **Evening:** 4:30 PM - 8:30 PM (Mon-Sat).'
    isHtml = true
  } else if (queryLower.includes('address') || queryLower.includes('location') || queryLower.includes('where') || queryLower.includes('map') || queryLower.includes('varanasi')) {
    botReply = 'We are located at Ground Floor, B 32/112 P, Sushant Smriti, Behind Sankat Mochan Mandir, Near Ram Mishthan, Saket Nagar, Varanasi.'
  } else if (queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('charging') || queryLower.includes('offer') || queryLower.includes('whitening')) {
    botReply = 'Our offers:<br>• **Oral Exam & Scaling:** ₹999<br>• **Teeth Whitening:** ₹5999.<br>Contact us for detailed crowns & implant quotes!'
    isHtml = true
  } else if (queryLower.includes('pain') || queryLower.includes('bleed') || queryLower.includes('emergenc') || queryLower.includes('ache')) {
    botReply = '🚨 For dental emergencies, please call us immediately at **+91 9559760487** so we can guide you and schedule an urgent slot.'
  }

  triggerBotResponse(botReply, isHtml)
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 font-sans">
    <!-- Chat Button -->
    <button 
      @click="toggleChat"
      class="bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center relative hover:scale-105 cursor-pointer group"
      aria-label="Toggle Support Chat"
    >
      <svg 
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 group-hover:rotate-6 transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg 
        v-else
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <!-- Subtle Pulse Ping for user attention -->
      <span v-if="!isOpen" class="absolute -top-1 -right-1 flex h-4 w-4">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
        <span class="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
      </span>
    </button>

    <!-- Chat Window -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform translate-y-4 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-4 opacity-0 scale-95"
    >
      <div 
        v-show="isOpen"
        class="absolute bottom-20 right-0 w-[350px] sm:w-[380px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="bg-primary text-white p-4 flex items-center space-x-3.5 shadow-sm">
          <div class="relative">
            <div class="w-10 h-10 rounded-full bg-primary-dark/40 flex items-center justify-center border-2 border-white/80 text-white font-extrabold text-sm">
              WS
            </div>
            <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-primary"></span>
          </div>
          <div>
            <h3 class="text-sm font-bold tracking-wide">WeSmile Assistant</h3>
            <p class="text-xs opacity-90 font-medium">Online • Dr. Neha's Team</p>
          </div>
        </div>

        <!-- Messages Area -->
        <div 
          ref="messagesContainer"
          class="h-[320px] overflow-y-auto p-4 space-y-3.5 bg-slate-50/50"
        >
          <div 
            v-for="(msg, index) in messages" 
            :key="index"
            class="flex flex-col"
            :class="msg.isBot ? 'items-start' : 'items-end'"
          >
            <div 
              class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed"
              :class="msg.isBot ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' : 'bg-primary text-white rounded-tr-none'"
            >
              <div v-if="msg.isHtml" v-html="msg.text"></div>
              <div v-else>{{ msg.text }}</div>
            </div>
          </div>

          <!-- Pulsing Typing Indicator -->
          <div v-if="isTyping" class="flex items-start">
            <div class="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center space-x-1">
              <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce-slow-1"></span>
              <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce-slow-2"></span>
              <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce-slow-3"></span>
            </div>
          </div>
        </div>

        <!-- Quick Action Suggestion Chips -->
        <div class="px-4 py-2 bg-slate-50/20 border-t border-slate-100/50 flex flex-wrap gap-1.5 justify-start">
          <button
            v-for="chip in quickActions"
            :key="chip.action"
            @click="handleQuickAction(chip.action)"
            class="text-[11px] sm:text-[12px] font-bold text-slate-600 bg-white border border-slate-200 hover:border-primary hover:text-primary rounded-full px-3 py-1 transition-all hover:shadow-sm cursor-pointer"
          >
            {{ chip.label }}
          </button>
        </div>

        <!-- Message Input Box -->
        <div class="p-3 bg-white border-t border-slate-100">
          <form @submit.prevent="sendMessage" class="flex items-center space-x-2">
            <input 
              v-model="message"
              type="text"
              placeholder="Ask a question..."
              class="flex-grow px-4 py-2 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-slate-800 bg-slate-50/50"
            >
            <button 
              type="submit"
              class="bg-primary text-white p-2.5 rounded-full hover:bg-primary-dark transition-colors cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Custom animations for bouncing dots */
@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.animate-bounce-slow-1 {
  animation: bounceSlow 1.2s infinite ease-in-out;
}
.animate-bounce-slow-2 {
  animation: bounceSlow 1.2s infinite ease-in-out 0.2s;
}
.animate-bounce-slow-3 {
  animation: bounceSlow 1.2s infinite ease-in-out 0.4s;
}

/* Custom Scrollbar for messages container */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 #F1F5F9;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 5px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #F1F5F9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E1;
  border-radius: 4px;
}
</style>