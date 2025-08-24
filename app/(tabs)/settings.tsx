import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Key, Linkedin, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Bot, Zap } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoPostEnabled, setAutoPostEnabled] = useState(false);

  const apiKeys = [
    { id: 'openai', name: 'OpenAI', status: 'connected', provider: 'OpenAI' },
    { id: 'gemini', name: 'Gemini Pro', status: 'connected', provider: 'Google' },
    { id: 'claude', name: 'Claude 3', status: 'disconnected', provider: 'Anthropic' },
  ];

  const socialAccounts = [
    { id: 'linkedin', name: 'LinkedIn', status: 'connected', followers: '2.4K' },
  ];

  const handleDisconnectAPI = (apiName: string) => {
    Alert.alert(
      'Disconnect API',
      `Are you sure you want to disconnect ${apiName}? This will stop all automated posting using this model.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Disconnect', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
            <TouchableOpacity>
              <ChevronRight size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* API Keys Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bot size={20} color="#1E293B" />
            <Text style={styles.sectionTitle}>AI Models & API Keys</Text>
          </View>
          {apiKeys.map((api) => (
            <TouchableOpacity key={api.id} style={styles.listItem}>
              <View style={styles.itemLeft}>
                <View style={[styles.statusDot, {
                  backgroundColor: api.status === 'connected' ? '#10B981' : '#64748B'
                }]} />
                <View>
                  <Text style={styles.itemTitle}>{api.name}</Text>
                  <Text style={styles.itemSubtitle}>{api.provider}</Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <Text style={[styles.statusText, {
                  color: api.status === 'connected' ? '#10B981' : '#64748B'
                }]}>
                  {api.status}
                </Text>
                <ChevronRight size={16} color="#64748B" />
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Key size={16} color="#0077B5" />
            <Text style={styles.addButtonText}>Add New API Key</Text>
          </TouchableOpacity>
        </View>

        {/* Social Accounts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Linkedin size={20} color="#1E293B" />
            <Text style={styles.sectionTitle}>Connected Accounts</Text>
          </View>
          {socialAccounts.map((account) => (
            <TouchableOpacity key={account.id} style={styles.listItem}>
              <View style={styles.itemLeft}>
                <View style={[styles.statusDot, { backgroundColor: '#0077B5' }]} />
                <View>
                  <Text style={styles.itemTitle}>{account.name}</Text>
                  <Text style={styles.itemSubtitle}>{account.followers} followers</Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <Text style={[styles.statusText, { color: '#10B981' }]}>Connected</Text>
                <ChevronRight size={16} color="#64748B" />
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Linkedin size={16} color="#0077B5" />
            <Text style={styles.addButtonText}>Connect Another Account</Text>
          </TouchableOpacity>
        </View>

        {/* Automation Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={20} color="#1E293B" />
            <Text style={styles.sectionTitle}>Automation</Text>
          </View>
          <View style={styles.switchItem}>
            <View style={styles.switchLeft}>
              <Text style={styles.itemTitle}>Auto-posting</Text>
              <Text style={styles.itemSubtitle}>Automatically post scheduled content</Text>
            </View>
            <Switch
              value={autoPostEnabled}
              onValueChange={setAutoPostEnabled}
              trackColor={{ false: '#E2E8F0', true: '#0077B5' }}
              thumbColor={autoPostEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#1E293B" />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          <View style={styles.switchItem}>
            <View style={styles.switchLeft}>
              <Text style={styles.itemTitle}>Push Notifications</Text>
              <Text style={styles.itemSubtitle}>Get notified about post performance</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E2E8F0', true: '#0077B5' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Other Settings */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.itemLeft}>
              <Shield size={20} color="#64748B" />
              <Text style={styles.itemTitle}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.itemLeft}>
              <HelpCircle size={20} color="#64748B" />
              <Text style={styles.itemTitle}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0077B5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  addButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginTop: 8,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0077B5',
  },
  switchItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  switchLeft: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FEE2E2',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});