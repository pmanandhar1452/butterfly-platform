import { useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Complete the auth session
WebBrowser.maybeCompleteAuthSession();

interface GoogleAuthConfig {
  googleClientId: {
    ios: string;
    android: string;
    web: string;
  };
  googleClientSecret: string;
}

// Use the app scheme for redirect URI
const getRedirectUri = () => {
  const scheme = Constants.expoConfig?.scheme || 'myapp';
  return `${scheme}://`;
};

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = Constants.expoConfig?.extra as GoogleAuthConfig;
  
  const getClientId = () => {
    switch (Platform.OS) {
      case 'ios':
        return config?.googleClientId?.ios;
      case 'android':
        return config?.googleClientId?.android;
      case 'web':
        return config?.googleClientId?.web;
      default:
        return config?.googleClientId?.web;
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const clientId = getClientId();
      const redirectUri = getRedirectUri();

      if (!clientId) {
        throw new Error('Google Client ID not configured for this platform');
      }

      console.log('Using client ID:', clientId);
      console.log('Using redirect URI:', redirectUri);

      // Create the auth request
      const request = new AuthSession.AuthRequest({
        clientId,
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        extraParams: {
          access_type: 'offline',
        },
      });

      // Get the authorization URL
      const authUrl = await request.makeAuthUrlAsync();
      console.log('Auth URL:', authUrl);

      // Start the auth session
      const result = await AuthSession.startAsync({
        authUrl,
        returnUrl: redirectUri,
      });

      if (result.type === 'success') {
        console.log('Auth result:', result);
        
        // Exchange the authorization code for tokens
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId,
            code: result.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier,
            },
          },
          {
            tokenEndpoint: 'https://oauth2.googleapis.com/token',
          }
        );

        // Get user info
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResult.accessToken}`
        );
        const userInfo = await userInfoResponse.json();

        return {
          accessToken: tokenResult.accessToken,
          refreshToken: tokenResult.refreshToken,
          user: userInfo,
        };
      } else if (result.type === 'cancel') {
        throw new Error('Authentication was cancelled');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithGoogle,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
