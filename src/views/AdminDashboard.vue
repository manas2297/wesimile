<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans">
    <!-- Backdrop for mobile sidebar -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false" 
      class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden"
    ></div>

    <!-- Sidebar Navigation Drawer -->
    <aside 
      class="fixed inset-y-0 left-0 bg-slate-900 border-r border-white/5 w-64 flex flex-col justify-between p-6 z-40 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="space-y-8">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span class="text-lg font-bold text-white tracking-tight">WeSmile Admin</span>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-1.5">
          <button
            @click="changeTab('contacts')"
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer"
            :class="activeTab === 'contacts' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Patient Contacts</span>
          </button>

          <button
            @click="changeTab('partnerships')"
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer"
            :class="activeTab === 'partnerships' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>B2B Partnerships</span>
          </button>

          <button
            @click="changeTab('students')"
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer"
            :class="activeTab === 'students' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <span>Student Applications</span>
          </button>

          <button
            @click="changeTab('chat')"
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer"
            :class="activeTab === 'chat' ? 'bg-secondary text-white shadow-md shadow-secondary/10' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Live Chat Support</span>
          </button>
        </nav>
      </div>

      <!-- User profile & logout block at bottom of sidebar -->
      <div class="space-y-4 border-t border-white/5 pt-6">
        <div class="flex items-center space-x-3 px-2">
          <div class="w-8 h-8 rounded-lg bg-slate-850 flex items-center justify-center text-slate-300 border border-white/5 text-xs font-bold font-mono">
            {{ user?.email?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-grow min-w-0">
            <p class="text-xs font-bold text-white truncate">{{ user?.email }}</p>
            <p class="text-[9px] text-green-400 font-bold uppercase tracking-wider">Online</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="w-full px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-500/20 rounded-xl transition-all font-semibold text-xs cursor-pointer text-center"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col h-screen overflow-y-auto relative">
      <!-- Decorative background elements inside content area -->
      <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none"></div>

      <!-- Top Header Mobile Nav -->
      <header class="backdrop-blur-md bg-slate-900/80 border-b border-white/10 sticky top-0 z-30 shadow-lg px-4 py-4 flex lg:hidden items-center justify-between flex-shrink-0">
        <div class="flex items-center space-x-3">
          <button 
            @click="toggleSidebar" 
            class="p-2 bg-slate-950 border border-white/10 rounded-xl text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
            title="Open Sidebar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span class="text-sm font-bold text-white tracking-tight">WeSmile Admin</span>
        </div>
        
        <span class="text-xs bg-primary/10 border border-primary/20 text-primary font-bold px-3 py-1.5 rounded-lg">
          {{ activeTab === 'contacts' ? 'Contacts' : (activeTab === 'partnerships' ? 'Partnerships' : (activeTab === 'students' ? 'Students' : 'Chat')) }}
        </span>
      </header>

      <!-- Main Content Container -->
      <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <!-- Dashboard Title Header (visible on desktop) -->
        <div class="hidden lg:block mb-8">
          <h1 class="text-2xl font-extrabold text-white tracking-tight">
            {{ activeTab === 'contacts' ? 'Patient Contacts' : (activeTab === 'partnerships' ? 'B2B Partnerships' : (activeTab === 'students' ? 'Student Applications' : 'Live Chat Support')) }}
          </h1>
          <p class="text-xs text-slate-400 mt-1">Review, sort, filter, and manage incoming user requests.</p>
        </div>

      <!-- Stats Cards -->
      <div v-if="activeTab !== 'chat'" class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div class="backdrop-blur-xl bg-slate-900/50 rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Submissions</p>
              <p class="text-2xl sm:text-3xl font-extrabold text-white mt-1">{{ submissions.length }}</p>
            </div>
            <div class="w-10 h-10 bg-primary/10 border border-primary/25 rounded-xl flex items-center justify-center text-primary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
        </div>

        <div class="backdrop-blur-xl bg-slate-900/50 rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filtered Results</p>
              <p class="text-2xl sm:text-3xl font-extrabold text-white mt-1">{{ filteredSubmissions.length }}</p>
            </div>
            <div class="w-10 h-10 bg-secondary/10 border border-secondary/25 rounded-xl flex items-center justify-center text-secondary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="backdrop-blur-xl bg-slate-900/50 rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Latest Activity</p>
              <p class="text-sm font-bold text-white mt-2.5 truncate max-w-[200px]">
                {{ latestSubmissionTime }}
              </p>
            </div>
            <div class="w-10 h-10 bg-indigo-500/10 border border-indigo-500/25 rounded-xl flex items-center justify-center text-indigo-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Block -->
      <div v-if="activeTab !== 'chat'" class="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <!-- Search -->
          <div class="w-full lg:max-w-md">
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="activeSearchQuery"
                type="text"
                placeholder="Search by name, email..."
                class="block w-full pl-10 pr-4 py-2.5 bg-slate-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-white text-xs"
              />
            </div>
          </div>

          <!-- Sort and Action Controls -->
          <div class="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
            <div class="flex items-center gap-2">
              <select
                v-model="activeSortBy"
                class="px-3 py-2.5 bg-slate-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-300 text-xs font-semibold"
              >
                <option value="date">Sort by Date</option>
                <option v-if="activeTab === 'contacts' || activeTab === 'students'" value="name">Sort by Name</option>
                <option v-if="activeTab === 'partnerships'" value="company">Sort by Company</option>
                <option v-if="activeTab === 'partnerships'" value="contact">Sort by Contact Person</option>
                <option v-if="activeTab === 'students'" value="school">Sort by School</option>
              </select>

              <button
                @click="toggleSortOrder"
                class="p-2.5 bg-slate-950/50 border border-white/10 rounded-xl hover:bg-slate-900 transition-colors text-slate-400 hover:text-white cursor-pointer"
                :title="sortOrder === 'asc' ? 'Ascending' : 'Descending'"
              >
                <svg v-if="sortOrder === 'desc'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button
                @click="exportToCSV"
                class="px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/20 rounded-xl transition-all font-semibold flex items-center space-x-2 text-xs cursor-pointer shadow-md hover:shadow-green-500/5 active:scale-[0.98]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export CSV</span>
              </button>

              <button
                @click="fetchSubmissions"
                :disabled="loading"
                class="p-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl transition-all disabled:opacity-50 cursor-pointer active:scale-[0.98]"
                title="Refresh"
              >
                <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
        </div>
      </div>
    </div>

      <!-- Submissions Database Views -->
      <div v-if="activeTab !== 'chat'" class="space-y-6">
        <!-- Loading State -->
        <div v-if="loading && submissions.length === 0" class="backdrop-blur-xl bg-slate-900/50 rounded-2xl border border-white/10 p-12 text-center">
          <svg class="animate-spin h-8 w-8 text-secondary mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-slate-400 text-sm">Syncing system database...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="backdrop-blur-xl bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center max-w-md mx-auto">
          <svg class="h-10 w-10 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-300 font-semibold text-sm">{{ error }}</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredSubmissions.length === 0" class="backdrop-blur-xl bg-slate-900/50 rounded-2xl border border-white/10 p-12 text-center">
          <svg class="h-12 w-12 text-slate-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="text-base font-bold text-white mb-1">No submissions found</h3>
          <p class="text-slate-400 text-xs max-w-sm mx-auto">
            {{ activeSearchQuery ? 'Adjust your query keywords or check another tab.' : 'No data submissions received yet on this stream.' }}
          </p>
        </div>

        <!-- Tab 1: Contacts Table & Mobile Card List -->
        <div v-else-if="activeTab === 'contacts'">
          <!-- Mobile Card List (visible on small/medium screens) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            <div v-for="submission in filteredSubmissions" :key="submission.id" class="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-1 rounded">
                    {{ formatDate(submission.timestamp) }}
                  </span>
                  <span class="text-[10px] text-slate-500 font-medium">IP: {{ submission.ipAddress || 'N/A' }}</span>
                </div>
                <h4 class="text-sm font-bold text-white">{{ (submission as any).name }}</h4>
                <div class="text-xs text-slate-400 space-y-0.5">
                  <p><span class="text-slate-500">Email:</span> {{ submission.email }}</p>
                  <p v-if="submission.phone"><span class="text-slate-500">Phone:</span> {{ submission.phone }}</p>
                </div>
                <p class="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-white/5 italic line-clamp-3">
                  "{{ submission.message }}"
                </p>
              </div>
              
              <div class="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button @click="viewDetails(submission)" class="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs rounded-lg font-bold flex items-center gap-1 cursor-pointer">
                  <span>View Details</span>
                </button>
                <button @click="confirmDelete(submission)" class="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-white/5">
                <thead class="bg-slate-950/60">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Message</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">IP Address</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-white/[0.02] transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      <div class="flex flex-col">
                        <span class="font-bold">{{ formatDate(submission.timestamp) }}</span>
                        <span class="text-slate-500 text-[10px] mt-0.5">{{ formatTime(submission.timestamp) }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs font-bold text-white">
                      {{ (submission as any).name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      <div>{{ submission.email }}</div>
                      <div class="text-slate-500 text-[10px] mt-0.5">{{ submission.phone }}</div>
                    </td>
                    <td class="px-6 py-4 max-w-xs">
                      <div class="text-xs text-slate-300 line-clamp-2" :title="submission.message">
                        {{ submission.message }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                      {{ submission.ipAddress || 'N/A' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      <button @click="viewDetails(submission)" class="text-primary hover:text-white mr-3 cursor-pointer inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button @click="confirmDelete(submission)" class="text-red-400 hover:text-red-300 cursor-pointer inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab 2: Partnerships Table & Mobile Card List -->
        <div v-else-if="activeTab === 'partnerships'">
          <!-- Mobile Card List -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            <div v-for="submission in filteredSubmissions" :key="submission.id" class="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-1 rounded">
                    {{ formatDate(submission.timestamp) }}
                  </span>
                  <span class="text-[10px] bg-secondary/10 border border-secondary/20 text-secondary font-bold px-2.5 py-0.5 rounded">
                    {{ formatPartnershipFocus((submission as any).partnershipType) }}
                  </span>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">{{ (submission as any).companyName }}</h4>
                  <p class="text-xs text-slate-400">Contact: {{ (submission as any).contactName }}</p>
                </div>
                <div class="text-xs text-slate-400 space-y-0.5">
                  <p><span class="text-slate-500">Email:</span> {{ submission.email }}</p>
                  <p v-if="submission.phone"><span class="text-slate-500">Phone:</span> {{ submission.phone }}</p>
                </div>
                <p class="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-white/5 italic line-clamp-3">
                  "{{ submission.message }}"
                </p>
              </div>
              
              <div class="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button @click="viewDetails(submission)" class="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs rounded-lg font-bold flex items-center gap-1 cursor-pointer">
                  <span>View Details</span>
                </button>
                <button @click="confirmDelete(submission)" class="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-white/5">
                <thead class="bg-slate-950/60">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Company</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Person</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Partnership Focus</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Proposal Message</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-white/[0.02] transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      <div class="flex flex-col">
                        <span class="font-bold">{{ formatDate(submission.timestamp) }}</span>
                        <span class="text-slate-500 text-[10px] mt-0.5">{{ formatTime(submission.timestamp) }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs font-bold text-white">
                      {{ (submission as any).companyName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      {{ (submission as any).contactName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      <div>{{ submission.email }}</div>
                      <div class="text-slate-500 text-[10px] mt-0.5">{{ submission.phone }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs">
                      <span class="px-2.5 py-1 bg-secondary/15 border border-secondary/20 text-secondary rounded text-[10px] font-bold">
                        {{ formatPartnershipFocus((submission as any).partnershipType) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 max-w-xs">
                      <div class="text-xs text-slate-300 line-clamp-2" :title="submission.message">
                        {{ submission.message }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      <button @click="viewDetails(submission)" class="text-primary hover:text-white mr-3 cursor-pointer inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button @click="confirmDelete(submission)" class="text-red-400 hover:text-red-300 cursor-pointer inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab 3: Students Table & Mobile Card List -->
        <div v-else-if="activeTab === 'students'">
          <!-- Mobile Card List -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            <div v-for="submission in filteredSubmissions" :key="submission.id" class="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-1 rounded">
                    {{ formatDate(submission.timestamp) }}
                  </span>
                  <span class="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded">
                    {{ formatYearOfStudy((submission as any).yearOfStudy) }}
                  </span>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">{{ (submission as any).fullName }}</h4>
                  <p class="text-xs text-slate-400 mt-0.5">{{ (submission as any).school }}</p>
                  <p class="text-[10px] text-secondary font-semibold mt-1">Focus: {{ formatSpecialtyInterest((submission as any).specialtyInterest) }}</p>
                </div>
                <div class="text-xs text-slate-400 space-y-0.5">
                  <p><span class="text-slate-500">Email:</span> {{ submission.email }}</p>
                  <p v-if="submission.phone"><span class="text-slate-500">Phone:</span> {{ submission.phone }}</p>
                </div>
                
                <div class="bg-slate-950/40 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <span class="text-xs text-slate-400">CV Application:</span>
                  <a :href="(submission as any).resumeUrl" target="_blank" class="text-primary hover:underline font-bold text-xs inline-flex items-center space-x-1">
                    <span>View Resume</span>
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div class="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button @click="viewDetails(submission)" class="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs rounded-lg font-bold flex items-center gap-1 cursor-pointer">
                  <span>View Details</span>
                </button>
                <button @click="confirmDelete(submission)" class="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-white/5">
                <thead class="bg-slate-950/60">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Dental School / University</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Study Year / Specialty</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Resume / Link</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-white/[0.02] transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      <div class="flex flex-col">
                        <span class="font-bold">{{ formatDate(submission.timestamp) }}</span>
                        <span class="text-slate-500 text-[10px] mt-0.5">{{ formatTime(submission.timestamp) }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs font-bold text-white">
                      {{ (submission as any).fullName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      <div>{{ submission.email }}</div>
                      <div class="text-slate-500 text-[10px] mt-0.5">{{ submission.phone }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      {{ (submission as any).school }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs">
                      <div class="font-bold text-white">{{ formatYearOfStudy((submission as any).yearOfStudy) }}</div>
                      <div class="text-secondary font-semibold text-[10px] mt-0.5">{{ formatSpecialtyInterest((submission as any).specialtyInterest) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      <a :href="(submission as any).resumeUrl" target="_blank" class="text-primary hover:underline font-bold text-xs inline-flex items-center space-x-1">
                        <span>View CV</span>
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      <button @click="viewDetails(submission)" class="text-primary hover:text-white mr-3 cursor-pointer inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button @click="confirmDelete(submission)" class="text-red-400 hover:text-red-300 cursor-pointer inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 4: Live Support Mobile Responsive Layout -->
      <div v-if="activeTab === 'chat'" class="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row h-[550px] shadow-2xl">
        <!-- Sidebar: Active Sessions (visible on desktop OR on mobile when viewModeMobile is 'list') -->
        <div 
          class="w-full md:w-80 border-r border-white/5 flex flex-col h-full bg-slate-950/40"
          :class="{ 'hidden md:flex': viewModeMobile === 'chat' }"
        >
          <div class="p-4 border-b border-white/5 bg-slate-950/40 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-xs uppercase tracking-wider">Visitor Chats</h3>
              <span class="text-[10px] text-slate-400 font-bold font-mono">
                {{ chatSubTab === 'active' ? activeChatSessions.length : archivedChatSessions.length }}
              </span>
            </div>
            
            <div class="flex bg-slate-950 border border-white/5 rounded-lg p-0.5">
              <button 
                @click="chatSubTab = 'active'"
                class="flex-1 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer text-center"
                :class="chatSubTab === 'active' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'"
              >
                Active
              </button>
              <button 
                @click="chatSubTab = 'archived'"
                class="flex-1 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer text-center"
                :class="chatSubTab === 'archived' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'"
              >
                Archived
              </button>
            </div>
          </div>
          
          <div class="flex-grow overflow-y-auto p-2 space-y-1">
            <div v-if="sessionsLoading" class="p-8 text-center text-xs text-slate-500">
              Syncing channels...
            </div>
            <div v-else-if="(chatSubTab === 'active' ? activeChatSessions : archivedChatSessions).length === 0" class="p-8 text-center text-xs text-slate-500">
              No {{ chatSubTab }} conversations.
            </div>
            <div
              v-for="session in (chatSubTab === 'active' ? activeChatSessions : archivedChatSessions)"
              :key="session.visitorId"
              class="w-full text-left p-3 rounded-xl hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-between gap-2 border border-transparent"
              :class="activeSessionId === session.visitorId ? 'bg-primary/10 border-primary/30 shadow-inner' : ''"
              @click="selectSession(session.visitorId)"
            >
              <div class="flex-grow min-w-0">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white text-xs truncate max-w-[120px]">{{ session.visitorId }}</span>
                  <span class="text-[9px] text-slate-500 font-bold shrink-0 ml-1">{{ formatRelativeTime(session.updatedAt) }}</span>
                </div>
                <p class="text-xs text-slate-400 truncate font-medium mt-0.5">{{ session.lastMessage }}</p>
              </div>
              
              <div class="flex items-center gap-1 shrink-0" @click.stop>
                <button 
                  v-if="chatSubTab === 'active'"
                  @click="archiveSession(session.visitorId)"
                  class="p-1 text-slate-500 hover:text-green-400 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title="Mark Completed"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button 
                  v-else
                  @click="restoreSession(session.visitorId)"
                  class="p-1 text-slate-500 hover:text-primary hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title="Restore to Active"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                
                <button 
                  @click="confirmDeleteChat(session.visitorId)"
                  class="p-1 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title="Delete Chat"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Conversation Area (visible on desktop OR on mobile when viewModeMobile is 'chat') -->
        <div 
          class="flex-grow flex flex-col h-full bg-slate-900/10 relative"
          :class="{ 'hidden md:flex': viewModeMobile === 'list' }"
        >
          <div v-if="!activeSessionId" class="flex-grow flex flex-col items-center justify-center p-8 text-slate-500 bg-slate-950/20 text-center">
            <svg class="h-10 w-10 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="text-xs font-semibold text-slate-400">Select an active conversation sidebar to view and respond.</p>
          </div>

          <template v-else>
            <!-- Chat Header with mobile back button -->
            <div class="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-950/40">
              <div class="flex items-center space-x-3">
                <button 
                  @click="backToSessionsList" 
                  class="md:hidden p-2 bg-slate-900 border border-white/15 rounded-xl text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
                  title="Back to sessions"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h4 class="font-bold text-white text-xs">Visitor: {{ activeSessionId }}</h4>
                  <p class="text-[9px] text-green-400 font-bold flex items-center mt-0.5">
                    <span class="h-1.5 w-1.5 rounded-full bg-green-400 inline-block mr-1 animate-pulse"></span>
                    <span>Live Channel Connected</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Messages Stream -->
            <div ref="adminMessagesContainer" class="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/20">
              <div v-if="messagesLoading" class="text-center text-xs text-slate-500 py-8">
                Syncing timeline...
              </div>
              <div 
                v-for="msg in activeMessages" 
                :key="msg.id"
                class="flex flex-col"
                :class="msg.sender === 'admin' ? 'items-end' : 'items-start'"
              >
                <div class="text-[9px] text-slate-500 font-bold mb-0.5 px-2">
                  {{ msg.sender === 'admin' ? 'Agent Support' : 'Visitor' }}
                </div>
                <div 
                  class="max-w-[75%] rounded-2xl px-4 py-2.5 text-xs shadow-md leading-relaxed"
                  :class="msg.sender === 'admin' ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-900 text-slate-200 border border-white/10 rounded-tl-none'"
                >
                  {{ msg.text }}
                </div>
              </div>
            </div>

            <!-- Reply Input Box -->
            <div class="p-4 border-t border-white/5 bg-slate-950/40">
              <form @submit.prevent="sendReply" class="flex items-center space-x-2">
                <input 
                  v-model="replyText"
                  type="text"
                  placeholder="Type an admin reply..."
                  class="flex-grow px-4 py-3 text-xs bg-slate-950 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-white placeholder-slate-500"
                >
                <button 
                  type="submit"
                  class="bg-gradient-to-r from-primary to-secondary text-white px-5 py-3 rounded-xl hover:opacity-90 transition-all cursor-pointer text-xs font-bold shrink-0 shadow-lg shadow-primary/20 active:scale-[0.97]"
                >
                  Send
                </button>
              </form>
            </div>
          </template>
        </div>
      </div>
    </main>

    <!-- Detail Modal -->
    <div v-if="selectedSubmission" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" @click.self="selectedSubmission = null">
      <div class="bg-slate-900/90 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div class="sticky top-0 bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between z-10">
          <h3 class="text-lg font-bold text-white tracking-tight">Submission Details</h3>
          <button @click="selectedSubmission = null" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-5 text-sm">
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</label>
            <p class="text-slate-200 mt-1 font-semibold">{{ formatDate(selectedSubmission.timestamp) }} at {{ formatTime(selectedSubmission.timestamp) }}</p>
          </div>
          
          <!-- Tab 1 Details -->
          <div v-if="activeTab === 'contacts'">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</label>
            <p class="text-white mt-1 font-bold text-base">{{ selectedSubmission.name }}</p>
          </div>
          
          <!-- Tab 2 Details -->
          <div v-if="activeTab === 'partnerships'" class="space-y-4">
            <div>
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
              <p class="text-white mt-1 font-bold text-base">{{ (selectedSubmission as any).companyName }}</p>
            </div>
            <div>
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Person</label>
              <p class="text-slate-200 mt-1 font-semibold">{{ (selectedSubmission as any).contactName }}</p>
            </div>
            <div>
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Partnership Focus</label>
              <p class="mt-1.5">
                <span class="px-2.5 py-1 bg-secondary/15 border border-secondary/20 text-secondary rounded text-[10px] font-bold">
                  {{ formatPartnershipFocus((selectedSubmission as any).partnershipType) }}
                </span>
              </p>
            </div>
          </div>

          <!-- Tab 3 Details -->
          <div v-if="activeTab === 'students'" class="space-y-4">
            <div>
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</label>
              <p class="text-white mt-1 font-bold text-base">{{ (selectedSubmission as any).fullName }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Dental School / College</label>
                <p class="text-slate-200 mt-1 font-semibold">{{ (selectedSubmission as any).school }}</p>
              </div>
              <div>
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Year of Study</label>
                <p class="text-slate-200 mt-1 font-semibold">{{ formatYearOfStudy((selectedSubmission as any).yearOfStudy) }}</p>
              </div>
            </div>
            <div>
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Specialty Interest Focus</label>
              <p class="text-secondary mt-1 font-bold">{{ formatSpecialtyInterest((selectedSubmission as any).specialtyInterest) }}</p>
            </div>
            <div>
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Resume / CV Link</label>
              <p class="mt-1.5">
                <a :href="(selectedSubmission as any).resumeUrl" target="_blank" class="text-primary hover:underline font-bold text-xs inline-flex items-center space-x-1.5 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-xl">
                  <span>Open CV File</span>
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </p>
            </div>
          </div>

          <!-- Common Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
              <p class="mt-1">
                <a :href="`mailto:${selectedSubmission.email}`" class="text-primary hover:underline font-semibold">
                  {{ selectedSubmission.email }}
                </a>
              </p>
            </div>
            
            <div v-if="selectedSubmission.phone">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
              <p class="mt-1">
                <a :href="`tel:${selectedSubmission.phone}`" class="text-primary hover:underline font-semibold">
                  {{ selectedSubmission.phone }}
                </a>
              </p>
            </div>
          </div>
          
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {{ activeTab === 'contacts' ? 'Message' : (activeTab === 'partnerships' ? 'Partnership Proposal Description' : 'Clinical SOP / Statement of Purpose') }}
            </label>
            <p class="text-slate-200 mt-1.5 whitespace-pre-wrap leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5 font-medium text-xs">{{ selectedSubmission.message }}</p>
          </div>
          
          <div class="pt-4 border-t border-white/5 flex flex-col gap-2 text-[10px] text-slate-500">
            <div>
              <span class="font-bold uppercase tracking-wider text-slate-600">IP Address:</span> <span class="font-mono text-slate-400">{{ selectedSubmission.ipAddress || 'N/A' }}</span>
            </div>
            <div v-if="selectedSubmission.userAgent" class="flex flex-col gap-1">
              <span class="font-bold uppercase tracking-wider text-slate-600">User Agent:</span>
              <p class="break-all font-mono text-slate-400 leading-normal">{{ selectedSubmission.userAgent }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteConfirmation" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click.self="deleteConfirmation = null">
      <div class="bg-slate-900 border border-white/10 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
        <div class="flex items-center justify-center w-12 h-12 bg-red-500/10 border border-red-500/25 rounded-full mx-auto mb-4 text-red-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 class="text-lg font-bold text-white tracking-tight mb-2">Delete Submission?</h3>
        <p class="text-slate-400 text-xs leading-relaxed mb-6">
          Are you sure you want to delete the submission from <strong class="text-white">{{ deleteConfirmationName }}</strong>? This action cannot be undone.
        </p>
        
        <div class="flex space-x-3 text-xs font-semibold">
          <button
            @click="deleteConfirmation = null"
            class="flex-1 px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Chat Delete Confirmation Modal -->
    <div v-if="chatDeleteConfirmation" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click.self="chatDeleteConfirmation = null">
      <div class="bg-slate-900 border border-white/10 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
        <div class="flex items-center justify-center w-12 h-12 bg-red-500/10 border border-red-500/25 rounded-full mx-auto mb-4 text-red-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        
        <h3 class="text-lg font-bold text-white tracking-tight mb-2">Delete Chat Session?</h3>
        <p class="text-slate-400 text-xs leading-relaxed mb-6">
          Are you sure you want to delete the chat history for visitor <strong class="text-white">{{ chatDeleteConfirmation }}</strong>? This action cannot be undone.
        </p>
        
        <div class="flex space-x-3 text-xs font-semibold">
          <button
            @click="chatDeleteConfirmation = null"
            class="flex-1 px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="handleDeleteChat"
            class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useContactSubmissions } from '../composables/useContactSubmissions'
import { usePartnershipSubmissions } from '../composables/usePartnershipSubmissions'
import { useStudentApplications } from '../composables/useStudentApplications'
import { useAdminChat } from '../composables/useAdminChat'
import type { Timestamp } from 'firebase/firestore'

const router = useRouter()
const { user, logout } = useAuth()

const activeTab = ref<'contacts' | 'partnerships' | 'students' | 'chat'>('contacts')

// Load the three separate stores
const contactStore = useContactSubmissions()
const partnershipStore = usePartnershipSubmissions()
const studentStore = useStudentApplications()

// Load live admin chat
const {
  sessions,
  activeSessionId,
  activeMessages,
  sessionsLoading,
  messagesLoading,
  startSessionsListener,
  selectSession,
  sendAdminMessage,
  archiveSession,
  restoreSession,
  deleteSession
} = useAdminChat()

const chatSubTab = ref<'active' | 'archived'>('active')

const activeChatSessions = computed(() => 
  sessions.value.filter(s => !s.status || s.status === 'active')
)

const archivedChatSessions = computed(() => 
  sessions.value.filter(s => s.status === 'completed')
)

const chatDeleteConfirmation = ref<string | null>(null)

const confirmDeleteChat = (visitorId: string) => {
  chatDeleteConfirmation.value = visitorId
}

const handleDeleteChat = async () => {
  if (!chatDeleteConfirmation.value) return
  await deleteSession(chatDeleteConfirmation.value)
  chatDeleteConfirmation.value = null
}

const replyText = ref('')
const adminMessagesContainer = ref<HTMLElement | null>(null)

// Mobile chat view state ('list' showing active sessions, 'chat' showing messages)
const viewModeMobile = ref<'list' | 'chat'>('list')

watch(activeSessionId, (newId) => {
  if (newId) {
    viewModeMobile.value = 'chat'
  } else {
    viewModeMobile.value = 'list'
  }
})

const backToSessionsList = () => {
  selectSession('')
  viewModeMobile.value = 'list'
}

const scrollAdminChat = async () => {
  await nextTick()
  if (adminMessagesContainer.value) {
    adminMessagesContainer.value.scrollTo({
      top: adminMessagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

watch(activeMessages, () => {
  scrollAdminChat()
}, { deep: true })

const sendReply = async () => {
  if (!replyText.value.trim()) return
  await sendAdminMessage(replyText.value.trim())
  replyText.value = ''
}

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
const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const changeTab = (tab: 'contacts' | 'partnerships' | 'students' | 'chat') => {
  activeTab.value = tab
  isSidebarOpen.value = false
  if (tab === 'chat') {
    startSessionsListener()
  } else {
    activeStore.value.fetchSubmissions()
  }
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
