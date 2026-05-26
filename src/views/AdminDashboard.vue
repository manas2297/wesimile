<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <header class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-800">Admin Dashboard</h1>
              <p class="text-sm text-slate-500">WeSmile Portal Management</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="hidden sm:flex items-center space-x-2 text-sm text-slate-600 font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ user?.email }}</span>
            </div>
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold text-sm shadow-sm hover:shadow cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Demo Mode Banner -->
      <div v-if="isDemoMode" class="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-amber-800">Running in Demo Mode</h3>
            <p class="text-xs text-amber-700 font-medium">Viewing local simulated form submissions. Database alterations are only applied to current browser state.</p>
          </div>
        </div>
        <span class="px-2.5 py-1 bg-amber-200 text-amber-850 rounded text-xs font-bold uppercase tracking-wider">Simulated</span>
      </div>
      
      <!-- Tabs Selector -->
      <div class="border-b border-slate-200 mb-6 flex space-x-8">
        <button
          @click="changeTab('contacts')"
          :class="[
            activeTab === 'contacts'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 font-medium',
            'pb-4 border-b-2 text-sm transition-all px-1 cursor-pointer'
          ]"
        >
          Patient Contacts
        </button>
        <button
          @click="changeTab('partnerships')"
          :class="[
            activeTab === 'partnerships'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 font-medium',
            'pb-4 border-b-2 text-sm transition-all px-1 cursor-pointer'
          ]"
        >
          B2B Partnerships
        </button>
        <button
          @click="changeTab('students')"
          :class="[
            activeTab === 'students'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 font-medium',
            'pb-4 border-b-2 text-sm transition-all px-1 cursor-pointer'
          ]"
        >
          Student Applications
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-md shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-slate-600">Total Submissions</p>
              <p class="text-3xl font-extrabold text-slate-900 mt-2">{{ submissions.length }}</p>
            </div>
            <div class="w-12 h-12 bg-secondary-light rounded-md flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-md shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-slate-600">Filtered Results</p>
              <p class="text-3xl font-extrabold text-slate-900 mt-2">{{ filteredSubmissions.length }}</p>
            </div>
            <div class="w-12 h-12 bg-secondary-light rounded-md flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-md shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-slate-600">Latest Submission</p>
              <p class="text-lg font-bold text-slate-900 mt-2">
                {{ latestSubmissionTime }}
              </p>
            </div>
            <div class="w-12 h-12 bg-secondary-light rounded-md flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="bg-white rounded-md shadow-sm border border-slate-200 p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <!-- Search -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="activeSearchQuery"
                type="text"
                placeholder="Search..."
                class="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-slate-800 text-sm"
              />
            </div>
          </div>

          <!-- Sort Controls -->
          <div class="flex items-center space-x-3">
            <select
              v-model="activeSortBy"
              class="px-4 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-slate-700 text-sm font-medium"
            >
              <option value="date">Sort by Date</option>
              <option v-if="activeTab === 'contacts' || activeTab === 'students'" value="name">Sort by Name</option>
              <option v-if="activeTab === 'partnerships'" value="company">Sort by Company</option>
              <option v-if="activeTab === 'partnerships'" value="contact">Sort by Contact Person</option>
              <option v-if="activeTab === 'students'" value="school">Sort by School</option>
            </select>

            <button
              @click="toggleSortOrder"
              class="p-2.5 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
              :title="sortOrder === 'asc' ? 'Ascending' : 'Descending'"
            >
              <svg v-if="sortOrder === 'desc'" class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <svg v-else class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </button>

            <button
              @click="exportToCSV"
              class="px-4 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold flex items-center space-x-2 shadow-sm hover:shadow text-sm cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export CSV</span>
            </button>

            <button
              @click="fetchSubmissions"
              :disabled="loading"
              class="p-2.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
              title="Refresh"
            >
              <svg class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && submissions.length === 0" class="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center">
        <svg class="animate-spin h-12 w-12 text-secondary mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-slate-600">Loading submissions...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg class="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-700 font-medium">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredSubmissions.length === 0" class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <svg class="h-16 w-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="text-lg font-medium text-slate-900 mb-2">No submissions found</h3>
        <p class="text-slate-600">
          {{ activeSearchQuery ? 'Try adjusting your search criteria' : 'Submissions will appear here' }}
        </p>
      </div>

      <!-- Tab 1: Contacts Table -->
      <div v-else-if="activeTab === 'contacts'" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">IP Address</th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ formatDate(submission.timestamp) }}</span>
                    <span class="text-slate-500 text-xs">{{ formatTime(submission.timestamp) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {{ (submission as any).name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <div>{{ submission.email }}</div>
                  <div class="text-slate-500 text-xs font-medium">{{ submission.phone }}</div>
                </td>
                <td class="px-6 py-4 max-w-xs">
                  <div class="text-sm text-slate-900 line-clamp-2" :title="submission.message">
                    {{ submission.message }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {{ submission.ipAddress || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="viewDetails(submission)" class="text-primary hover:text-primary-dark mr-3 cursor-pointer">
                    <svg class="w-5 h-5 animate-pulse-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click="confirmDelete(submission)" class="text-red-600 hover:text-red-900 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 2: Partnerships Table -->
      <div v-else-if="activeTab === 'partnerships'" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Person</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Partnership Focus</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Proposal Message</th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ formatDate(submission.timestamp) }}</span>
                    <span class="text-slate-500 text-xs">{{ formatTime(submission.timestamp) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {{ (submission as any).companyName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {{ (submission as any).contactName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <div>{{ submission.email }}</div>
                  <div class="text-slate-500 text-xs font-medium">{{ submission.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class="px-2.5 py-1 bg-secondary-light text-secondary-dark border border-secondary/20 rounded text-xs font-bold">
                    {{ formatPartnershipFocus((submission as any).partnershipType) }}
                  </span>
                </td>
                <td class="px-6 py-4 max-w-xs">
                  <div class="text-sm text-slate-900 line-clamp-2" :title="submission.message">
                    {{ submission.message }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="viewDetails(submission)" class="text-primary hover:text-primary-dark mr-3 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click="confirmDelete(submission)" class="text-red-600 hover:text-red-900 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 3: Students Table -->
      <div v-else-if="activeTab === 'students'" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Name</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dental School / University</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Study Year / Specialty</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Resume / Link</th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ formatDate(submission.timestamp) }}</span>
                    <span class="text-slate-500 text-xs">{{ formatTime(submission.timestamp) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {{ (submission as any).fullName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <div>{{ submission.email }}</div>
                  <div class="text-slate-500 text-xs font-medium">{{ submission.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                  {{ (submission as any).school }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="font-medium text-slate-900">{{ formatYearOfStudy((submission as any).yearOfStudy) }}</div>
                  <div class="text-xs text-secondary font-semibold mt-0.5">{{ formatSpecialtyInterest((submission as any).specialtyInterest) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  <a :href="(submission as any).resumeUrl" target="_blank" class="text-primary hover:underline font-bold text-xs inline-flex items-center space-x-1">
                    <span>View CV</span>
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="viewDetails(submission)" class="text-primary hover:text-primary-dark mr-3 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click="confirmDelete(submission)" class="text-red-600 hover:text-red-900 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Detail Modal -->
    <div v-if="selectedSubmission" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in" @click.self="selectedSubmission = null">
      <div class="bg-white rounded-md shadow-lg border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 class="text-xl font-bold text-slate-800">Submission Details</h3>
          <button @click="selectedSubmission = null" class="text-slate-400 hover:text-slate-600 cursor-pointer">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="text-sm font-semibold text-slate-500">Date & Time</label>
            <p class="text-slate-800 mt-1">{{ formatDate(selectedSubmission.timestamp) }} at {{ formatTime(selectedSubmission.timestamp) }}</p>
          </div>
          
          <!-- Tab 1 Details -->
          <div v-if="activeTab === 'contacts'">
            <label class="text-sm font-semibold text-slate-500">Name</label>
            <p class="text-slate-800 mt-1 font-semibold">{{ selectedSubmission.name }}</p>
          </div>
          
          <!-- Tab 2 Details -->
          <div v-if="activeTab === 'partnerships'">
            <div class="mb-3">
              <label class="text-sm font-semibold text-slate-500">Company Name</label>
              <p class="text-slate-850 mt-1 font-bold text-base text-primary">{{ (selectedSubmission as any).companyName }}</p>
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-500">Contact Person</label>
              <p class="text-slate-800 mt-1">{{ (selectedSubmission as any).contactName }}</p>
            </div>
            <div class="mt-3">
              <label class="text-sm font-semibold text-slate-500">Partnership Focus</label>
              <p class="mt-1">
                <span class="px-2.5 py-1 bg-secondary-light text-secondary-dark border border-secondary/20 rounded text-xs font-bold">
                  {{ formatPartnershipFocus((selectedSubmission as any).partnershipType) }}
                </span>
              </p>
            </div>
          </div>

          <!-- Tab 3 Details -->
          <div v-if="activeTab === 'students'">
            <div class="mb-3">
              <label class="text-sm font-semibold text-slate-500">Student Name</label>
              <p class="text-slate-850 mt-1 font-bold text-base text-primary">{{ (selectedSubmission as any).fullName }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-semibold text-slate-500">Dental School / College</label>
                <p class="text-slate-800 mt-1">{{ (selectedSubmission as any).school }}</p>
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-500">Year of Study</label>
                <p class="text-slate-800 mt-1">{{ formatYearOfStudy((selectedSubmission as any).yearOfStudy) }}</p>
              </div>
            </div>
            <div class="mt-3">
              <label class="text-sm font-semibold text-slate-500">Specialty Interest Focus</label>
              <p class="text-secondary-dark mt-1 font-bold text-sm">{{ formatSpecialtyInterest((selectedSubmission as any).specialtyInterest) }}</p>
            </div>
            <div class="mt-3">
              <label class="text-sm font-semibold text-slate-500">Resume / CV Link</label>
              <p class="mt-1">
                <a :href="(selectedSubmission as any).resumeUrl" target="_blank" class="text-primary hover:underline font-bold text-sm inline-flex items-center space-x-1">
                  <span>Open CV File</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </p>
            </div>
          </div>

          <!-- Common Fields -->
          <div>
            <label class="text-sm font-semibold text-slate-500">Email</label>
            <p class="text-slate-800 mt-1">
              <a :href="`mailto:${selectedSubmission.email}`" class="text-primary hover:underline font-medium">
                {{ selectedSubmission.email }}
              </a>
            </p>
          </div>
          
          <div>
            <label class="text-sm font-semibold text-slate-500">Phone</label>
            <p class="text-slate-800 mt-1">
              <a :href="`tel:${selectedSubmission.phone}`" class="text-primary hover:underline font-medium">
                {{ selectedSubmission.phone }}
              </a>
            </p>
          </div>
          
          <div>
            <label class="text-sm font-semibold text-slate-500">
              {{ activeTab === 'contacts' ? 'Message' : (activeTab === 'partnerships' ? 'Partnership Proposal Description' : 'Clinical SOP / Statement of Purpose') }}
            </label>
            <p class="text-slate-800 mt-1 whitespace-pre-wrap leading-relaxed text-sm bg-slate-50 p-4 rounded border border-slate-200">{{ selectedSubmission.message }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs text-slate-400">
            <div>
              <span class="font-semibold">IP Address:</span> {{ selectedSubmission.ipAddress || 'N/A' }}
            </div>
          </div>
          
          <div v-if="selectedSubmission.userAgent" class="pt-2 text-xs text-slate-400">
            <span class="font-semibold text-block mb-1">User Agent:</span>
            <p class="break-all font-mono">{{ selectedSubmission.userAgent }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="deleteConfirmation = null">
      <div class="bg-white rounded-md shadow-lg border border-slate-200 max-w-md w-full p-6">
        <div class="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-slate-800 text-center mb-2">Delete Submission?</h3>
        <p class="text-slate-600 text-center mb-6">
          Are you sure you want to delete the submission from <strong>{{ deleteConfirmationName }}</strong>? This action cannot be undone.
        </p>
        
        <div class="flex space-x-3">
          <button
            @click="deleteConfirmation = null"
            class="flex-1 px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useContactSubmissions } from '../composables/useContactSubmissions'
import { usePartnershipSubmissions } from '../composables/usePartnershipSubmissions'
import { useStudentApplications } from '../composables/useStudentApplications'
import type { Timestamp } from 'firebase/firestore'

const router = useRouter()
const { user, logout } = useAuth()

const isDemoMode = computed(() => {
  return localStorage.getItem('wesmile_demo_session') === 'true'
})

const activeTab = ref<'contacts' | 'partnerships' | 'students'>('contacts')

// Load the three separate stores
const contactStore = useContactSubmissions()
const partnershipStore = usePartnershipSubmissions()
const studentStore = useStudentApplications()

// Computed getter pointing to the currently active store
const activeStore = computed(() => {
  if (activeTab.value === 'partnerships') return partnershipStore
  if (activeTab.value === 'students') return studentStore
  return contactStore
})

// Mapped reactive properties from the active store
const submissions = computed(() => activeStore.value.submissions.value)
const loading = computed(() => activeStore.value.loading.value)
const error = computed(() => activeStore.value.error.value)
const filteredSubmissions = computed(() => activeStore.value.filteredSubmissions.value)
const sortOrder = computed(() => activeStore.value.sortOrder.value)

// Writable computed properties for v-model bindings
const activeSearchQuery = computed({
  get: () => activeStore.value.searchQuery.value,
  set: (val) => { activeStore.value.searchQuery.value = val }
})

const activeSortBy = computed({
  get: () => activeStore.value.sortBy.value,
  set: (val) => { activeStore.value.sortBy.value = val }
})

// Tab switching
const changeTab = (tab: 'contacts' | 'partnerships' | 'students') => {
  activeTab.value = tab
  activeStore.value.fetchSubmissions()
}

onMounted(() => {
  contactStore.fetchSubmissions()
})

// Proxy action triggers
const fetchSubmissions = () => {
  activeStore.value.fetchSubmissions()
}

const exportToCSV = () => {
  activeStore.value.exportToCSV()
}

const toggleSortOrder = () => {
  activeStore.value.sortOrder.value = activeStore.value.sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// Modal handling states
const selectedSubmission = ref<any | null>(null)
const deleteConfirmation = ref<any | null>(null)

const viewDetails = (submission: any) => {
  selectedSubmission.value = submission
}

const confirmDelete = (submission: any) => {
  deleteConfirmation.value = submission
}

const handleDelete = async () => {
  if (!deleteConfirmation.value) return
  const success = await activeStore.value.deleteSubmission(deleteConfirmation.value.id)
  if (success) {
    deleteConfirmation.value = null
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/admin/login')
}

// Helper formatting computed values & methods
const deleteConfirmationName = computed(() => {
  if (!deleteConfirmation.value) return ''
  if (activeTab.value === 'contacts') return deleteConfirmation.value.name
  if (activeTab.value === 'partnerships') return (deleteConfirmation.value as any).companyName
  if (activeTab.value === 'students') return (deleteConfirmation.value as any).fullName
  return ''
})

const latestSubmissionTime = computed(() => {
  if (submissions.value.length === 0) return 'N/A'
  const latest = submissions.value[0]
  if (!latest.timestamp) return 'N/A'
  return formatRelativeTime(latest.timestamp)
})

const formatDate = (timestamp: Timestamp | undefined) => {
  if (!timestamp) return 'N/A'
  return timestamp.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (timestamp: Timestamp | undefined) => {
  if (!timestamp) return 'N/A'
  return timestamp.toDate().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatRelativeTime = (timestamp: Timestamp) => {
  const now = new Date()
  const date = timestamp.toDate()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(timestamp)
}

const formatPartnershipFocus = (focus: string) => {
  const mapping: Record<string, string> = {
    clinical_trials: 'Clinical Trials & AI',
    distribution: 'Distribution & Retail',
    co_branding: 'Co-Branding / Events',
    other: 'Other'
  }
  return mapping[focus] || focus
}

const formatYearOfStudy = (year: string) => {
  const mapping: Record<string, string> = {
    '1st_year': '1st Year (BDS)',
    '2nd_year': '2nd Year (BDS)',
    '3rd_year': '3rd Year (BDS)',
    '4th_year': '4th Year (BDS)',
    residency: 'Resident / MDS',
    other: 'Other Trainee'
  }
  return mapping[year] || year
}

const formatSpecialtyInterest = (specialty: string) => {
  const mapping: Record<string, string> = {
    general: 'General Dentistry',
    orthodontics: 'Orthodontics',
    implants: 'Implants & Restorative',
    surgery: 'Oral Surgery',
    pediatric: 'Pediatric Care'
  }
  return mapping[specialty] || specialty
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
