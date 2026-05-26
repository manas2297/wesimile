import { ref, computed } from 'vue'
import { collection, query, orderBy, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

export interface PartnershipSubmission {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  partnershipType: string
  message: string
  timestamp: Timestamp
  userAgent?: string
  ipAddress?: string
}

export function usePartnershipSubmissions() {
  const submissions = ref<PartnershipSubmission[]>([])
  const loading = ref(false)
  const error = ref('')
  const searchQuery = ref('')
  const sortBy = ref<'date' | 'company' | 'contact'>('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const fetchSubmissions = async () => {
    loading.value = true
    error.value = ''

    if (!db) {
      error.value = 'Database is not initialized.'
      loading.value = false
      return
    }

    try {
      const q = query(
        collection(db, 'b2bPartnerships'),
        orderBy('timestamp', 'desc')
      )

      const querySnapshot = await getDocs(q)
      submissions.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as PartnershipSubmission))
    } catch (err) {
      console.error('Error fetching B2B partnerships:', err)
      error.value = 'Failed to load B2B submissions'
    } finally {
      loading.value = false
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!db) {
      error.value = 'Database is not initialized.'
      return false
    }

    try {
      await deleteDoc(doc(db, 'b2bPartnerships', id))
      submissions.value = submissions.value.filter(s => s.id !== id)
      return true
    } catch (err) {
      console.error('Error deleting B2B submission:', err)
      error.value = 'Failed to delete submission'
      return false
    }
  }

  const filteredSubmissions = computed(() => {
    let filtered = submissions.value

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      filtered = filtered.filter(s =>
        s.companyName.toLowerCase().includes(q) ||
        s.contactName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.partnershipType.toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q)
      )
    }

    filtered = [...filtered].sort((a, b) => {
      let comparison = 0

      switch (sortBy.value) {
        case 'company':
          comparison = a.companyName.localeCompare(b.companyName)
          break
        case 'contact':
          comparison = a.contactName.localeCompare(b.contactName)
          break
        case 'date':
        default:
          const aTime = a.timestamp?.toMillis() || 0
          const bTime = b.timestamp?.toMillis() || 0
          comparison = aTime - bTime
          break
      }

      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return filtered
  })

  const exportToCSV = () => {
    const headers = ['Date', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Partnership Type', 'Message', 'IP Address']
    const rows = filteredSubmissions.value.map(s => [
      s.timestamp?.toDate().toLocaleString() || 'N/A',
      s.companyName,
      s.contactName,
      s.email,
      s.phone,
      s.partnershipType,
      s.message.replace(/"/g, '""'),
      s.ipAddress || 'N/A'
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `b2b-partnerships-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    submissions,
    loading,
    error,
    searchQuery,
    sortBy,
    sortOrder,
    filteredSubmissions,
    fetchSubmissions,
    deleteSubmission,
    exportToCSV
  }
}
