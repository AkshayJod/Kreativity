# Debugging Google OAuth - Step by Step Guide

If you've added the Client ID but it's still not working, follow these steps:

## Step 1: Verify Your .env Files Exist

Check if both files exist:
- ✅ `client/.env` 
- ✅ `server/.env`

## Step 2: Check the Exact Content

### Frontend (`client/.env`)
Open the file and verify it looks EXACTLY like this (no quotes, no spaces):

```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

**Common mistakes:**
- ❌ `GOOGLE_CLIENT_ID=...` (missing VITE_ prefix)
- ❌ `VITE_GOOGLE_CLIENT_ID="..."` (has quotes)
- ❌ `VITE_GOOGLE_CLIENT_ID = ...` (has spaces around =)
- ❌ `VITE_GOOGLE_CLIENT_ID= ...` (has space after =)

### Backend (`server/.env`)
Open the file and verify it looks EXACTLY like this:

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

**Important:** Use the SAME Client ID value in both files.

## Step 3: Check Server Console

When you start your backend server, you should see:

```
✅ Google OAuth Client ID loaded successfully
   Client ID: 123456789-abcdefgh...
```

If you see:
```
❌ GOOGLE_CLIENT_ID not found in environment variables
```

Then:
1. Check the file exists: `server/.env`
2. Check the variable name is exactly: `GOOGLE_CLIENT_ID`
3. Restart the server

## Step 4: Check Browser Console

1. Open your app in browser: `http://localhost:5173`
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for the debug messages

You should see:
```
🔍 Google OAuth Debug Info:
  Client ID loaded: YES
  Client ID value: 123456789-abcdefgh...
```

If you see:
```
❌ Google OAuth Client ID not configured!
```

Then:
1. Check the file exists: `client/.env`
2. Check the variable name is exactly: `VITE_GOOGLE_CLIENT_ID`
3. Restart the frontend dev server

## Step 5: Restart Both Servers

**CRITICAL:** Environment variables are only loaded when servers start!

1. **Stop both servers** (Ctrl+C in both terminals)
2. **Start backend:**
   ```bash
   cd server
   npm run dev
   ```
3. **Start frontend:**
   ```bash
   cd client
   npm run dev
   ```

## Step 6: Test in Browser Console

After restarting, open browser console and type:

```javascript
import.meta.env.VITE_GOOGLE_CLIENT_ID
```

It should show your Client ID (not `undefined`).

## Step 7: Verify Google Cloud Console Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Check:

   **Authorized JavaScript origins:**
   - Must include: `http://localhost:5173`
   - No trailing slash
   - Exact match (case-sensitive)

   **Authorized redirect URIs:**
   - Must include: `http://localhost:5173`
   - No trailing slash
   - Exact match

## Step 8: Common Issues and Fixes

### Issue: "invalid_client" error still appears

**Possible causes:**
1. Client ID doesn't match between frontend and backend
2. Client ID is incorrect in Google Console
3. Authorized origins/redirects not set correctly
4. OAuth consent screen not configured

**Fix:**
- Double-check Client ID in both .env files match exactly
- Verify in Google Console that the Client ID exists
- Make sure origins/redirects are set correctly
- Complete OAuth consent screen setup

### Issue: Variable shows as `undefined` in browser

**Possible causes:**
1. Variable name wrong (must be `VITE_GOOGLE_CLIENT_ID`)
2. File in wrong location (must be in `client/` folder)
3. Server not restarted after adding .env

**Fix:**
- Check variable name is exactly `VITE_GOOGLE_CLIENT_ID`
- Make sure `client/.env` is in the `client/` folder (not root)
- Restart frontend dev server

### Issue: Server says Client ID not found

**Possible causes:**
1. Variable name wrong (must be `GOOGLE_CLIENT_ID`)
2. File in wrong location (must be in `server/` folder)
3. Server not restarted after adding .env

**Fix:**
- Check variable name is exactly `GOOGLE_CLIENT_ID`
- Make sure `server/.env` is in the `server/` folder (not root)
- Restart backend server

### Issue: Works in console but not in app

**Possible causes:**
1. Cached build
2. Browser cache

**Fix:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Try incognito/private window

## Step 9: Quick Test Script

Run this from the root directory to check your setup:

```bash
node test-google-oauth.js
```

This will verify:
- Both .env files exist
- Variable names are correct
- Values match
- Format looks correct

## Step 10: Still Not Working?

If after all these steps it's still not working:

1. **Create a fresh OAuth client:**
   - Go to Google Cloud Console
   - Delete old client (or create new one)
   - Create new OAuth 2.0 Client ID
   - Copy the new Client ID
   - Update both .env files
   - Restart both servers

2. **Check for typos:**
   - Copy-paste Client ID directly from Google Console
   - Don't type it manually
   - Check for hidden characters

3. **Verify the exact error:**
   - What error message do you see?
   - When does it appear? (on page load? on button click?)
   - Check both browser console and server console

## Quick Checklist

Before asking for help, verify:

- [ ] `client/.env` exists with `VITE_GOOGLE_CLIENT_ID=...`
- [ ] `server/.env` exists with `GOOGLE_CLIENT_ID=...`
- [ ] Both use the SAME Client ID value
- [ ] No quotes around values
- [ ] No spaces around `=`
- [ ] Variable names are exactly correct (case-sensitive)
- [ ] Both servers restarted after adding/changing .env
- [ ] Browser console shows Client ID loaded
- [ ] Server console shows Client ID loaded
- [ ] Google Console has correct origins/redirects
- [ ] OAuth consent screen is configured





