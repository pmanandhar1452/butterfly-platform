import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GoogleAuthDebug } from '../components/GoogleAuthDebug';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🦋 Butterfly Platform</Text>
      <Text style={styles.subtitle}>Test Page - App is working!</Text>
      <Text style={styles.description}>
        If you can see this page, the basic routing and rendering is working correctly.
      </Text>
      
      <GoogleAuthDebug />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0077B5',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});
