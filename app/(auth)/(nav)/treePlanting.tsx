import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const treeImages: { [key: string]: any } = {
  Tomato1: require('../../../assets/images/tomato1.png'),
  Tomato2: require('../../../assets/images/tomato2.png'),
  Tomato3: require('../../../assets/images/tomato3.png'),
  Tomato4: require('../../../assets/images/tomato4.png'),
  Tomato5: require('../../../assets/images/tomato5.png'),

  Straw1: require('../../../assets/images/straw1.png'),
  Straw2: require('../../../assets/images/straw2.png'),
  Straw3: require('../../../assets/images/straw3.png'),
  Straw4: require('../../../assets/images/straw4.png'),
  Straw5: require('../../../assets/images/straw5.png'),

  Bean1: require('../../../assets/images/bean1.png'),
  Bean2: require('../../../assets/images/bean2.png'),
  Bean3: require('../../../assets/images/bean3.png'),
  Bean4: require('../../../assets/images/bean4.png'),
  Bean5: require('../../../assets/images/bean5.png'),

  Unknown: require('../../../assets/images/unknown.png'),
};

const trees = ['Tomato', 'Strawberry', 'Bean'];
const stageMap: Record<'Seed' | 'Sprout' | 'Seedling' | 'Sapling' | 'Fully Grown', number> = {
  'Seed': 1,
  'Sprout': 2,
  'Seedling': 3,
  'Sapling': 4,
  'Fully Grown': 5,
};

export default function TreePlanting() {
  const router = useRouter();
  const { tree } = useLocalSearchParams<{ tree?: string }>();
  const currentIndex = trees.findIndex(t => t.toLowerCase() === tree?.toLowerCase());
  const treeName = trees[currentIndex] || 'Tomato';

  const [growthStage, setGrowthStage] = useState('Unknown');
  const [growthProgress, setGrowthProgress] = useState(0);

  const getTreeImage = () => {
    const validStages = ['Seed', 'Sprout', 'Seedling', 'Sapling', 'Fully Grown'] as const;
    const stageKey = validStages.includes(growthStage as any) ? growthStage as keyof typeof stageMap : undefined;
    const stageNum = stageKey ? stageMap[stageKey] : undefined;
    const name = treeName.toLowerCase();
    const key = stageNum
      ? name === 'strawberry' ? `Straw${stageNum}` :
        name === 'bean' ? `Bean${stageNum}` :
        name === 'tomato' ? `Tomato${stageNum}` : 'Unknown'
      : 'Unknown';

    return treeImages[key] || treeImages['Unknown'];
  };

  const navigateTree = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'prev'
        ? (currentIndex + trees.length - 1) % trees.length
        : (currentIndex + 1) % trees.length;
    router.push({ pathname: '/(auth)/(nav)/treePlanting', params: { tree: trees[newIndex] } });
  };

  useEffect(() => {
    const fetchTree = async () => {
      const userId = auth().currentUser?.uid;
      if (!userId || !treeName) return;
      const doc = await firestore()
        .collection('users')
        .doc(userId)
        .collection('trees')
        .doc(treeName)
        .get();
      setGrowthStage(doc.data()?.growthStage || 'Unknown');
      setGrowthProgress(doc.data()?.growthProgress || 0);
    };
    fetchTree();
  }, [treeName]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>GF</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBox}>
            <Ionicons name="notifications-outline" size={18} color="#1bbc65" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.galleryBox}
            onPress={() => router.push('/(auth)/(nav)/treeGallery')}
          >
            <Ionicons name="image-outline" size={16} color="#1bbc65" />
            <Text style={styles.galleryText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tree Display Area */}
      <View style={styles.treeCard}>
        <Image source={getTreeImage()} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      </View>

      {/* Tree Base Bar */}
      <View style={styles.treeBaseBar}>
        <Text style={styles.treeStage}>{growthStage}</Text>
        <View style={styles.treeNav}>
          <TouchableOpacity onPress={() => navigateTree('prev')}>
            <Ionicons name="chevron-back" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.treeName}>{treeName}</Text>
          <TouchableOpacity onPress={() => navigateTree('next')}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Feather name="share-2" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Growth Progress Bar */}
      <View style={styles.statusBar}>
        <View style={styles.progressSection}>
          <Text style={styles.statusLabel}>Growth progress</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${growthProgress}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1bbc65',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 24,
    gap: 5,
  },
  galleryText: {
    color: '#1bbc65',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  treeCard: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 16,
    backgroundColor: '#eac67a',
    borderColor: '#000',
    borderWidth: 1,
    overflow: 'hidden',
  },
  treeBaseBar: {
    position: 'absolute',
    bottom: 160,
    backgroundColor: '#8a5d20',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treeStage: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  treeNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  treeName: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  statusBar: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#28332d',
    marginBottom: 4,
  },
  progressSection: {
    flex: 1,
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6fcf97',
  },
});
