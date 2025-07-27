import auth from '@react-native-firebase/auth';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
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
  const [loginBonusData, setLoginBonusData] = useState<{ progress: number; max: number; timestamp: Timestamp | null } | null>(null);
  const [bonusMonth, setBonusMonth] = useState('');

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
        console.log(' Quest doc ID:', doc.id);
        console.log(' Quest data:', doc.data());

        const data = doc.data();
        if (!data.title || !data.type || data.points === undefined || data.target === undefined) return;

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
      console.error('FetchQuests error:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchQuests();
    checkLoginBonus();
  }, []);

  const checkLoginBonus = async () => {
    const user = auth().currentUser;
    if (!user) return;

    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'long' });

    const defaultBonusDoc = await firestore()
      .collection('defaultLoginBonus')
      .doc(currentMonth)
      .get();

    if (!defaultBonusDoc.exists) {
      console.warn(`Missing defaultLoginBonus/${currentMonth}`);
      return;
    }

    const { max } = defaultBonusDoc.data() || {};
    const userLoginBonusRef = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('loginBonus');

    const allBonusDocs = await userLoginBonusRef.get();

  // Check if user already has a loginBonus doc for the current month
    let hasCurrentMonth = false;

    for (const doc of allBonusDocs.docs) {
      if (doc.id === currentMonth) {
        hasCurrentMonth = true;
      } else {
        // Delete outdated month
        await userLoginBonusRef.doc(doc.id).delete();
      }
    }

    // If user doesn't have the current month doc, create it
    if (!hasCurrentMonth) {
      await userLoginBonusRef.doc(currentMonth).set({
        progress: 0,
        timestamp: null,
      });
    }

    // Fetch updated doc
    const currentDoc = await userLoginBonusRef.doc(currentMonth).get();
    const data = currentDoc.data();
    const progress = data?.progress ?? 0;
    const timestamp = data?.timestamp ?? null;

    setLoginBonusData({ progress, max, timestamp });
    setBonusMonth(currentMonth);
  };

  const claimLoginBonus = async () => {
    const user = auth().currentUser;
    if (!user || !loginBonusData) return;

    const now = new Date();
    const lastClaim = loginBonusData.timestamp?.toDate();

    const claimedToday =
      lastClaim &&
      now.toDateString() === lastClaim.toDateString();

    if (claimedToday) {
      Alert.alert('You have already claimed today’s bonus.');
      return;
    }

    const newProgress = Math.min(loginBonusData.progress + 1, loginBonusData.max);

    const userRef = firestore().collection('users').doc(user.uid);
    const userBonusRef = userRef
      .collection('loginBonus')
      .doc(bonusMonth);

    await firestore().runTransaction(async transaction => {
      const userDoc = await transaction.get(userRef);
      const currentPoints = userDoc.data()?.ecoPoints || 0;

      transaction.update(userRef, {
        ecoPoints: currentPoints + 100,
      });

      transaction.update(userBonusRef, {
        progress: newProgress,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    });

    setLoginBonusData(prev => prev ? {
      ...prev,
      progress: newProgress,
      timestamp: Timestamp.now()
    } : null);

    Alert.alert('Login bonus claimed!');
  };

  const handleReset = async () => {
    try {
      await fetch('https://us-central1-goonforestor-firebase.cloudfunctions.net/testResetQuests?type=daily');
      await fetch('https://us-central1-goonforestor-firebase.cloudfunctions.net/testResetQuests?type=weekly');
      Alert.alert('Quests reset successfully!');
      fetchQuests();
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
      <Text style={styles.mainTitle}>Eco-Quests</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View>
        <Text style={styles.headerTitle}>Clean and Green</Text>
        <Text style={styles.headerSubtitle}>{bonusMonth}</Text>
        </View>
      <Image
        source={require('../../../assets/images/eco-quest.png')}
        style={{ width: 20, height: 20, marginLeft: 6 }}
        />
        </View>

        <View style={styles.bonusContainer}>
          <View style={styles.bonusTopRow}>
            <Text style={styles.rewardText}>Come back everyday to claim a new reward</Text>
            <Text style={styles.dateText}>
              {loginBonusData ? `${loginBonusData.progress} / ${loginBonusData.max}` : '...'}
            </Text>
          </View>

          <View style={styles.bonusProgressBar}>
            <View style={[styles.progressFill, {
              width: loginBonusData ? `${(loginBonusData.progress / loginBonusData.max) * 100}%` : '0%',
            }]} />
            <View style={styles.lockRow}>
              {[...Array(3)].map((_, i) => (
                <View key={i} style={styles.lockCircle}>
                  <Image source={require('../../../assets/images/Lock.png')} style={styles.lockIcon} />
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={{ marginTop: 10, alignSelf: 'center' }}
            onPress={() => {
            console.log('Claim Login Bonus clicked');
            claimLoginBonus();
          }}
            disabled={!loginBonusData}
          >
            <Text style={{ color: '#1bbc65', fontWeight: '600' }}>
              {loginBonusData ? 'Claim Login Bonus' : 'Loading...'}
            </Text>
          </TouchableOpacity>
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
              style={[styles.progressFill, {
                width: `${Math.min((quest.progress ?? 0) / (quest.target || 1) * 100, 100)}%`,
              }]}
            />
            <Text style={styles.progressLabel}>{quest.progress}/{quest.target}</Text>
          </View>
          {quest.completed ? (
            <Text style={[styles.arrow, { color: '#4ade80' }]}>✔</Text>
          ) : (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/(auth)/questSubmission', params: { questId: quest.id } })}
            >
              <Text style={styles.arrow}>➜</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
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
