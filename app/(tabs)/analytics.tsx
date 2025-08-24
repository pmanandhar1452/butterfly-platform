import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, Eye, Heart, MessageSquare, Share, ChartBar as BarChart3, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const periods = [
    { id: '24h', label: '24h' },
    { id: '7d', label: '7 days' },
    { id: '30d', label: '30 days' },
    { id: '90d', label: '3 months' },
  ];

  const metrics = [
    {
      title: 'Total Impressions',
      value: '12.4K',
      change: '+18.2%',
      trending: 'up',
      icon: Eye,
      color: '#0077B5',
    },
    {
      title: 'Engagement Rate',
      value: '8.7%',
      change: '+2.1%',
      trending: 'up',
      icon: Heart,
      color: '#EF4444',
    },
    {
      title: 'Comments',
      value: '156',
      change: '-5.3%',
      trending: 'down',
      icon: MessageSquare,
      color: '#10B981',
    },
    {
      title: 'Shares',
      value: '89',
      change: '+12.8%',
      trending: 'up',
      icon: Share,
      color: '#8B5CF6',
    },
  ];

  const topPosts = [
    {
      id: 1,
      content: 'Exciting announcement about our AI automation platform! 🚀',
      impressions: 5420,
      engagements: 324,
      date: '2 days ago',
      performance: 'excellent',
    },
    {
      id: 2,
      content: 'Weekly industry insights and emerging trends in tech...',
      impressions: 3210,
      engagements: 187,
      date: '5 days ago',
      performance: 'good',
    },
    {
      id: 3,
      content: 'Behind the scenes of our development process',
      impressions: 2150,
      engagements: 98,
      date: '1 week ago',
      performance: 'average',
    },
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return '#10B981';
      case 'good':
        return '#F59E0B';
      case 'average':
        return '#64748B';
      default:
        return '#64748B';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
        <TouchableOpacity style={styles.exportButton}>
          <BarChart3 size={16} color="#0077B5" />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Period Selection */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.periodSelector}
          contentContainerStyle={styles.periodContent}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod(period.id)}>
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period.id && styles.selectedPeriodText,
                ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Metrics Overview */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <View key={index} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <View style={[styles.metricIcon, { backgroundColor: `${metric.color}15` }]}>
                    <metric.icon size={20} color={metric.color} />
                  </View>
                  <View style={styles.trendContainer}>
                    {metric.trending === 'up' ? (
                      <TrendingUp size={14} color="#10B981" />
                    ) : (
                      <TrendingDown size={14} color="#EF4444" />
                    )}
                    <Text
                      style={[
                        styles.changeText,
                        { color: metric.trending === 'up' ? '#10B981' : '#EF4444' },
                      ]}>
                      {metric.change}
                    </Text>
                  </View>
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Chart Placeholder */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Engagement Trend</Text>
          <View style={styles.chartPlaceholder}>
            <BarChart3 size={48} color="#E2E8F0" />
            <Text style={styles.chartPlaceholderText}>
              Interactive chart coming soon
            </Text>
          </View>
        </View>

        {/* Top Performing Posts */}
        <View style={styles.topPostsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Performing Posts</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {topPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View
                  style={[
                    styles.performanceDot,
                    { backgroundColor: getPerformanceColor(post.performance) },
                  ]}
                />
                <Text style={styles.postDate}>{post.date}</Text>
                <Text style={[styles.performanceLabel, { color: getPerformanceColor(post.performance) }]}>
                  {post.performance}
                </Text>
              </View>
              <Text style={styles.postContent} numberOfLines={2}>
                {post.content}
              </Text>
              <View style={styles.postMetrics}>
                <View style={styles.metric}>
                  <Eye size={14} color="#64748B" />
                  <Text style={styles.metricText}>{post.impressions.toLocaleString()}</Text>
                </View>
                <View style={styles.metric}>
                  <Heart size={14} color="#64748B" />
                  <Text style={styles.metricText}>{post.engagements}</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.engagementRate}>
                    {((post.engagements / post.impressions) * 100).toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Best Posting Times */}
        <View style={styles.timingContainer}>
          <Text style={styles.sectionTitle}>Optimal Posting Times</Text>
          <View style={styles.timingCard}>
            <View style={styles.timingRow}>
              <Calendar size={16} color="#0077B5" />
              <Text style={styles.timingText}>Best day: Tuesday</Text>
            </View>
            <View style={styles.timingRow}>
              <Clock size={16} color="#8B5CF6" />
              <Text style={styles.timingText}>Best time: 9:00 - 11:00 AM</Text>
            </View>
            <View style={styles.timingRow}>
              <TrendingUp size={16} color="#10B981" />
              <Text style={styles.timingText}>Peak engagement: 2:00 PM</Text>
            </View>
          </View>
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
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0077B5',
  },
  exportText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0077B5',
  },
  periodSelector: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  periodContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  selectedPeriodButton: {
    backgroundColor: '#0077B5',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  selectedPeriodText: {
    color: '#FFFFFF',
  },
  metricsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: (width - 52) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  metricIcon: {
    padding: 8,
    borderRadius: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  chartContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  chartPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 12,
    fontWeight: '500',
  },
  topPostsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#0077B5',
    fontSize: 14,
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  performanceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#64748B',
    flex: 1,
  },
  performanceLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  postContent: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
    marginBottom: 12,
  },
  postMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  engagementRate: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  timingContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  timingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timingText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
});