import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db: Firestore | null = null;
let auth: Auth | null = null;

// Only initialize Firebase if API key is present and doesn't look like a placeholder
const hasValidApiKey = firebaseConfig.apiKey && 
                       firebaseConfig.apiKey !== 'your-api-key' && 
                       firebaseConfig.apiKey.trim() !== '';

if (hasValidApiKey) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
} else {
  console.warn(
    'Firebase is not initialized because a valid VITE_FIREBASE_API_KEY was not found in the environment variables. ' +
    'Please set up your local .env file. The app will run in offline/demo mode.'
  );
}

export { db, auth };