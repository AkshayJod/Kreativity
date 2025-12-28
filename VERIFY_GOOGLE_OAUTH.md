# Quick Verification Guide for Google OAuth

## ✅ What You Need

For this implementation, you only need the **CLIENT_ID** (not CLIENT_SECRET).

The CLIENT_SECRET is not used because:
- Frontend uses `@react-oauth/google` which handles OAuth client-side
- Backend only verifies the JWT token, which only requires CLIENT_ID
- CLIENT_SECRET is only needed for server-side OAuth flows (which we're not using)

## 📝 Required Environment Variables

### Frontend (`client/.env`)
```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

**Important:** 
- Variable name MUST be `VITE_GOOGLE_CLIENT_ID` (with `VITE_` prefix)
- This is required for Vite to expose it to the frontend

### Backend (`server/.env`)
```env
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

**Important:**
- Variable name is `GOOGLE_CLIENT_ID` (no `VITE_` prefix)
- Use the SAME Client ID value as frontend

### Optional (Not Required)
```env
GOOGLE_CLIENT_SECRET=your_client_secret_here
```
- You can add this, but it won't be used
- It won't cause any issues if it's there

## ✅ Verification Checklist

1. **Check your `.env` files exist:**
   - [ ] `client/.env` exists
   - [ ] `server/.env` exists

2. **Check variable names are correct:**
   - [ ] Frontend: `VITE_GOOGLE_CLIENT_ID` (with VITE_ prefix)
   - [ ] Backend: `GOOGLE_CLIENT_ID` (no VITE_ prefix)

3. **Check values match:**
   - [ ] Both files use the SAME Client ID
   - [ ] No quotes around the values
   - [ ] No extra spaces

4. **Check Google Cloud Console:**
   - [ ] Authorized JavaScript origins includes `http://localhost:5173`
   - [ ] Authorized redirect URIs includes `http://localhost:5173`
   - [ ] OAuth consent screen is configured

5. **Restart servers:**
   - [ ] Frontend server restarted after adding `.env`
   - [ ] Backend server restarted after adding `.env`

## 🧪 Quick Test

1. **Check if variables are loaded:**

   **Frontend (in browser console):**
   ```javascript
   console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
   ```
   Should show your Client ID (not `undefined`)

   **Backend (add temporarily to server.js):**
   ```javascript
   console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID)
   ```
   Should show your Client ID (not `undefined`)

2. **Try Google Login:**
   - Go to `http://localhost:5173/login`
   - Click "Sign in with Google"
   - Should open Google OAuth popup (not show "invalid_client" error)

## ❌ Common Issues

### Issue: Still getting "invalid_client" error

**Check:**
1. Variable names are exactly correct (case-sensitive)
2. Values match exactly (copy-paste from Google Console)
3. No quotes or spaces
4. Servers were restarted after changes
5. Google Console has correct origins/redirects

### Issue: Variable shows as `undefined`

**Fix:**
- Frontend: Make sure variable name starts with `VITE_`
- Backend: Make sure `.env` file is in `server/` folder
- Restart the server after adding/changing `.env`

### Issue: "Google OAuth not configured on server"

**Fix:**
- Check `server/.env` has `GOOGLE_CLIENT_ID=...`
- Restart backend server
- Check for typos in variable name

## 📋 Example `.env` Files

### `client/.env`
```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```

### `server/.env`
```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
MONGODB_URI=mongodb://localhost:27017/kreativity
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Note:** CLIENT_SECRET is optional and won't be used, but it's fine to keep it there.






