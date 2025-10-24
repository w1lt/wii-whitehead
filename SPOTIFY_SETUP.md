# Spotify Integration Setup Guide

This guide will help you set up the Spotify "Last Played" feature for your portfolio.

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the details:
   - **App Name**: Your Portfolio Name
   - **App Description**: Personal portfolio website
   - **Redirect URI**: `http://localhost:5173` (Vite's default port)
   - **Note**: You can also add `http://localhost:3000` if you prefer
5. Accept the terms and click "Save"
6. You'll see your **Client ID** and **Client Secret** - save these!

**Important**: If you get an "Invalid redirect URI" error later, make sure the redirect URI in the authorization URL matches exactly what you added here. You can always add more redirect URIs by clicking "Edit Settings" in your app dashboard.

## Step 2: Get Your Refresh Token

To get your Spotify refresh token, you need to authorize your app:

1. Create the authorization URL (replace `YOUR_CLIENT_ID` with your actual Client ID):

**Option A: Using Vite's default port (5173)**

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:5173&scope=user-read-currently-playing%20user-read-recently-played
```

**Option B: Using port 3000**

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played
```

**Note**: The `redirect_uri` must match exactly what you added in your Spotify app settings in Step 1.

2. Visit this URL in your browser
3. Authorize the app
4. You'll be redirected to the localhost URL with a `code` parameter (you'll likely see an error page - that's normal!)
5. **Copy the `code` parameter from your browser's address bar** - it's the long string after `code=`

6. Exchange the code for a refresh token using this curl command (replace the placeholders):

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTHORIZATION_CODE" \
  -d "redirect_uri=http://localhost:5173" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

**Important**: The `redirect_uri` in this command MUST match exactly what you used in the authorization URL above. If you used `http://localhost:3000`, change it here too.

7. You'll get a JSON response with a `refresh_token` - save this!

## Step 3: Local Development Setup

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Fill in your credentials in `.env`:

```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
VITE_SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

3. Test locally:

```bash
npm run dev
```

## Step 4: GitHub Pages Deployment with GitHub Actions

To deploy securely without exposing your API keys, use GitHub Actions with GitHub Secrets.

### 4.1: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these three secrets:
   - `VITE_SPOTIFY_CLIENT_ID`
   - `VITE_SPOTIFY_CLIENT_SECRET`
   - `VITE_SPOTIFY_REFRESH_TOKEN`

### 4.2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` with the content provided in this repo.

### 4.3: Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select "Read and write permissions"
3. Click "Save"

### 4.4: Deploy

Push your code to GitHub:

```bash
git add .
git commit -m "Add Spotify integration"
git push origin main
```

GitHub Actions will automatically build and deploy your site with the API keys injected securely at build time!

## Important Security Notes

⚠️ **Never commit your `.env` file to GitHub!**

✅ The `.env` file is already in `.gitignore`

✅ GitHub Secrets are encrypted and never exposed in logs

✅ The API keys are only included in the built files during deployment

## Troubleshooting

### "Unable to load Spotify data" error

- Check that all three environment variables are set correctly
- Verify your refresh token hasn't expired (they usually last a long time)
- Check the browser console for detailed error messages
- Make sure your Spotify app has the correct scopes enabled

### Build fails on GitHub Actions

- Verify all three secrets are added in GitHub Settings
- Check the Actions log for specific error messages
- Ensure the secret names match exactly (including case)

## Alternative: Use a Backend Proxy (More Secure)

For maximum security, consider using a serverless backend:

- **Vercel Functions**
- **Netlify Functions**
- **AWS Lambda**
- **Cloudflare Workers**

This way, your API keys never get included in the client-side bundle. Let me know if you'd like help setting this up!
