import { ref, onMounted } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth } from '../config/firebase'

export function useAuth() {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref('')

  // Listen to auth state changes
  onMounted(() => {
    if (localStorage.getItem('wesmile_demo_session') === 'true') {
      user.value = { email: 'admin@wesmile.com', uid: 'demo-admin' } as any
      loading.value = false
      return
    }
    if (!auth) {
      loading.value = false
      return
    }
    onAuthStateChanged(auth, (currentUser) => {
      if (localStorage.getItem('wesmile_demo_session') === 'true') {
        user.value = { email: 'admin@wesmile.com', uid: 'demo-admin' } as any
      } else {
        user.value = currentUser
      }
      loading.value = false
    })
  })

  const login = async (email: string, password: string) => {
    error.value = ''
    loading.value = true

    // Check for demo bypass credentials
    if (email === 'admin@wesmile.com' && password === 'admin123') {
      localStorage.setItem('wesmile_demo_session', 'true')
      user.value = { email: 'admin@wesmile.com', uid: 'demo-admin' } as any
      loading.value = false
      return true
    }

    if (!auth) {
      error.value = 'Authentication is not configured. Please check your .env file.'
      loading.value = false
      return false
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      localStorage.removeItem('wesmile_demo_session') // Clear demo if logging in with Firebase
      user.value = userCredential.user
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
    localStorage.removeItem('wesmile_demo_session')
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
