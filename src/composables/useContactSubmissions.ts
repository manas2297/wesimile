import { ref, computed } from 'vue'
import { collection, query, orderBy, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { mockContactSubmissions } from '../data/mockSubmissions'

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  timestamp: Timestamp
  userAgent?: string
  ipAddress?: string
}

export function useContactSubmissions() {
  const submissions = ref<ContactSubmission[]>([])
  const loading = ref(false)
  const error = ref('')
  const searchQuery = ref('')
  const sortBy = ref<'date' | 'name' | 'email'>('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Fetch all submissions from Firestore
  const fetchSubmissions = async () => {
    loading.value = true
    error.value = ''

    const isDemo = localStorage.getItem('wesmile_demo_session') === 'true'

    if (!db || isDemo) {
      setTimeout(() => {
        if (submissions.value.length === 0) {
          submissions.value = [...mockContactSubmissions]
        }
        loading.value = false
      }, 300)
      return
    }

    try {
      const q = query(
        collection(db, 'contactSubmissions'),
        orderBy('timestamp', 'desc')
      )

      const querySnapshot = await getDocs(q)
      submissions.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ContactSubmission))
    } catch (err) {
      console.error('Error fetching submissions:', err)
      error.value = 'Failed to load submissions'
    } finally {
      loading.value = false
    }
  }

  // Delete a submission
  const deleteSubmission = async (id: string) => {
    const isDemo = localStorage.getItem('wesmile_demo_session') === 'true'
    if (!db || isDemo) {
      submissions.value = submissions.value.filter(s => s.id !== id)
      return true
    }

    try {
      await deleteDoc(doc(db, 'contactSubmissions', id))
      submissions.value = submissions.value.filter(s => s.id !== id)
      return true
    } catch (err) {
      console.error('Error deleting submission:', err)
      error.value = 'Failed to delete submission'
      return false
    }
  }

  // Filtered and sorted submissions
  const filteredSubmissions = computed(() => {
    let filtered = submissions.value

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.phone.includes(query) ||
        s.message.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0

      switch (sortBy.value) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'email':
          comparison = a.email.localeCompare(b.email)
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

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Message', 'IP Address']
    const rows = filteredSubmissions.value.map(s => [
      s.timestamp?.toDate().toLocaleString() || 'N/A',
      s.name,
      s.email,
      s.phone,
      s.message.replace(/"/g, '""'), // Escape quotes
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
    link.setAttribute('download', `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`)
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
