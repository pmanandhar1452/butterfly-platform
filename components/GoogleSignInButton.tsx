import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

interface GoogleSignInButtonProps {
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  text?: string;
}

export function GoogleSignInButton({ 
  onSuccess,
  onError,
  text = "Continue with Google" 
}: GoogleSignInButtonProps) {
  const { signInWithGoogle, isLoading, error } = useGoogleAuth();

  const handlePress = async () => {
    try {
      const result = await signInWithGoogle();
      onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      onError?.(errorMessage);
      Alert.alert('Authentication Error', errorMessage);
    }
  };
  return (
    <TouchableOpacity
      style={[styles.googleButton, isLoading && styles.disabledButton]}
      onPress={handlePress}
      disabled={isLoading}>
      <View style={styles.googleButtonContent}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#64748B" />
        ) : (
          <View style={styles.googleIcon}>
            <Text style={styles.googleIconText}>G</Text>
          </View>
        )}
        <Text style={styles.googleButtonText}>
          {isLoading ? 'Signing in...' : text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.6,
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