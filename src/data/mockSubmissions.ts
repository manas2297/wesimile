import { Timestamp } from 'firebase/firestore'
import type { ContactSubmission } from '../composables/useContactSubmissions'
import type { PartnershipSubmission } from '../composables/usePartnershipSubmissions'
import type { StudentApplication } from '../composables/useStudentApplications'

export const mockContactSubmissions: Omit<ContactSubmission, ''>[] = [
  {
    id: 'contact-1',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@gmail.com',
    phone: '+919876543210',
    message: 'Hi, I would like to book a general checkup consultation for next Wednesday morning if possible. Let me know the slots.',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 3600000 * 2)), // 2h ago
    ipAddress: '192.168.1.51',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    id: 'contact-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@yahoo.com',
    phone: '+918765432109',
    message: 'Dear WeSmile, I am experiencing severe tooth sensitivity in my upper molars. Do you offer root canal treatments, and what are the charges?',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 3600000 * 24)), // 1 day ago
    ipAddress: '103.45.2.14',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
  },
  {
    id: 'contact-3',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@outlook.com',
    phone: '+917654321098',
    message: 'Looking for teeth whitening treatment options for a wedding coming up in 2 weeks. Can I get a quick consult?',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 3600000 * 72)), // 3 days ago
    ipAddress: '157.48.12.99',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
]

export const mockPartnershipSubmissions: Omit<PartnershipSubmission, ''>[] = [
  {
    id: 'partnership-1',
    companyName: 'DentAI Solutions Inc.',
    contactName: 'Dr. Vikrant Kulkarni',
    email: 'v.kulkarni@dentai.com',
    phone: '+919911882233',
    partnershipType: 'clinical_trials',
    message: 'We are developing a new computer-vision model for identifying early-stage caries. We would love to partner with WeSmile to trial our software and integrate feedback into our AI dashboard.',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 3600000 * 3)), // 3 hours ago
    ipAddress: '203.0.113.195',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    id: 'partnership-2',
    companyName: 'Astra Dental Distributors',
    contactName: 'Neha Bajaj',
    email: 'neha.b@astradental.in',
    phone: '+919833445566',
    partnershipType: 'distribution',
    message: 'We are the exclusive North India distributor for several premium Swiss implant brands. We would like to pitch a group purchase discount contract for WeSmile locations.',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 3600000 * 48)), // 2 days ago
    ipAddress: '198.51.100.12',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
  }
]

export const mockStudentApplications: Omit<StudentApplication, ''>[] = [
  {
    id: 'student-1',
    fullName: 'Ananya Iyer',
    email: 'ananya.iyer@dental.edu',
    phone: '+919988776655',
    school: 'Manipal College of Dental Sciences',
    yearOfStudy: '4th_year',
    specialtyInterest: 'orthodontics',
    resumeUrl: 'https://linkedin.com/in/ananya-iyer-demo',
    message: 'I would love to apply for the summer residency program under WeSmile Academy. I have completed my clinical postings in orthodontics and pediatric care and maintain a 3.8 GPA.',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 3600000 * 5)), // 5 hours ago
    ipAddress: '198.51.100.85',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1'
  },
  {
    id: 'student-2',
    fullName: 'Kabir Malhotra',
    email: 'kabir.m@gmail.com',
    phone: '+919876543221',
    school: 'Maulana Azad Institute of Dental Sciences',
    yearOfStudy: 'residency',
    specialtyInterest: 'implants',
    resumeUrl: 'https://github.com/kabir-demo-cv',
    message: 'Currently an MDS candidate in Prosthodontics. Interested in learning about WeSmile\'s digital workflow, intraoral scanning technologies, and advanced implantology techniques.',
    timestamp: Timestamp.fromDate(new Date(Date.now() - 3600000 * 72)), // 3 days ago
    ipAddress: '203.0.113.8',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
  }
]
