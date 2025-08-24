import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Sparkles, ArrowRight, Users, Zap, Target } from 'lucide-react-native';

export default function IndexScreen() {
  const handleGetStarted = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={['#0077B5', '#005885']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🦋</Text>
            </View>
            <Text style={styles.brandName}>Butterfly Platform</Text>
            <Text style={styles.tagline}>AI-Powered LinkedIn Growth</Text>
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to Butterfly</Text>
          <Text style={styles.subtitleText}>
            Transform your LinkedIn presence with AI-powered automation
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Zap size={24} color="#0077B5" style={styles.featureIcon} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Smart Automation</Text>
                <Text style={styles.featureDescription}>
                  Automate your LinkedIn outreach with intelligent targeting
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Sparkles size={24} color="#0077B5" style={styles.featureIcon} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI Content Creation</Text>
                <Text style={styles.featureDescription}>
                  Generate engaging posts and messages with AI assistance
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Users size={24} color="#0077B5" style={styles.featureIcon} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Build Connections</Text>
                <Text style={styles.featureDescription}>
                  Grow your network with meaningful, targeted connections
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Target size={24} color="#0077B5" style={styles.featureIcon} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Analytics & Insights</Text>
                <Text style={styles.featureDescription}>
                  Track your growth and optimize your LinkedIn strategy
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText}>
            Join thousands of professionals growing their LinkedIn presence
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 26,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#0077B5',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#0077B5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});