import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react-native';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ]);
    }, 1500);
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      // Google sign-up will be handled by the GoogleSignInButton component
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/(tabs)');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to sign up with Google');
    }
  };

  const handleGoogleSuccess = (result: any) => {
    console.log('Google sign-up successful:', result);
    router.replace('/(tabs)');
  };

  const handleGoogleError = (error: string) => {
    console.error('Google sign-up failed:', error);
    Alert.alert('Authentication Error', error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>🦋</Text>
              </View>
              <Text style={styles.brandName}>Join Butterfly</Text>
              <Text style={styles.tagline}>Start automating your LinkedIn presence</Text>
            </View>
          </LinearGradient>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subtitleText}>Join Butterfly and grow your LinkedIn presence</Text>

            {/* App Description */}
            <View style={styles.descriptionContainer}>
              <Sparkles size={20} color="#8B5CF6" style={styles.descriptionIcon} />
              <Text style={styles.descriptionText}>
                Automate your LinkedIn outreach, create engaging content, and build meaningful connections with AI assistance.
              </Text>
            </View>

            {/* Google Sign Up */}
            <GoogleSignInButton 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="Sign up with Google"
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign up with email</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <User size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Mail size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Lock size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#64748B" />
                ) : (
                  <Eye size={20} color="#64748B" />
                )}
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Lock size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#64748B" />
                ) : (
                  <Eye size={20} color="#64748B" />
                )}
              </TouchableOpacity>
            </View>

            {/* Terms and Privacy */}
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.disabledButton]}
              onPress={handleEmailRegister}
              disabled={isLoading}>
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardView: {
    flex: 1,
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  descriptionContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  descriptionIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#64748B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  termsText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  linkText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#64748B',
  },
  signInLink: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
});