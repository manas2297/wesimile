import { ref, computed } from 'vue'
import { collection, query, orderBy, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { mockStudentApplications } from '../data/mockSubmissions'

export interface StudentApplication {
  id: string
  fullName: string
  email: string
  phone: string
  school: string
  yearOfStudy: string
  specialtyInterest: string
  resumeUrl: string
  message: string
  timestamp: Timestamp
  userAgent?: string
  ipAddress?: string
}

export function useStudentApplications() {
  const submissions = ref<StudentApplication[]>([])
  const loading = ref(false)
  const error = ref('')
  const searchQuery = ref('')
  const sortBy = ref<'date' | 'name' | 'school'>('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const fetchSubmissions = async () => {
    loading.value = true
    error.value = ''

    const isDemo = localStorage.getItem('wesmile_demo_session') === 'true'

    if (!db || isDemo) {
      setTimeout(() => {
        if (submissions.value.length === 0) {
          submissions.value = [...mockStudentApplications]
        }
        loading.value = false
      }, 300)
      return
    }

    try {
      const q = query(
        collection(db, 'studentApplications'),
        orderBy('timestamp', 'desc')
      )

      const querySnapshot = await getDocs(q)
      submissions.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as StudentApplication))
    } catch (err) {
      console.error('Error fetching student applications:', err)
      error.value = 'Failed to load student applications'
    } finally {
      loading.value = false
    }
  }

  const deleteSubmission = async (id: string) => {
    const isDemo = localStorage.getItem('wesmile_demo_session') === 'true'
    if (!db || isDemo) {
      submissions.value = submissions.value.filter(s => s.id !== id)
      return true
    }

    try {
      await deleteDoc(doc(db, 'studentApplications', id))
      submissions.value = submissions.value.filter(s => s.id !== id)
      return true
    } catch (err) {
      console.error('Error deleting student application:', err)
      error.value = 'Failed to delete application'
      return false
    }
  }

  const filteredSubmissions = computed(() => {
    let filtered = submissions.value

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      filtered = filtered.filter(s =>
        s.fullName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.school.toLowerCase().includes(q) ||
        s.yearOfStudy.toLowerCase().includes(q) ||
        s.specialtyInterest.toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q)
      )
    }

    filtered = [...filtered].sort((a, b) => {
      let comparison = 0

      switch (sortBy.value) {
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName)
          break
        case 'school':
          comparison = a.school.localeCompare(b.school)
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
    const headers = ['Date', 'Student Name', 'Email', 'Phone', 'Dental School', 'Year of Study', 'Specialty Focus', 'Resume / LinkedIn URL', 'Message', 'IP Address']
    const rows = filteredSubmissions.value.map(s => [
      s.timestamp?.toDate().toLocaleString() || 'N/A',
      s.fullName,
      s.email,
      s.phone,
      s.school,
      s.yearOfStudy,
      s.specialtyInterest,
      s.resumeUrl,
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
    link.setAttribute('download', `student-applications-${new Date().toISOString().split('T')[0]}.csv`)
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
