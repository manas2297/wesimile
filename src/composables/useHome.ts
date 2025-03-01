import { onMounted } from 'vue'
import { useContent } from './useContent'

export function useHome() {
  const { services, testimonials, specialOffers } = useContent()

  // Use only featured services in Home page
  const featuredServices = services.featured

  const setupAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1
    })

    document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right').forEach((el) => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    setupAnimations()
  })

  return {
    featuredServices,
    testimonials,
    specialOffers
  }
} 