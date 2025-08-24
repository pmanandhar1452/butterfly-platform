import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GoogleSignInButton } from './GoogleSignInButton';
import Constants from 'expo-constants';

export function GoogleAuthTest() {
  const handleSuccess = (result: any) => {
    console.log('✅ Google Auth Success:', result);
    Alert.alert(
      'Success!',
      `Welcome ${result.user.name}!\nEmail: ${result.user.email}`,
      [{ text: 'OK' }]
    );
  };

  const handleError = (error: string) => {
    console.error('❌ Google Auth Error:', error);
    Alert.alert('Authentication Error', error);
  };

  // Debug info
  const config = Constants.expoConfig?.extra;
  const scheme = Constants.expoConfig?.scheme;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Authentication Test</Text>
      
      <View style={styles.debugInfo}>
        <Text style={styles.debugTitle}>Debug Information:</Text>
        <Text style={styles.debugText}>Scheme: {scheme}</Text>
        <Text style={styles.debugText}>Redirect URI: {scheme}://</Text>
        <Text style={styles.debugText}>
          iOS Client ID: {config?.googleClientId?.ios ? '✅ Set' : '❌ Missing'}
        </Text>
        <Text style={styles.debugText}>
          Android Client ID: {config?.googleClientId?.android ? '✅ Set' : '❌ Missing'}
        </Text>
        <Text style={styles.debugText}>
          Web Client ID: {config?.googleClientId?.web ? '✅ Set' : '❌ Missing'}
        </Text>
      </View>

      <GoogleSignInButton
        onSuccess={handleSuccess}
        onError={handleError}
        text="Test Google Sign In"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  debugInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  debugText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
});
