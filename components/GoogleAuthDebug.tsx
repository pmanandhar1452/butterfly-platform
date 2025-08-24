import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';


export function GoogleAuthDebug() {
  const config = Constants.expoConfig?.extra;
  const clientId = process.env.GOOGLE_CLIENT_ID_WEB || config?.googleClientId?.web;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Google Auth Debug Info</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Web Client ID</Text>
          <Text style={styles.value}>
            {clientId || '❌ Not configured'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environment Variables (process.env)</Text>
          <Text style={styles.value}>
            GOOGLE_CLIENT_ID_WEB: {process.env.GOOGLE_CLIENT_ID_WEB || '❌ Not set'}
          </Text>
          <Text style={styles.value}>
            GOOGLE_CLIENT_ID_IOS: {process.env.GOOGLE_CLIENT_ID_IOS || '❌ Not set'}
          </Text>
          <Text style={styles.value}>
            GOOGLE_CLIENT_ID_ANDROID: {process.env.GOOGLE_CLIENT_ID_ANDROID || '❌ Not set'}
          </Text>
          <Text style={styles.value}>
            GOOGLE_CLIENT_SECRET: {process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Not set'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Full Config</Text>
          <Text style={styles.code}>
            {JSON.stringify(config, null, 2)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Config</Text>
          <Text style={styles.code}>
            {JSON.stringify(Constants.expoConfig, null, 2)}
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
    fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier',
    marginBottom: 4,
  },
  code: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier',
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderRadius: 4,
  },
});
