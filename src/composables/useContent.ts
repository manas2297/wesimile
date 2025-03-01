import content from '../data/content.json'

export function useContent() {
  return {
    contact: content.contact,
    services: content.services,
    specialOffers: content.specialOffers,
    team: content.team,
    footer: content.footer,
    testimonials: content.testimonials
  }
} 