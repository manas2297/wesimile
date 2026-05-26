import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/partnerships',
      name: 'partnerships',
      component: () => import('../views/Partnerships.vue')
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('../views/StudentAcademy.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLogin.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboard.vue'),
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

// Helper function to get current auth state
const getCurrentUser = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('wesmile_demo_session') === 'true') {
      resolve({ email: 'admin@wesmile.com', uid: 'demo-admin' })
      return
    }
    if (!auth) {
      resolve(null)
      return
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

// Route guard for authentication
router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth || requiresGuest) {
    try {
      const user = await getCurrentUser()

      if (requiresAuth && !user) {
        // Redirect to login if trying to access protected route without auth
        next('/admin/login')
      } else if (requiresGuest && user) {
        // Redirect to dashboard if already logged in and trying to access login page
        next('/admin/dashboard')
      } else {
        next()
      }
    } catch (error) {
      console.error('Auth check error:', error)
      next()
    }
  } else {
    next()
  }
})

export default router