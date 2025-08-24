import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Sparkles,
  Send,
  Calendar,
  Image as ImageIcon,
  Hash,
  AtSign,
} from 'lucide-react-native';

export default function ComposeScreen() {
  const [postContent, setPostContent] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isGenerating, setIsGenerating] = useState(false);

  const models = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic' },
  ];

  const postIdeas = [
    'Industry insights and trends',
    'Company milestone celebration',
    'Thought leadership article',
    'Behind-the-scenes content',
    'Educational tips and tricks',
    'Network appreciation post',
  ];

  const handleGenerateContent = async (idea: string) => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setPostContent(
        `🚀 Excited to share some thoughts on ${idea.toLowerCase()}!\n\nIn today's rapidly evolving business landscape, it's crucial to stay ahead of the curve. Here are my top 3 insights:\n\n1. Innovation drives growth\n2. Customer experience is paramount\n3. Collaboration breeds success\n\nWhat are your thoughts? I'd love to hear your perspectives in the comments!\n\n#Leadership #Innovation #BusinessGrowth`
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handlePublish = () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please enter some content before publishing.');
      return;
    }
    Alert.alert('Success', 'Your post has been scheduled for publishing!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Compose Post</Text>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Send size={16} color="#FFFFFF" />
          <Text style={styles.publishText}>Publish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Model Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Model</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.modelSelector}>
              {models.map((model) => (
                <TouchableOpacity
                  key={model.id}
                  style={[
                    styles.modelCard,
                    selectedModel === model.id && styles.selectedModelCard,
                  ]}
                  onPress={() => setSelectedModel(model.id)}>
                  <Text
                    style={[
                      styles.modelName,
                      selectedModel === model.id && styles.selectedModelName,
                    ]}>
                    {model.name}
                  </Text>
                  <Text
                    style={[
                      styles.modelProvider,
                      selectedModel === model.id && styles.selectedModelProvider,
                    ]}>
                    {model.provider}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Content Ideas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generate Ideas</Text>
          <View style={styles.ideasGrid}>
            {postIdeas.map((idea, index) => (
              <TouchableOpacity
                key={index}
                style={styles.ideaCard}
                onPress={() => handleGenerateContent(idea)}
                disabled={isGenerating}>
                <Sparkles size={16} color="#8B5CF6" />
                <Text style={styles.ideaText}>{idea}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Post Composer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Post</Text>
          <View style={styles.composerContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write your LinkedIn post here or use AI to generate content..."
              multiline
              numberOfLines={10}
              value={postContent}
              onChangeText={setPostContent}
              textAlignVertical="top"
            />
            {isGenerating && (
              <View style={styles.generatingOverlay}>
                <Sparkles size={24} color="#8B5CF6" />
                <Text style={styles.generatingText}>Generating content...</Text>
              </View>
            )}
          </View>

          {/* Character Count */}
          <View style={styles.characterCount}>
            <Text style={styles.characterCountText}>
              {postContent.length}/3000 characters
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <ImageIcon size={20} color="#64748B" />
              <Text style={styles.actionButtonText}>Add Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Hash size={20} color="#64748B" />
              <Text style={styles.actionButtonText}>Hashtags</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <AtSign size={20} color="#64748B" />
              <Text style={styles.actionButtonText}>Mentions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scheduling Options */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.scheduleButton}>
            <Calendar size={20} color="#0077B5" />
            <Text style={styles.scheduleButtonText}>Schedule for Later</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  publishButton: {
    backgroundColor: '#0077B5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  publishText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  modelSelector: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  modelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    minWidth: 120,
  },
  selectedModelCard: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3F4F6',
  },
  modelName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  selectedModelName: {
    color: '#8B5CF6',
  },
  modelProvider: {
    fontSize: 12,
    color: '#64748B',
  },
  selectedModelProvider: {
    color: '#8B5CF6',
  },
  ideasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ideaCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ideaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  composerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textInput: {
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    color: '#1E293B',
    minHeight: 200,
  },
  generatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 8,
  },
  generatingText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  characterCountText: {
    fontSize: 12,
    color: '#64748B',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  scheduleButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0077B5',
    gap: 8,
  },
  scheduleButtonText: {
    color: '#0077B5',
    fontSize: 16,
    fontWeight: '600',
  },
});