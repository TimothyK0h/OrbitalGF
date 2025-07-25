import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Quest = {
  id: string;
  type: 'daily' | 'weekly';
  title: string;
  points: number;
  target: number;
  progress: number;
  completed: boolean;
  carbonEmission: number;
};

function getHoursToNextSGTMidnight(): string {
  const now = new Date();
  const utcNow = now.getTime();
  const nextMidnightSGT = new Date();

  nextMidnightSGT.setUTCHours(16, 0, 0, 0); 

  if (utcNow >= nextMidnightSGT.getTime()) {
    nextMidnightSGT.setUTCDate(nextMidnightSGT.getUTCDate() + 1);
  }

  const diffMs = nextMidnightSGT.getTime() - utcNow;
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function getDaysToNextMondaySGT(): string {
  const now = new Date();

  const day = now.getUTCDay();
  const hour = now.getUTCHours();

  const daysUntilSunday = (7 - day) % 7 || 7;
  const hasPassedTodayReset = day === 0 && hour >= 16;

  let daysToGo = daysUntilSunday - (hasPassedTodayReset ? 0 : 1);
  if (daysToGo < 0) daysToGo += 7;

  const target = new Date(now);
  target.setUTCDate(now.getUTCDate() + daysToGo + 1);
  target.setUTCHours(16, 0, 0, 0);

  const diffMs = target.getTime() - now.getTime();
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const days = Math.floor(hours / 24);
  const leftoverHours = hours % 24;

  return days > 0 ? `${days}d ${leftoverHours}h` : `${leftoverHours}h`;
}

export default function EcoQuest() {
  const router = useRouter();
  const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);
  const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuests = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const snapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('quests')
        .get();

      const dailyList: Quest[] = [];
      const weeklyList: Quest[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        if (!data.title || !data.type || !data.points || !data.target) return;

        const quest: Quest = {
          id: doc.id,
          type: data.type,
          title: data.title.replace(/"/g, ''),
          points: data.points,
          target: data.target,
          progress: data.progress ?? 0,
          completed: data.completed ?? false,
          carbonEmission: data.carbonEmission ?? 0,
        };

        if (quest.type === 'daily') dailyList.push(quest);
        else if (quest.type === 'weekly') weeklyList.push(quest);
      });

      setDailyQuests(dailyList);
      setWeeklyQuests(weeklyList);
    } catch (error) {
      Alert.alert('Error loading quests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleReset = async () => {
    try {
      await fetch('https://us-central1-goonforestor-firebase.cloudfunctions.net/testResetQuests?type=daily');
      await fetch('https://us-central1-goonforestor-firebase.cloudfunctions.net/testResetQuests?type=weekly');
      Alert.alert('Quests reset successfully!');
      fetchQuests(); // reload data
    } catch {
      Alert.alert('Failed to reset quests');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1bbc65" />
        <Text style={{ marginTop: 10 }}>Loading quests...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bonusText}>Login Bonus</Text>
        <Text style={styles.headerTitle}>Clean and Green</Text>
        <Text style={styles.headerSubtitle}>January</Text>

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

      <QuestSection title="Weekly Quests" quests={weeklyQuests} timeLeft={getDaysToNextMondaySGT()} />
      <QuestSection title="Daily Quests" quests={dailyQuests} timeLeft={getHoursToNextSGTMidnight()} />


      <TouchableOpacity onPress={handleReset} style={{ alignSelf: 'center', marginTop: 20 }}>
        <Text style={{ color: '#1bbc65', fontWeight: '600' }}>↻ Reset</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function QuestSection({
  title,
  quests,
  timeLeft,
}: {
  title: string;
  quests: Quest[];
  timeLeft: string;
}) {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.clockRow}>
          <Image source={require('../../../assets/images/Clock.png')} style={styles.clockIcon} />
          <Text style={styles.sectionTime}>{timeLeft}</Text>
        </View>
      </View>

      {quests.map(quest => (
        <View key={quest.id} style={styles.questBox}>
          <Text style={styles.questText}>{quest.title}</Text>
          <Text style={styles.pointsText}>{quest.points} points</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min((quest.progress ?? 0) / (quest.target || 1) * 100, 100)}%`,
                },
              ]}
            />
            <Text style={styles.progressLabel}>{quest.progress}/{quest.target}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/(auth)/questSubmission', params: { questId: quest.id } })}
          >
            <Text style={styles.arrow}>➜</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 100, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#1bbc65', padding: 20, paddingTop: 50 },
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
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#fff', fontSize: 18, marginBottom: 16 },
  bonusContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 12, minHeight: 80 },
  bonusTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  rewardText: { color: '#111', fontWeight: '500', fontSize: 13 },
  dateText: { fontWeight: '700', color: '#1bbc65', fontSize: 13 },
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
  lockIcon: { width: 16, height: 16, resizeMode: 'contain' },
  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  clockRow: { flexDirection: 'row', alignItems: 'center' },
  clockIcon: { width: 14, height: 14, marginRight: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionTime: { color: '#f97316', fontWeight: '600', fontSize: 13 },
  questBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  questText: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
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
    position: 'relative',
    overflow: 'hidden',
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
