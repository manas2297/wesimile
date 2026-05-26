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
import { signInAnonymously } from 'firebase/auth'
import { auth, db } from '../config/firebase'

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

  // Helper to wait for initial auth state
  const getCurrentUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!auth) {
        resolve(null)
        return
      }
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }

  // 1. Subscribe to real-time chat messages
  const startChatListener = async () => {
    if (!db || !auth) return

    loading.value = true
    try {
      let user = auth.currentUser
      if (!user) {
        user = await getCurrentUser()
      }

      // Sign in anonymously if no persistent user exists
      if (!user) {
        const credentials = await signInAnonymously(auth)
        user = credentials.user
      }

      const uid = user?.uid
      if (!uid) throw new Error('No user UID found after anonymous sign-in')

      visitorId.value = uid
      localStorage.setItem('wesmile_visitor_id', uid)

      const messagesRef = collection(db, 'chats', uid, 'messages')
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
    } catch (error) {
      console.error('Failed to start anonymous chat connection:', error)
      loading.value = false
    }
  }

  // 2. Send a message to Firestore
  const sendVisitorMessage = async (text: string) => {
    if (!db || !auth || !text.trim()) return

    try {
      let user = auth.currentUser
      if (!user) {
        user = await getCurrentUser()
      }

      if (!user) {
        const credentials = await signInAnonymously(auth)
        user = credentials.user
      }

      const uid = user?.uid
      if (!uid) throw new Error('No user UID found')

      visitorId.value = uid
      localStorage.setItem('wesmile_visitor_id', uid)

      const chatDocRef = doc(db, 'chats', uid)
      const messagesCollectionRef = collection(db, 'chats', uid, 'messages')

      // Update parent session details for the admin console list
      await setDoc(chatDocRef, {
        visitorId: uid,
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
