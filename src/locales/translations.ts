import { useLanguage } from '../stores/useLanguage'

type Language = 'en' | 'hi'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      bookAppointment: 'Book Appointment'
    },
    hero: {
      welcome: 'WeSmile Multi-Speciality Dental Clinic',
      title: 'You Smile, We Too',
      subtitle: 'Experience exceptional dental care with our team of experts. We\'re committed to giving you the healthy, beautiful smile you deserve.',
      cta: 'Book Appointment',
      learnMore: 'Learn More'
    },
    // Add more translations as needed
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      services: 'सेवाएं',
      contact: 'संपर्क करें',
      bookAppointment: 'अपॉइंटमेंट बुक करें'
    },
    hero: {
      welcome: 'वीस्माइल मल्टी स्पेशलिटी डेंटल क्लिनिक में आपका स्वागत है',
      title: 'आप मुस्कुराएं, हम भी',
      subtitle: 'हमारी विशेषज्ञ टीम के साथ उत्कृष्ट दंत चिकित्सा का अनुभव करें। हम आपको स्वास्थ्य और सुंदर मुस्कान देने का पुष्टि करते हैं।',
      cta: 'अपॉइंटमेंट बुक करें',
      learnMore: 'और जानें'
    },
    // Add more translations as needed
  }
} as const

// Helper function to get translations
export const useTranslations = () => {
  const { currentLanguage } = useLanguage()
  
  const t = (key: string) => {
    const keys = key.split('.') as string[]
    let translation: any = translations[currentLanguage.value as Language]
    
    for (const k of keys) {
      translation = translation[k]
    }
    
    return translation as string
  }

  return { t }
} 