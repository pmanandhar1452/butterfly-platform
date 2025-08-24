# Google Authentication Setup

This guide will help you set up Google authentication for your Butterfly Platform app.

## 1. Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" and create OAuth 2.0 Client IDs for:
   - iOS
   - Android  
   - Web

## 2. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID_IOS=your_ios_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_ID_ANDROID=your_android_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_ID_WEB=your_web_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

## 3. Platform-Specific Configuration

### iOS
- Add your bundle identifier to the iOS OAuth client in Google Cloud Console
- Bundle ID: `com.yaaai.butterflyplatform`

### Android
- Add your package name to the Android OAuth client in Google Cloud Console
- Package name: `com.yaaai.butterflyplatform`

### Web
- Add your redirect URI to the Web OAuth client in Google Cloud Console
- For development: `myapp://` (uses the app scheme)
- For production: `https://your-domain.com`

## 4. Usage

The Google authentication is now configured and ready to use. The `GoogleSignInButton` component will automatically handle the authentication flow:

```tsx
import { GoogleSignInButton } from '../components/GoogleSignInButton';

function LoginScreen() {
  const handleGoogleSuccess = (result) => {
    console.log('Google sign-in successful:', result);
    // Handle successful authentication
  };

  const handleGoogleError = (error) => {
    console.error('Google sign-in failed:', error);
    // Handle authentication error
  };

  return (
    <GoogleSignInButton
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}
```

## 5. Troubleshooting

- Make sure all environment variables are properly set
- Verify that your OAuth client IDs are correct for each platform
- Check that your redirect URIs match exactly: `myapp://` (uses the app scheme)
- Ensure you have the required packages installed: `expo-auth-session` and `expo-crypto`
- If the web browser keeps loading, check the console logs for debugging information
- Make sure your Google Cloud Console OAuth client has the correct redirect URI: `myapp://`

## 6. Testing

Use the `GoogleAuthTest` component to test your authentication setup:

```tsx
import { GoogleAuthTest } from '../components/GoogleAuthTest';

// In your screen or component
<GoogleAuthTest />
```

This component will show debug information and help identify configuration issues.
