# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the Kreativity League platform.

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to **APIs & Services** > **Library**
   - Search for "Google+ API" or "Google Identity Services"
   - Click **Enable**

4. Create OAuth 2.0 Credentials:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth client ID**
   - If prompted, configure the OAuth consent screen first:
     - Choose **External** (unless you have a Google Workspace)
     - Fill in the required information (App name, User support email, Developer contact)
     - Add scopes: `email`, `profile`, `openid`
     - Add test users if in testing mode
   - For Application type, select **Web application**
   - Add Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `http://localhost:3000` (if using different port)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Add Authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Click **Create**
   - Copy the **Client ID** (you'll need this)

## Step 2: Configure Environment Variables

### Server Configuration

Create or update `server/.env`:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important:** The server uses the same Client ID to verify the token sent from the frontend.

### Client Configuration

Create or update `client/.env`:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Note:** Use the same Client ID for both server and client.

## Step 3: Install Dependencies

The required dependencies are already installed:
- **Server:** `google-auth-library` (already in package.json)
- **Client:** `@react-oauth/google` (already in package.json)

## Step 4: How It Works

1. **User clicks "Sign in with Google"** on the Login or Register page
2. **Google OAuth popup** appears for user authentication
3. **Google returns a credential (JWT token)** to the frontend
4. **Frontend sends the credential** to `/api/auth/google` endpoint
5. **Backend verifies the token** using Google's OAuth2Client
6. **Backend creates or logs in the user** and returns a JWT token
7. **User is authenticated** and redirected to the dashboard

## Step 5: Testing

1. Start your development servers:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

2. Navigate to `http://localhost:5173/login`
3. Click "Sign in with Google"
4. Select your Google account
5. You should be logged in and redirected to the dashboard

## Troubleshooting

### "Google OAuth not configured on server"
- Make sure `GOOGLE_CLIENT_ID` is set in `server/.env`

### "Invalid Google token"
- Ensure the Client ID in both `.env` files matches
- Check that the token hasn't expired (tokens expire quickly)
- Verify the OAuth consent screen is properly configured

### "Email not verified by Google"
- The user's Google account email must be verified
- This is a Google account requirement, not an application issue

### CORS Errors
- Make sure your Authorized JavaScript origins include `http://localhost:5173`
- Check that your backend CORS settings allow requests from the frontend

### Redirect URI Mismatch
- Ensure the redirect URI in Google Console matches your application URL
- For local development, use `http://localhost:5173`

## Security Notes

1. **Never commit `.env` files** to version control
2. **Use different Client IDs** for development and production
3. **Keep your Client ID secret** - while it's visible in the frontend, don't expose it unnecessarily
4. **Enable HTTPS** in production for secure token transmission

## Additional Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)






