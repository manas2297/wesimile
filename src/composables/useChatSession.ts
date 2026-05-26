import { ref, onUnmounted } from 'vue'
import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'

export interface ChatMessage {
  id?: string
  text: string
  sender: 'visitor' | 'admin'
  timestamp: Timestamp
}

export function useChatSession() {
  const visitorId = ref<string>('')
  const messages = ref<ChatMessage[]>([])
  const loading = ref(false)
  const isTyping = ref(false)
  let unsubscribe: (() => void) | null = null

  // 1. Get or generate persistent visitor ID
  const initVisitorId = () => {
    let id = localStorage.getItem('wesmile_visitor_id')
    if (!id) {
      id = 'visitor_' + Math.random().toString(36).substring(2, 11)
      localStorage.setItem('wesmile_visitor_id', id)
    }
    visitorId.value = id
  }

  // 2. Subscribe to real-time chat messages
  const startChatListener = () => {
    if (!db) return
    initVisitorId()

    loading.value = true
    const messagesRef = collection(db, 'chats', visitorId.value, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    unsubscribe = onSnapshot(q, (snapshot) => {
      messages.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[]
      loading.value = false
    }, (error) => {
      console.error('Error listening to chat messages:', error)
      loading.value = false
    })
  }

  // 3. Send a message to Firestore
  const sendVisitorMessage = async (text: string) => {
    if (!db || !text.trim()) return
    initVisitorId()

    const chatDocRef = doc(db, 'chats', visitorId.value)
    const messagesCollectionRef = collection(db, 'chats', visitorId.value, 'messages')

    try {
      // Update parent session details for the admin console list
      await setDoc(chatDocRef, {
        visitorId: visitorId.value,
        lastMessage: text,
        updatedAt: serverTimestamp()
      }, { merge: true })

      // Write the message to subcollection
      await addDoc(messagesCollectionRef, {
        text,
        sender: 'visitor',
        timestamp: serverTimestamp()
      })
    } catch (error) {
      console.error('Failed to send visitor message:', error)
    }
  }

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    visitorId,
    messages,
    loading,
    isTyping,
    startChatListener,
    sendVisitorMessage
  }
}
