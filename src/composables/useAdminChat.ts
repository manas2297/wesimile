import { ref, onUnmounted } from 'vue'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
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
  status?: 'active' | 'completed' | 'deleted'
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
        visitorId: doc.id,
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

  // 4. Archive a chat session
  const archiveSession = async (visitorId: string) => {
    if (!db || !visitorId) return
    const chatDocRef = doc(db, 'chats', visitorId)
    try {
      await updateDoc(chatDocRef, {
        status: 'completed',
        updatedAt: serverTimestamp()
      })
      if (activeSessionId.value === visitorId) {
        activeSessionId.value = ''
      }
    } catch (error) {
      console.error('Failed to archive chat session:', error)
    }
  }

  // 5. Restore an archived session to active
  const restoreSession = async (visitorId: string) => {
    if (!db || !visitorId) return
    const chatDocRef = doc(db, 'chats', visitorId)
    try {
      await updateDoc(chatDocRef, {
        status: 'active',
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Failed to restore chat session:', error)
    }
  }

  // 6. Delete a chat session (and all messages)
  const deleteSession = async (visitorId: string) => {
    if (!db || !visitorId) return
    const chatDocRef = doc(db, 'chats', visitorId)
    try {
      await deleteDoc(chatDocRef)
      if (activeSessionId.value === visitorId) {
        activeSessionId.value = ''
      }
    } catch (error) {
      console.error('Failed to delete chat session:', error)
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
    sendAdminMessage,
    archiveSession,
    restoreSession,
    deleteSession
  }
}
