import { ref } from 'vue'

const RATE_LIMIT = {
  MAX_ATTEMPTS: 3,
  WINDOW_MINUTES: 5
}

// Store attempts in memory
const attempts = ref<Record<string, { count: number; lastAttempt: number }>>({})

export function useRateLimit() {
  const isRateLimited = async (identifier: string): Promise<boolean> => {
    const now = Date.now()
    const windowStart = now - (RATE_LIMIT.WINDOW_MINUTES * 60 * 1000)
    
    try {
      // Initialize or get existing attempts
      if (!attempts.value[identifier]) {
        attempts.value[identifier] = {
          count: 0,
          lastAttempt: 0
        }
      }

      const userAttempts = attempts.value[identifier]
      
      // Reset count if outside window
      if (userAttempts.lastAttempt < windowStart) {
        userAttempts.count = 0
      }

      // Check if too many attempts
      if (userAttempts.count >= RATE_LIMIT.MAX_ATTEMPTS) {
        return true
      }

      // Increment attempt count
      userAttempts.count++
      userAttempts.lastAttempt = now

      return false
    } catch (error) {
      console.error('Rate limit check failed:', error)
      return false // Allow on error to prevent blocking legitimate users
    }
  }

  // Optional: Add a method to clear rate limits
  const clearRateLimit = (identifier: string) => {
    if (attempts.value[identifier]) {
      delete attempts.value[identifier]
    }
  }

  return { 
    isRateLimited,
    clearRateLimit 
  }
} 