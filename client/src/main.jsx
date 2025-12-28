import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Enhanced debugging for Google Client ID
console.log('🔍 Google OAuth Debug Info:');
console.log('  Client ID loaded:', googleClientId ? 'YES' : 'NO');
console.log('  Client ID value:', googleClientId ? `${googleClientId.substring(0, 20)}...` : 'undefined');
console.log('  Full env check:', import.meta.env);

// Check if Google Client ID is configured
if (!googleClientId || googleClientId === "YOUR_GOOGLE_CLIENT_ID" || googleClientId.trim() === "") {
    console.error('❌ Google OAuth Client ID not configured!');
    console.error('Please add VITE_GOOGLE_CLIENT_ID to your client/.env file');
    console.error('Example: VITE_GOOGLE_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com');
    console.error('See GOOGLE_OAUTH_SETUP.md for instructions');
    console.error('');
    console.error('⚠️ Make sure:');
    console.error('  1. File exists: client/.env');
    console.error('  2. Variable name is exactly: VITE_GOOGLE_CLIENT_ID');
    console.error('  3. No quotes around the value');
    console.error('  4. Restart the dev server after adding/changing .env');
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={googleClientId || ""}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
