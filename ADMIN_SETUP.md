# Admin Dashboard Setup Guide

## Overview
The admin dashboard allows you to view, search, filter, and manage contact form submissions stored in Firebase Firestore.

## Features
- 🔐 Secure authentication with Firebase Auth
- 📊 Statistics dashboard (total submissions, filtered results, latest submission)
- 🔍 Real-time search across all fields
- 🔄 Sort by date, name, or email (ascending/descending)
- 📥 Export submissions to CSV
- 👁️ View detailed submission information
- 🗑️ Delete submissions with confirmation
- 📱 Responsive design for mobile and desktop

## Setup Instructions

### 1. Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** in the left sidebar
4. Click **Get Started** (if not already enabled)
5. Go to the **Sign-in method** tab
6. Enable **Email/Password** authentication
7. Click **Save**

### 2. Create an Admin User

You need to create an admin user account in Firebase:

**Option A: Using Firebase Console**
1. In Firebase Console, go to **Authentication** > **Users**
2. Click **Add User**
3. Enter your admin email and password
4. Click **Add User**

**Option B: Using Firebase CLI** (if you have it installed)
```bash
firebase auth:import admin-user.json --project your-project-id
```

### 3. Access the Admin Dashboard

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/admin/login`

3. Login with your admin credentials

4. You'll be redirected to: `http://localhost:5173/admin/dashboard`

## Security Considerations

### Firestore Security Rules

Make sure your Firestore rules allow authenticated users to read and delete from the `contactSubmissions` collection. Update your `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contact submissions - anyone can write, only authenticated admins can read/delete
    match /contactSubmissions/{document=**} {
      allow create: if true; // Allow public form submissions
      allow read, delete: if request.auth != null; // Only authenticated users can read/delete
    }
    
    // Rate limiting collection
    match /rateLimits/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Production Deployment

For production, consider:

1. **Custom Claims**: Add custom claims to admin users to distinguish them from regular users
2. **Admin-only emails**: Restrict admin access to specific email domains
3. **IP Whitelisting**: Limit admin access to specific IP addresses
4. **2FA**: Enable two-factor authentication for admin accounts
5. **Audit Logging**: Track all admin actions (view, delete, export)

## Usage Guide

### Dashboard Features

**Statistics Cards**
- Total Submissions: Shows all contact submissions
- Filtered Results: Shows submissions matching current search/filter
- Latest Submission: Shows relative time of the most recent submission

**Search**
- Search across name, email, phone, and message fields
- Real-time filtering as you type

**Sort**
- Sort by Date (default), Name, or Email
- Toggle between ascending/descending order

**Export to CSV**
- Exports all filtered submissions to a CSV file
- Includes: Date, Name, Email, Phone, Message, IP Address
- Filename format: `contact-submissions-YYYY-MM-DD.csv`

**View Details**
- Click the eye icon to view full submission details
- Shows all metadata including User Agent

**Delete**
- Click the trash icon to delete a submission
- Confirmation dialog prevents accidental deletion

**Refresh**
- Click the refresh icon to reload submissions from Firestore

## Troubleshooting

### "Invalid email or password" error
- Verify the user exists in Firebase Console > Authentication > Users
- Check that Email/Password authentication is enabled
- Ensure you're using the correct credentials

### "Failed to load submissions" error
- Check Firestore security rules allow authenticated reads
- Verify your Firebase configuration in `.env` file
- Check browser console for detailed error messages

### Route guard not working
- Clear browser cache and cookies
- Check that Firebase Auth is properly initialized
- Verify the auth state is persisting (check Application > Local Storage in DevTools)

## Environment Variables

Make sure these are set in your `.env` file:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Check Firestore security rules
4. Ensure admin user exists in Firebase Authentication
