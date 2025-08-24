import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function IndexScreen() {
  useEffect(() => {
    // Check if user is authenticated
    const checkAuthStatus = async () => {
      // For now, we'll simulate checking auth status
      // In a real app, you'd check for stored tokens or session
      const isAuthenticated = false; // This would come from your auth state
      
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0077B5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});