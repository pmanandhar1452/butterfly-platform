import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default function DebugScreen() {
  useEffect(() => {
    // Log all the debug information to console
    console.log('🔍 DEBUG SCREEN LOADED');
    console.log('Platform:', 'web');
    console.log('Constants.expoConfig:', Constants.expoConfig);
    console.log('Constants.expoConfig?.extra:', Constants.expoConfig?.extra);
    console.log('Environment variables:');
    console.log('- GOOGLE_CLIENT_ID_WEB:', process.env.GOOGLE_CLIENT_ID_WEB);
    console.log('- GOOGLE_CLIENT_ID_IOS:', process.env.GOOGLE_CLIENT_ID_IOS);
    console.log('- GOOGLE_CLIENT_ID_ANDROID:', process.env.GOOGLE_CLIENT_ID_ANDROID);
    console.log('- GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');
    
    // Check if Google script is loaded
    if (typeof window !== 'undefined') {
      console.log('Google object available:', !!window.google);
      console.log('Google accounts available:', !!window.google?.accounts);
      console.log('Google accounts id available:', !!window.google?.accounts?.id);
    }
  }, []);

  const config = Constants.expoConfig?.extra;
  const clientId = process.env.GOOGLE_CLIENT_ID_WEB || config?.googleClientId?.web;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Google OAuth Debug</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client ID Being Used</Text>
          <Text style={styles.value}>
            {clientId || '❌ No client ID found'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environment Variables</Text>
          <Text style={styles.value}>
            GOOGLE_CLIENT_ID_WEB: {process.env.GOOGLE_CLIENT_ID_WEB || '❌ Not set'}
          </Text>
          <Text style={styles.value}>
            GOOGLE_CLIENT_SECRET: {process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Not set'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Config</Text>
          <Text style={styles.value}>
            Config from app.json: {config?.googleClientId?.web || '❌ Not set'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redirect URI</Text>
          <Text style={styles.value}>
            Current URL: {typeof window !== 'undefined' ? window.location.origin : 'Unknown'}
          </Text>
          <Text style={styles.value}>
            Expected: http://localhost:8081
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Google Script Status</Text>
          <Text style={styles.value}>
            Google object: {typeof window !== 'undefined' && window.google ? '✅ Loaded' : '❌ Not loaded'}
          </Text>
          <Text style={styles.value}>
            Google accounts: {typeof window !== 'undefined' && window.google?.accounts ? '✅ Available' : '❌ Not available'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Troubleshooting Steps</Text>
          <Text style={styles.instruction}>
            1. Verify the client ID above matches your Google Cloud Console
          </Text>
          <Text style={styles.instruction}>
            2. Add http://localhost:8081 to authorized redirect URIs
          </Text>
          <Text style={styles.instruction}>
            3. Enable Google Identity Services API
          </Text>
          <Text style={styles.instruction}>
            4. Check browser console for more details
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'monospace',
    marginBottom: 4,
    wordBreak: 'break-all',
  },
  instruction: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
});
