# Quick Fix: Google OAuth Not Working

## ✅ Problem Found

The `client/.env` file was missing! I've created it for you.

## 🔧 What You Need to Do

### Step 1: Get Your Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID
4. Copy the Client ID (looks like: `123456789-xxxxx.apps.googleusercontent.com`)

### Step 2: Update `client/.env`

Open `client/.env` and replace `your_google_client_id_here.apps.googleusercontent.com` with your actual Client ID:

```env
VITE_GOOGLE_CLIENT_ID=123456789-your-actual-client-id-here.apps.googleusercontent.com
```

**Important:**
- No quotes around the value
- No spaces around the `=`
- Must start with `VITE_` prefix

### Step 3: Verify `server/.env`

Open `server/.env` and make sure it has:

```env
GOOGLE_CLIENT_ID=123456789-your-actual-client-id-here.apps.googleusercontent.com
```

**Important:** Use the SAME Client ID value in both files!

### Step 4: Restart Both Servers

**CRITICAL:** You MUST restart both servers after adding/changing .env files!

1. **Stop both servers** (Press Ctrl+C in both terminal windows)

2. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```
   You should see: `✅ Google OAuth Client ID loaded successfully`

3. **Start Frontend:**
   ```bash
   cd client
   npm run dev
   ```

4. **Check Browser Console:**
   - Open `http://localhost:5173`
   - Press F12
   - Look for: `🔍 Google OAuth Debug Info: Client ID loaded: YES`

### Step 5: Test Google Login

1. Go to `/login` page
2. Click "Sign in with Google"
3. It should work now! 🎉

## ❌ Still Not Working?

### Check 1: Browser Console
Open browser console (F12) and look for:
- ✅ `Client ID loaded: YES` = Good!
- ❌ `Client ID loaded: NO` = Check `client/.env` file

### Check 2: Server Console
Look at your backend server terminal:
- ✅ `✅ Google OAuth Client ID loaded successfully` = Good!
- ❌ `❌ GOOGLE_CLIENT_ID not found` = Check `server/.env` file

### Check 3: Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials** → Your OAuth Client
3. Verify:
   - **Authorized JavaScript origins:** `http://localhost:5173`
   - **Authorized redirect URIs:** `http://localhost:5173`

## 📋 Quick Checklist

- [ ] `client/.env` exists with `VITE_GOOGLE_CLIENT_ID=...`
- [ ] `server/.env` exists with `GOOGLE_CLIENT_ID=...`
- [ ] Both use the SAME Client ID
- [ ] No quotes around values
- [ ] Both servers restarted
- [ ] Browser console shows Client ID loaded
- [ ] Google Console has correct origins/redirects

## 🆘 Need More Help?

See `DEBUG_GOOGLE_OAUTH.md` for detailed troubleshooting steps.





