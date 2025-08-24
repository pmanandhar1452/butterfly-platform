import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';


interface GoogleSignInWebProps {
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  text?: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleSignInWeb({ 
  onSuccess,
  onError,
  text = "Continue with Google" 
}: GoogleSignInWebProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const config = Constants.expoConfig?.extra;
  const clientId = process.env.GOOGLE_CLIENT_ID_WEB || config?.googleClientId?.web;

  // Debug logging
  console.log('🔍 GoogleSignInWeb Debug:');
  console.log('Config:', config);
  console.log('Client ID from process.env:', process.env.GOOGLE_CLIENT_ID_WEB);
  console.log('Client ID from config:', config?.googleClientId?.web);
  console.log('Final Client ID:', clientId);

  useEffect(() => {
    console.log('🔍 GoogleSignInWeb useEffect:');
    console.log('Window defined:', typeof window !== 'undefined');
    console.log('Google object available:', !!window.google);
    console.log('Client ID available:', !!clientId);
    
    if (typeof window === 'undefined' || !clientId) {
      console.log('❌ Missing requirements for Google Sign-In');
      return;
    }

    // Wait for Google script to load
    const waitForGoogle = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        console.log('✅ Google script loaded, initializing...');
        initializeGoogleSignIn();
      } else {
        console.log('⏳ Waiting for Google script to load...');
        setTimeout(waitForGoogle, 100);
      }
    };

    const initializeGoogleSignIn = () => {

    console.log('🚀 Initializing Google Identity Services with client ID:', clientId);
    
    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

          // Render the button
      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        });
      }
    };

    // Start waiting for Google script
    waitForGoogle();
  }, [clientId]);

  const handleCredentialResponse = (response: any) => {
    setIsLoading(true);
    
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const result = {
        accessToken: response.credential,
        user: {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
        },
      };

      console.log('Google sign-in successful:', result);
      onSuccess?.(result);
    } catch (error) {
      console.error('Error processing Google sign-in:', error);
      onError?.('Failed to process Google sign-in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSignIn = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      onError?.('Google Sign-In not available');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#64748B" />
        <Text style={styles.loadingText}>Signing in...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Google's official button */}
      <div ref={buttonRef} style={styles.googleButton} />
      
      {/* Fallback button */}
      <TouchableOpacity
        style={styles.fallbackButton}
        onPress={handleManualSignIn}>
        <View style={styles.googleButtonContent}>
          <View style={styles.googleIcon}>
            <Text style={styles.googleIconText}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  googleButton: {
    width: '100%',
    height: 48,
  },
  fallbackButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    opacity: 0,
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
});
