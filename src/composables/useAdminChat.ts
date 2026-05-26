import { ref, onUnmounted } from 'vue'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { ChatMessage } from './useChatSession'

export interface ChatSession {
  visitorId: string
  lastMessage: string
  updatedAt: Timestamp
}

export function useAdminChat() {
  const sessions = ref<ChatSession[]>([])
  const activeSessionId = ref<string>('')
  const activeMessages = ref<ChatMessage[]>([])
  const sessionsLoading = ref(false)
  const messagesLoading = ref(false)

  let sessionsUnsubscribe: (() => void) | null = null
  let messagesUnsubscribe: (() => void) | null = null

  // 1. Subscribe to all active chat sessions
  const startSessionsListener = () => {
    if (!db) return
    sessionsLoading.value = true

    const sessionsRef = collection(db, 'chats')
    const q = query(sessionsRef, orderBy('updatedAt', 'desc'))

    sessionsUnsubscribe = onSnapshot(q, (snapshot) => {
      sessions.value = snapshot.docs.map((doc) => ({
        ...doc.data()
      })) as ChatSession[]
      sessionsLoading.value = false
    }, (error) => {
      console.error('Error fetching chat sessions:', error)
      sessionsLoading.value = false
    })
  }

  // 2. Subscribe to messages of a selected session
  const selectSession = (visitorId: string) => {
    if (!db) return
    activeSessionId.value = visitorId
    messagesLoading.value = true

    // Unsubscribe from previous session's messages
    if (messagesUnsubscribe) {
      messagesUnsubscribe()
      messagesUnsubscribe = null
    }

    const messagesRef = collection(db, 'chats', visitorId, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    messagesUnsubscribe = onSnapshot(q, (snapshot) => {
      activeMessages.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[]
      messagesLoading.value = false
    }, (error) => {
      console.error('Error fetching chat messages for admin:', error)
      messagesLoading.value = false
    })
  }

  // 3. Send admin response
  const sendAdminMessage = async (text: string) => {
    if (!db || !activeSessionId.value || !text.trim()) return

    const messagesCollectionRef = collection(db, 'chats', activeSessionId.value, 'messages')

    try {
      await addDoc(messagesCollectionRef, {
        text,
        sender: 'admin',
        timestamp: serverTimestamp()
      })
    } catch (error) {
      console.error('Failed to send admin response:', error)
    }
  }

  onUnmounted(() => {
    if (sessionsUnsubscribe) sessionsUnsubscribe()
    if (messagesUnsubscribe) messagesUnsubscribe()
  })

  return {
    sessions,
    activeSessionId,
    activeMessages,
    sessionsLoading,
    messagesLoading,
    startSessionsListener,
    selectSession,
    sendAdminMessage
  }
}
