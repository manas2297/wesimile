import { onMounted } from 'vue'
import { useContent } from './useContent'

export function useAbout() {
  const { services, team } = useContent()
  const allServices = [...services.featured, ...services.all]

  const setupScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.2
    })

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    setupScrollAnimations()
  })

  return {
    allServices,
    team
  }
} 