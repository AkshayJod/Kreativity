# Troubleshooting Google OAuth "invalid_client" Error

## Error: "Access blocked: Authorization Error - Error 401: invalid_client"

This error means Google cannot find your OAuth client. Here's how to fix it:

## Step 1: Verify Your Environment Variables

### Check Frontend (.env file in `client/` folder)

Create or update `client/.env`:
```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
```

**Important Notes:**
- The variable name MUST be `VITE_GOOGLE_CLIENT_ID` (with `VITE_` prefix)
- Remove any quotes around the value
- No spaces before or after the `=`
- Restart your Vite dev server after adding/changing this

### Check Backend (.env file in `server/` folder)

Create or update `server/.env`:
```env
GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
```

**Important Notes:**
- The variable name is `GOOGLE_CLIENT_ID` (no `VITE_` prefix)
- Use the SAME Client ID as in the frontend
- Remove any quotes around the value
- Restart your Node.js server after adding/changing this

## Step 2: Verify Your Google Cloud Console Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Select your project**
3. **Navigate to:** APIs & Services → Credentials
4. **Find your OAuth 2.0 Client ID**
5. **Click on it to view details**

### Check Authorized JavaScript Origins

Make sure these are added:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (if using different port)
- Your production domain (when deploying)

### Check Authorized Redirect URIs

Make sure these are added:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (if using different port)
- Your production domain (when deploying)

## Step 3: Verify Your Client ID Format

Your Client ID should look like this:
```
123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

**Common mistakes:**
- ❌ Including quotes: `"123456789-..."`
- ❌ Including spaces: ` 123456789-... `
- ❌ Using Client Secret instead of Client ID
- ❌ Using an old/deleted Client ID

## Step 4: Restart Your Servers

After updating `.env` files, you MUST restart:

### Frontend (Vite)
```bash
# Stop the server (Ctrl+C)
# Then restart:
cd client
npm run dev
```

### Backend (Node.js)
```bash
# Stop the server (Ctrl+C)
# Then restart:
cd server
npm run dev
```

**Why?** Environment variables are loaded when the server starts. Changes won't take effect until restart.

## Step 5: Check Browser Console

Open your browser's Developer Console (F12) and check for:
- Any warnings about missing Client ID
- Any errors from Google OAuth

## Step 6: Verify the Client ID is Being Used

### Frontend Check:
1. Open browser console
2. Type: `import.meta.env.VITE_GOOGLE_CLIENT_ID`
3. It should show your Client ID (not undefined or "YOUR_GOOGLE_CLIENT_ID")

### Backend Check:
Add a temporary log in `server/controllers/authController.js`:
```javascript
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
```

## Step 7: Common Issues and Solutions

### Issue: "The OAuth client was not found"
**Solution:** 
- Double-check the Client ID in Google Cloud Console
- Make sure you're using the Client ID (not Client Secret)
- Verify the Client ID matches exactly in both .env files

### Issue: "Redirect URI mismatch"
**Solution:**
- Add your exact URL to Authorized Redirect URIs in Google Console
- For localhost: `http://localhost:5173` (exact match, no trailing slash)

### Issue: Environment variable not loading
**Solution:**
- Make sure `.env` file is in the correct folder (`client/` or `server/`)
- Check for typos in variable names
- Restart the server after changes
- For Vite, variable names MUST start with `VITE_`

### Issue: OAuth consent screen not configured
**Solution:**
- Go to APIs & Services → OAuth consent screen
- Complete the setup (at minimum: App name, User support email)
- Add test users if in testing mode

## Step 8: Test with a Fresh Client ID

If nothing works, create a new OAuth client:

1. Go to Google Cloud Console → Credentials
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: **Web application**
4. Name: "Kreativity League Dev" (or any name)
5. Authorized JavaScript origins: `http://localhost:5173`
6. Authorized redirect URIs: `http://localhost:5173`
7. Click "Create"
8. Copy the new Client ID
9. Update both `.env` files with the new Client ID
10. Restart both servers

## Quick Checklist

- [ ] Client ID is set in `client/.env` as `VITE_GOOGLE_CLIENT_ID`
- [ ] Client ID is set in `server/.env` as `GOOGLE_CLIENT_ID`
- [ ] Both use the SAME Client ID value
- [ ] No quotes around the Client ID value
- [ ] Authorized JavaScript origins include `http://localhost:5173`
- [ ] Authorized redirect URIs include `http://localhost:5173`
- [ ] OAuth consent screen is configured
- [ ] Frontend dev server restarted after .env changes
- [ ] Backend server restarted after .env changes
- [ ] Client ID format is correct (ends with `.apps.googleusercontent.com`)

## Still Not Working?

1. **Check the exact error message** in browser console
2. **Verify the Client ID** by logging it (see Step 6)
3. **Try creating a new OAuth client** (see Step 8)
4. **Check Google Cloud Console** for any warnings or errors
5. **Make sure you're using the correct Google account** that has access to the project

## Need More Help?

- Check the main setup guide: `GOOGLE_OAUTH_SETUP.md`
- Google OAuth Documentation: https://developers.google.com/identity/gsi/web






