<script setup lang="ts">
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import { useChatSession } from '../composables/useChatSession'

const isOpen = ref(false)
const message = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const {
  visitorId,
  messages: dbMessages,
  startChatListener,
  sendVisitorMessage
} = useChatSession()

// Combine DB messages and a local default greeting if DB is empty
const displayMessages = computed(() => {
  if (dbMessages.value.length === 0) {
    return [
      { text: "Hello! 👋 I'm your WeSmile Assistant. How can I help you today?", sender: 'admin' }
    ]
  }
  return dbMessages.value
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    startChatListener()
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

watch(displayMessages, () => {
  scrollToBottom()
}, { deep: true })

onMounted(() => {
  // If already logged in / visitor session exists, load it
  if (localStorage.getItem('wesmile_visitor_id')) {
    startChatListener()
  }
})

const quickActions = [
  { label: '📅 Book Appointment', action: 'book' },
  { label: '🕒 Clinic Hours', action: 'hours' },
  { label: '📍 Address & Location', action: 'location' },
  { label: '🦷 Special Packages', action: 'prices' },
  { label: '📞 Emergency Contact', action: 'emergency' }
]

const handleQuickAction = async (action: string) => {
  let userText = ''
  let botReply = ''

  switch (action) {
    case 'book':
      userText = 'How do I book an appointment?'
      botReply = 'You can book by calling us at +91 9559760487 or via our online Contact Page.'
      break
    case 'hours':
      userText = 'What are your opening hours?'
      botReply = 'Monday to Saturday: Morning: 10:00 AM - 2:00 PM, Evening: 4:30 PM - 8:30 PM. Sunday: On Appointment.'
      break
    case 'location':
      userText = 'Where is the clinic located?'
      botReply = 'We are located at Ground Floor, B 32/112 P, Sushant Smriti, Behind Sankat Mochan Mandir, Near Ram Mishthan, Saket Nagar, Varanasi.'
      break
    case 'prices':
      userText = 'Do you have special offers?'
      botReply = 'Yes! New Patient Package: ₹999 (scaling, exam, x-ray). Teeth Whitening: ₹5999.'
      break
    case 'emergency':
      userText = 'I have a dental emergency!'
      botReply = 'For emergency assistance, call us immediately at +91 9559760487.'
      break
  }

  // 1. Write the visitor question to Firestore
  await sendVisitorMessage(userText)
  
  // 2. Write the bot's auto reply to Firestore (with sender: 'admin' so admin sees it)
  setTimeout(async () => {
    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
    const { db } = await import('../config/firebase')
    if (db && visitorId.value) {
      await addDoc(collection(db, 'chats', visitorId.value, 'messages'), {
        text: botReply,
        sender: 'admin',
        timestamp: serverTimestamp()
      })
    }
  }, 800)
}

const sendMessage = async () => {
  if (!message.value.trim()) return

  const userQuery = message.value.trim()
  message.value = ''

  // Send message to Firestore
  await sendVisitorMessage(userQuery)

  // Smart bot auto-response logic (runs if no admin is active yet)
  const queryLower = userQuery.toLowerCase()
  let botReply = ''

  if (queryLower.includes('book') || queryLower.includes('appoint') || queryLower.includes('slot') || queryLower.includes('visit')) {
    botReply = 'You can book a slot instantly by calling us at +91 9559760487, or using our Contact Form.'
  } else if (queryLower.includes('hour') || queryLower.includes('time') || queryLower.includes('open') || queryLower.includes('sunday')) {
    botReply = 'We are open Mon-Sat: 10AM - 2PM and 4:30PM - 8:30PM.'
  } else if (queryLower.includes('address') || queryLower.includes('location') || queryLower.includes('where') || queryLower.includes('map') || queryLower.includes('varanasi')) {
    botReply = 'We are located at Ground Floor, B 32/112 P, Sushant Smriti, Behind Sankat Mochan Mandir, Near Ram Mishthan, Saket Nagar, Varanasi.'
  } else if (queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('charging') || queryLower.includes('offer') || queryLower.includes('whitening')) {
    botReply = 'Exam & Scaling: ₹999. Teeth Whitening: ₹5999. Call us for detailed crowns & implant quotes!'
  } else if (queryLower.includes('pain') || queryLower.includes('bleed') || queryLower.includes('emergenc') || queryLower.includes('ache')) {
    botReply = '🚨 Dental emergency? Call us immediately at +91 9559760487 to schedule an urgent slot.'
  }

  // If we matched a bot reply, write it to Firestore
  if (botReply) {
    setTimeout(async () => {
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
      const { db } = await import('../config/firebase')
      if (db && visitorId.value) {
        await addDoc(collection(db, 'chats', visitorId.value, 'messages'), {
          text: botReply,
          sender: 'admin',
          timestamp: serverTimestamp()
        })
      }
    }, 1000)
  }
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
            v-for="(msg, index) in displayMessages" 
            :key="index"
            class="flex flex-col"
            :class="msg.sender === 'admin' ? 'items-start' : 'items-end'"
          >
            <div 
              class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed"
              :class="msg.sender === 'admin' ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' : 'bg-primary text-white rounded-tr-none'"
            >
              <div>{{ msg.text }}</div>
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