// Quick diagnostic script to test Google OAuth configuration
// Run this from the root directory: node test-google-oauth.js

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load server .env
const serverEnvPath = join(__dirname, 'server', '.env');
dotenv.config({ path: serverEnvPath });

console.log('\n🔍 Google OAuth Configuration Check\n');
console.log('=' .repeat(50));

// Check server environment
console.log('\n📦 SERVER Configuration:');
console.log('  File location:', serverEnvPath);
const serverClientId = process.env.GOOGLE_CLIENT_ID;
if (serverClientId) {
    console.log('  ✅ GOOGLE_CLIENT_ID found');
    console.log('  Value:', serverClientId.substring(0, 20) + '...');
    console.log('  Length:', serverClientId.length);
    if (serverClientId.includes('.apps.googleusercontent.com')) {
        console.log('  ✅ Format looks correct');
    } else {
        console.log('  ⚠️  Format might be incorrect (should end with .apps.googleusercontent.com)');
    }
} else {
    console.log('  ❌ GOOGLE_CLIENT_ID NOT FOUND');
    console.log('  Make sure server/.env exists with GOOGLE_CLIENT_ID=...');
}

// Check client environment (read file directly since Vite handles it)
import { readFileSync } from 'fs';
const clientEnvPath = join(__dirname, 'client', '.env');
try {
    const clientEnvContent = readFileSync(clientEnvPath, 'utf8');
    console.log('\n📦 CLIENT Configuration:');
    console.log('  File location:', clientEnvPath);
    
    const viteClientIdMatch = clientEnvContent.match(/VITE_GOOGLE_CLIENT_ID=(.+)/);
    if (viteClientIdMatch) {
        const clientId = viteClientIdMatch[1].trim();
        console.log('  ✅ VITE_GOOGLE_CLIENT_ID found');
        console.log('  Value:', clientId.substring(0, 20) + '...');
        console.log('  Length:', clientId.length);
        
        // Check if they match
        if (serverClientId && clientId === serverClientId) {
            console.log('  ✅ Client IDs MATCH');
        } else if (serverClientId) {
            console.log('  ⚠️  Client IDs DO NOT MATCH');
            console.log('  Make sure both .env files use the same Client ID');
        }
        
        if (clientId.includes('.apps.googleusercontent.com')) {
            console.log('  ✅ Format looks correct');
        } else {
            console.log('  ⚠️  Format might be incorrect');
        }
    } else {
        console.log('  ❌ VITE_GOOGLE_CLIENT_ID NOT FOUND');
        console.log('  Make sure client/.env exists with VITE_GOOGLE_CLIENT_ID=...');
    }
} catch (error) {
    console.log('\n📦 CLIENT Configuration:');
    console.log('  ❌ Could not read client/.env file');
    console.log('  Error:', error.message);
    console.log('  Make sure client/.env exists');
}

console.log('\n' + '='.repeat(50));
console.log('\n📋 Next Steps:');
console.log('1. Make sure both .env files exist');
console.log('2. Restart both servers after making changes');
console.log('3. Check browser console for any errors');
console.log('4. Verify Google Cloud Console settings\n');





