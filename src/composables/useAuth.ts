import { ref, onMounted } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

export function useAuth() {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref('')

  // Listen to auth state changes
  onMounted(() => {
    if (!auth) {
      loading.value = false
      return
    }
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser
      loading.value = false
    })
  })

  const login = async (email: string, password: string) => {
    error.value = ''
    loading.value = true

    if (!auth) {
      error.value = 'Authentication is not configured. Please check your .env file.'
      loading.value = false
      return false
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const u = userCredential.user

      // Check user document for role 'admin' in Firestore
      if (db) {
        const userDocRef = doc(db, 'users', u.uid)
        const userDoc = await getDoc(userDocRef)
        
        if (!userDoc.exists() || userDoc.data()?.role !== 'admin') {
          await signOut(auth)
          error.value = 'Access denied. Administrator privileges required.'
          loading.value = false
          return false
        }
      } else {
        await signOut(auth)
        error.value = 'Database is not initialized. Access denied.'
        loading.value = false
        return false
      }

      user.value = u
      return true
    } catch (err: any) {
      console.error('Login error:', err)

      // User-friendly error messages
      switch (err.code) {
        case 'auth/invalid-email':
          error.value = 'Invalid email address'
          break
        case 'auth/user-disabled':
          error.value = 'This account has been disabled'
          break
        case 'auth/user-not-found':
          error.value = 'Invalid email or password'
          break
        case 'auth/wrong-password':
          error.value = 'Invalid email or password'
          break
        case 'auth/invalid-credential':
          error.value = 'Invalid email or password'
          break
        default:
          error.value = 'Failed to login. Please try again.'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    if (!auth) {
      user.value = null
      return
    }
    try {
      await signOut(auth)
      user.value = null
    } catch (err) {
      console.error('Logout error:', err)
      error.value = 'Failed to logout'
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout
  }
}
