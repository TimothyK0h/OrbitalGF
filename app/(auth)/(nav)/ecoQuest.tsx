import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EcoQuest() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.bonusText}>Login Bonus</Text>
        <Text style={styles.headerTitle}>Clean and Green</Text>
        <Text style={styles.headerSubtitle}>January</Text>

        {/* Login Bonus Container */}
        <View style={styles.bonusContainer}>
          <View style={styles.bonusTopRow}>
            <Text style={styles.rewardText}>Come back everyday to claim a new reward</Text>
            <Text style={styles.dateText}>7 / 31</Text>
          </View>

          <View style={styles.bonusProgressBar}>
            <View style={styles.progressFill} />
            <View style={styles.lockRow}>
              {[...Array(3)].map((_, i) => (
                <View key={i} style={styles.lockCircle}>
                  <Image source={require('../../../assets/images/Lock.png')} style={styles.lockIcon} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Weekly Quests */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly Quests</Text>
          <View style={styles.clockRow}>
            <Image source={require('../../../assets/images/Clock.png')} style={styles.clockIcon} />
            <Text style={styles.sectionTime}>4 Days</Text>
          </View>
        </View>

        <View style={styles.questBox}>
          <Text style={styles.questText}>Commute through cycling on 3 different days</Text>
          <Text style={styles.pointsText}>200 points</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%' }]} />
            <Text style={styles.progressLabel}>0/3</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(auth)/questSubmission')}>
            <Text style={styles.arrow}>➜</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Quests */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>
          <View style={styles.clockRow}>
            <Image source={require('../../../assets/images/Clock.png')} style={styles.clockIcon} />
            <Text style={styles.sectionTime}>19 Hours</Text>
          </View>
        </View>

        <View style={styles.questBox}>
          <Text style={styles.questText}>Recycle 3 items</Text>
          <Text style={styles.pointsText}>100 points</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%' }]} />
            <Text style={styles.progressLabel}>1/3</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(auth)/questSubmission')}>
            <Text style={styles.arrow}>➜</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.questBox}>
          <Text style={styles.questText}>Buy an eco-friendly product</Text>
          <Text style={styles.pointsText}>50 points</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%' }]} />
            <Text style={styles.progressLabel}>0/1</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(auth)/questSubmission')}>
            <Text style={styles.arrow}>➜</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1bbc65',
    padding: 20,
    paddingTop: 50,
  },
  bonusText: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  bonusContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
  },
  bonusTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rewardText: {
    color: '#111',
    fontWeight: '500',
    fontSize: 13,
  },
  dateText: {
    fontWeight: '700',
    color: '#1bbc65',
    fontSize: 13,
  },
  bonusProgressBar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  lockRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    marginTop: 4,
  },
  lockCircle: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 4,
    marginLeft: 70,
  },
  lockIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTime: {
    color: '#f97316',
    fontWeight: '600',
    fontSize: 13,
  },
  questBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  questText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  pointsText: {
    color: '#facc15',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 6,
    alignSelf: 'flex-end',
  },
  progressBar: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    marginBottom: 6,
  },
  progressFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#4ade80',
    left: 0,
  },
  progressLabel: {
    alignSelf: 'center',
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  arrow: {
    color: '#1bbc65',
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
});