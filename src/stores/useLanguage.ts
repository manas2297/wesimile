import { ref } from 'vue'

const currentLanguage = ref('en')

export const useLanguage = () => {
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'en' ? 'hi' : 'en'
  }

  return {
    currentLanguage,
    toggleLanguage
  }
} 