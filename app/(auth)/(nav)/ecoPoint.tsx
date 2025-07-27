import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

export default function EcoPointsOverview() {
  const router = useRouter();

  const [dropletInput, setDropletInput] = useState<{ [key: string]: string }>({});
  const [ecoPoints, setEcoPoints] = useState<number>(0);
  const [treeStages, setTreeStages] = useState<{ [treeId: string]: string }>({});
  const [highlightQuest, setHighlightQuest] = useState<Quest | null>(null);

  const DROPLET_COST = 15;
  const treeIds = ['Tomato', 'Strawberry', 'Bean'];

  const getGrowthStage = (progress: number) => {
    if (progress >= 100) return 'Fully Grown';
    if (progress >= 80) return 'Sapling';
    if (progress >= 60) return 'Seedling';
    if (progress >= 40) return 'Sprout';
    if (progress >= 20) return 'Seed';
    return 'Unknown';
  };

  const fetchEcoPoints = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const userDoc = await firestore().collection('users').doc(userId).get();
    setEcoPoints(userDoc.data()?.ecoPoints ?? 0);
  };

  const fetchTrees = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const treeStagesData: { [key: string]: string } = {};

    for (const treeId of treeIds) {
      const treeDoc = await firestore()
        .collection('users')
        .doc(userId)
        .collection('trees')
        .doc(treeId)
        .get();

      treeStagesData[treeId] = treeDoc.data()?.growthStage ?? 'Unknown';
    }

    setTreeStages(treeStagesData);
  };

  const fetchHighlightQuest = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('quests')
      .get();

    let topQuest: Quest | null = null;
    let highestRatio = -1;

    snapshot.forEach(doc => {
      const data = doc.data();
      const progress = data.progress ?? 0;
      const target = data.target ?? 1;
      const ratio = progress / target;

      if (ratio > highestRatio) {
        highestRatio = ratio;
        topQuest = {
          id: doc.id,
          type: data.type,
          title: data.title,
          points: data.points,
          target: data.target,
          progress,
          completed: data.completed ?? false,
          carbonEmission: data.carbonEmission ?? 0,
        };
      }
    });

    setHighlightQuest(topQuest);
  };

  useEffect(() => {
    fetchEcoPoints();
    fetchTrees();
    fetchHighlightQuest();
  }, []);

  const waterTree = async (treeId: string, droplets: number) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId || droplets <= 0) return alert('Invalid input.');

      const userRef = firestore().collection('users').doc(userId);
      const treeRef = userRef.collection('trees').doc(treeId);

      const userSnap = await userRef.get();
      const treeSnap = await treeRef.get();

      const currentEcoPoints = userSnap.data()?.ecoPoints ?? 0;
      const currentDroplets = treeSnap.data()?.wateredDroplets ?? 0;

      const cost = droplets * DROPLET_COST;

      if (currentEcoPoints < cost) return alert('Not enough eco-points!');
      if (currentDroplets >= 100) return alert(`${treeId} is already fully grown!`);

      const newDroplets = Math.min(currentDroplets + droplets, 100);
      const newStage = getGrowthStage(newDroplets);

      await userRef.update({ ecoPoints: currentEcoPoints - cost });

      await treeRef.update({
        wateredDroplets: newDroplets,
        growthProgress: newDroplets,
        growthStage: newStage,
        lastUpdated: new Date(),
      });

      alert(`Watered ${treeId} with ${droplets} droplets!`);
      setDropletInput((prev) => ({ ...prev, [treeId]: '' }));
      setEcoPoints(currentEcoPoints - cost);
      setTreeStages((prev) => ({ ...prev, [treeId]: newStage }));

      router.push(`/(auth)/(nav)/treePlanting?tree=${treeId}`);
    } catch (err) {
      console.error('🔥 Watering Error:', err);
      alert('An error occurred while watering the tree.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Your Eco-points</Text>
        <View style={styles.overviewRow}>
          <View>
            <Text style={styles.subtitle}>Welcome to</Text>
            <Text style={styles.overviewTitle}>Eco-points Overview</Text>
          </View>
          <Image source={require('../../../assets/images/Repeat.png')} style={styles.repeatIcon} />
        </View>
        <View style={styles.pointsBox}>
          <Image source={require('../../../assets/images/Database.png')} style={styles.coinIcon} />
          <Text style={styles.earnedText}>Earned Eco-points</Text>
          <Text style={styles.points}>{ecoPoints} points</Text>
        </View>
      </View>

      <View style={styles.questBox}>
        <View style={styles.questTopRow}>
          <Text style={styles.questTitle}>
            You’re almost done with this quest.{"\n"}Finish it up for some quick points
          </Text>
          <View style={styles.timerRow}>
            <Image source={require('../../../assets/images/Clock.png')} style={styles.clockIcon} />
            <Text style={styles.timerText}>
              {highlightQuest ? getHoursToNextSGTMidnight() : ''}
          </Text>
          </View>
        </View>
        {highlightQuest && (
          <View style={styles.questContainer}>
            <View style={styles.questHeaderRow}>
              <Text style={styles.questProgressText}>{highlightQuest.title}</Text>
              <Text style={styles.questPoints}>{highlightQuest.points} points</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(highlightQuest.progress / highlightQuest.target) * 100}%` }]} />
              <Text style={styles.progressText}>{highlightQuest.progress}/{highlightQuest.target}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity onPress={() => router.push('/(auth)/(nav)/ecoQuest')}>
          <Text style={styles.ecoQuestLink}>➜ More Eco-Quest</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dottedLine} />

      <View style={styles.treeHeaderRow}>
        <Text style={styles.treeTitle}>Redeem for these trees</Text>
      </View>

      <View style={styles.treeList}>
        {treeIds.map((tree) => (
          <View key={tree} style={styles.treeItem}>
            <View style={styles.treeSquare} />
            <View style={styles.treeInfo}>
              <Text style={styles.treeName}>{tree}</Text>
              <Text style={styles.treeStage}>
                Growth Stage{' '}
                <Text style={styles.treeStageType}>{treeStages[tree] || 'Unknown'}</Text>
              </Text>
            </View>
            <Image source={require('../../../assets/images/Droplet.png')} style={styles.droplet} />
            <TextInput
              style={styles.waterInput}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#111"
              value={dropletInput[tree] || ''}
              onChangeText={(text) => setDropletInput((prev) => ({ ...prev, [tree]: text }))}
            />
            <TouchableOpacity
              onPress={() => {
                const parsed = Number(dropletInput[tree]?.trim());
                if (isNaN(parsed) || parsed <= 0) return alert('Enter a number > 0');
                waterTree(tree, parsed);
              }}
            >
              <Text style={styles.arrow}>➔</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.galleryRow}>
        <TouchableOpacity onPress={() => router.push('/(auth)/(nav)/treeGallery')}>
          <Text style={styles.treeGalleryLink}>➜ Tree Gallery</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', paddingBottom: 100 },
  header: { backgroundColor: '#1bbc65', padding: 20, paddingTop: 50 },
  mainTitle: { fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  overviewRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  subtitle: { color: '#fff', fontSize: 16 },
  overviewTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  repeatIcon: { width: 50, height: 50 },
  pointsBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinIcon: { width: 28, height: 28 },
  earnedText: { fontSize: 14, fontWeight: '600', color: '#1bbc65', flex: 1, marginLeft: 10 },
  points: { fontSize: 14, fontWeight: '700', color: '#facc15' },

  questBox: { backgroundColor: '#fff', padding: 20 },
  questTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  questTitle: { fontWeight: '600', fontSize: 15, flex: 1, paddingRight: 10 },
  timer: { color: '#f97316', fontWeight: '600', fontSize: 13 },

  questContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  questHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  questProgressText: { fontWeight: '700', fontSize: 14, color: '#111' },
  questPoints: { color: '#facc15', fontWeight: '700', fontSize: 14 },
  progressBar: {
    height: 22,
    backgroundColor: '#e5e7eb',
    borderRadius: 11,
    position: 'relative',
    justifyContent: 'center',
  },
  progressFill: {
    backgroundColor: '#1bbc65',
    width: '33%',
    height: '100%',
    borderRadius: 11,
  },
  progressText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#111',
    fontSize: 13,
    fontWeight: '600',
  },
  ecoQuestLink: {
    color: '#1bbc65',
    fontWeight: '600',
    marginTop: 6,
    alignSelf: 'flex-end',
  },

  dottedLine: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#9ca3af',
    marginVertical: 14,
    marginHorizontal: 20,
  },

  treeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  treeTitle: { fontWeight: '700', fontSize: 14 },

  treeList: { paddingHorizontal: 20, marginTop: 10 },
  treeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
    borderRadius: 6,
  },
  treeSquare: { width: 20, height: 20, backgroundColor: '#86efac', marginRight: 10 },
  treeInfo: { flex: 1 },
  treeName: { fontWeight: '600' },
  treeStage: { fontSize: 12, color: '#6b7280' },
  treeStageType: { color: '#22c55e', fontWeight: '600' },
  droplet: { width: 20, height: 20, marginRight: 10 },
  waterInput: {
    width: 40,
    height: 34,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 14,
    marginRight: 6,
    paddingTop: 0,
    paddingBottom: 0,
  },
  arrow: {
    fontSize: 20,
    color: '#1bbc65',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#e0f2f1',
    borderRadius: 6,
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  treeGalleryLink: { color: '#1bbc65', fontWeight: '600' },
  timerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  },
  clockIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  timerText: {
    color: '#f97316',
    fontWeight: '600',
    fontSize: 13,
  },
});
