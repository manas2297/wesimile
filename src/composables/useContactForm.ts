import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db } from '../config/firebase'
import { ref } from 'vue'
import { sanitizeHtml } from '../utils/sanitize'
import { useRateLimit } from './useRateLimit'
import { useAntiBot } from './useAntiBot'

export function useContactForm() {
  const { isRateLimited } = useRateLimit()
  const { honeypot, checkBot } = useAntiBot()
  
  const name = ref('')
  const email = ref('')
  const phone = ref('')
  const message = ref('')
  const isSubmitting = ref(false)
  const submitError = ref('')
  const submitSuccess = ref(false)

  const normalizePhone = (phoneStr: string): string => {
    const digits = phoneStr.replace(/\D/g, '')
    // Preserve +91 prefix if originally present
    if (phoneStr.trim().startsWith('+91')) return '+91' + digits.slice(digits.startsWith('91') ? 2 : 0)
    // Strip leading 0 (landline style) but keep plain 10-digit
    if (digits.startsWith('91') && digits.length === 12) return '+91' + digits.slice(2)
    return digits.startsWith('0') ? digits.slice(1) : digits
  }

  const validateForm = () => {
    if (!name.value || name.value.trim().length < 2) {
      submitError.value = 'Name must be at least 2 characters'
      return false
    }
    if (!email.value) {
      submitError.value = 'Email is required'
      return false
    }
    if (!phone.value) {
      submitError.value = 'Phone is required'
      return false
    }
    if (!message.value || message.value.trim().length < 10) {
      submitError.value = 'Message must be at least 10 characters'
      return false
    }
    return true
  }

  const validateEmail = (email: string): boolean => {
    // Basic email pattern
    const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // More comprehensive pattern for stricter validation
    const strictPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    // Additional checks
    if (!email) return false
    if (email.length > 254) return false
    if (!basicPattern.test(email)) return false
    
    // Check local part and domain lengths
    const [local, domain] = email.split('@')
    if (local.length > 64) return false
    if (domain.length > 255) return false

    return strictPattern.test(email)
  }

  const validateIndianPhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '')
    
    // Indian mobile number patterns:
    // 1. 10 digits starting with 6-9
    // 2. Optional +91 or 0 prefix
    // 3. Optional spaces or hyphens between numbers
    
    // If number starts with +91 or 91, check the remaining digits
    if (cleanPhone.startsWith('91')) {
      const remaining = cleanPhone.slice(2)
      return /^[6-9]\d{9}$/.test(remaining)
    }
    
    // If number starts with 0, check the remaining digits
    if (cleanPhone.startsWith('0')) {
      const remaining = cleanPhone.slice(1)
      return /^[6-9]\d{9}$/.test(remaining)
    }
    
    // If no prefix, check if it's a valid 10-digit number
    return /^[6-9]\d{9}$/.test(cleanPhone)
  }

  const handleSubmit = async () => {
    isSubmitting.value = true
    submitError.value = ''
    submitSuccess.value = false

    try {
      // Bot detection — must run before any other logic
      const botError = checkBot()
      if (botError) {
        submitError.value = botError
        isSubmitting.value = false
        return
      }

      // First validate all fields
      if (!validateForm()) {
        isSubmitting.value = false
        return
      }

      // Then validate email format
      if (!validateEmail(email.value)) {
        submitError.value = 'Please enter a valid email address'
        isSubmitting.value = false
        return
      }

      // Then validate phone format
      if (!validateIndianPhoneNumber(phone.value)) {
        submitError.value = 'Please enter a valid Indian phone number'
        isSubmitting.value = false
        return
      }

      // Check rate limiting only after validations pass
      if (await isRateLimited(email.value)) {
        submitError.value = 'Too many attempts. Please try again later.'
        isSubmitting.value = false
        return
      }

      // Sanitize inputs after all validations pass
      const sanitizedData = {
        name: sanitizeHtml(name.value.trim()),
        email: email.value.trim().toLowerCase(),
        phone: normalizePhone(phone.value.trim()),
        message: sanitizeHtml(message.value.trim())
      }

      // Validate data lengths
      if (sanitizedData.name.length > 100 ||
          sanitizedData.email.length > 100 ||
          sanitizedData.phone.length > 15 ||
          sanitizedData.message.length > 1000) {
        submitError.value = 'Invalid input length'
        isSubmitting.value = false
        return
      }

      // Submit to Firestore
      if (!db) {
        throw new Error('Database is not initialized. Please configure your .env file.')
      }

      await addDoc(collection(db, 'contactSubmissions'), {
        ...sanitizedData,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        ipAddress: await fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => data.ip)
      })

      // Reset form
      name.value = ''
      email.value = ''
      phone.value = ''
      message.value = ''
      
      submitSuccess.value = true
    } catch (error) {
      // Log error securely
      console.error('Form submission error:', {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        email: email.value.trim().toLowerCase()
      })
      submitError.value = 'There was an error submitting your message. Please try again.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    name,
    email,
    phone,
    message,
    honeypot,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  }
} 