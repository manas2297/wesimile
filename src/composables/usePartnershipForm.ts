import { ref } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { sanitizeHtml } from '../utils/sanitize'
import { useRateLimit } from './useRateLimit'

export function usePartnershipForm() {
  const { isRateLimited } = useRateLimit()

  const companyName = ref('')
  const contactName = ref('')
  const email = ref('')
  const phone = ref('')
  const partnershipType = ref('clinical_trials')
  const message = ref('')

  const isSubmitting = ref(false)
  const submitError = ref('')
  const submitSuccess = ref(false)

  const validateForm = () => {
    if (!companyName.value.trim()) {
      submitError.value = 'Company Name is required'
      return false
    }
    if (!contactName.value.trim()) {
      submitError.value = 'Contact Person Name is required'
      return false
    }
    if (!email.value.trim()) {
      submitError.value = 'Email is required'
      return false
    }
    if (!phone.value.trim()) {
      submitError.value = 'Phone number is required'
      return false
    }
    if (!partnershipType.value) {
      submitError.value = 'Partnership Type is required'
      return false
    }
    if (!message.value.trim()) {
      submitError.value = 'Message is required'
      return false
    }
    return true
  }

  const validateEmail = (emailStr: string): boolean => {
    const strictPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailStr || emailStr.length > 100) return false
    return strictPattern.test(emailStr)
  }

  const validateIndianPhoneNumber = (phoneStr: string): boolean => {
    const cleanPhone = phoneStr.replace(/\D/g, '')
    if (cleanPhone.startsWith('91')) {
      return /^[6-9]\d{9}$/.test(cleanPhone.slice(2))
    }
    if (cleanPhone.startsWith('0')) {
      return /^[6-9]\d{9}$/.test(cleanPhone.slice(1))
    }
    return /^[6-9]\d{9}$/.test(cleanPhone)
  }

  const handleSubmit = async () => {
    isSubmitting.value = true
    submitError.value = ''
    submitSuccess.value = false

    try {
      if (!validateForm()) {
        isSubmitting.value = false
        return
      }

      if (!validateEmail(email.value.trim())) {
        submitError.value = 'Please enter a valid email address'
        isSubmitting.value = false
        return
      }

      if (!validateIndianPhoneNumber(phone.value.trim())) {
        submitError.value = 'Please enter a valid Indian phone number'
        isSubmitting.value = false
        return
      }

      if (await isRateLimited(email.value.trim())) {
        submitError.value = 'Too many attempts. Please try again later.'
        isSubmitting.value = false
        return
      }

      const sanitizedData = {
        companyName: sanitizeHtml(companyName.value.trim()),
        contactName: sanitizeHtml(contactName.value.trim()),
        email: email.value.trim().toLowerCase(),
        phone: phone.value.trim(),
        partnershipType: sanitizeHtml(partnershipType.value),
        message: sanitizeHtml(message.value.trim())
      }

      if (
        sanitizedData.companyName.length > 100 ||
        sanitizedData.contactName.length > 100 ||
        sanitizedData.email.length > 100 ||
        sanitizedData.phone.length > 15 ||
        sanitizedData.partnershipType.length > 50 ||
        sanitizedData.message.length > 1000
      ) {
        submitError.value = 'Invalid input length'
        isSubmitting.value = false
        return
      }

      if (!db) {
        throw new Error('Database is not initialized.')
      }

      await addDoc(collection(db, 'b2bPartnerships'), {
        ...sanitizedData,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        ipAddress: await fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => data.ip)
          .catch(() => 'N/A')
      })

      companyName.value = ''
      contactName.value = ''
      email.value = ''
      phone.value = ''
      partnershipType.value = 'clinical_trials'
      message.value = ''
      submitSuccess.value = true
    } catch (err) {
      console.error('B2B Submission error:', err)
      submitError.value = 'There was an error submitting your request. Please try again.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    companyName,
    contactName,
    email,
    phone,
    partnershipType,
    message,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit
  }
}
