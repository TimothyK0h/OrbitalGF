import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
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

const stageMap: Record<'Seed' | 'Sprout' | 'Seedling' | 'Sapling' | 'Fully Grown', number> = {
  'Seed': 1,
  'Sprout': 2,
  'Seedling': 3,
  'Sapling': 4,
  'Fully Grown': 5,
};

export default function TreeGallery() {
  const router = useRouter();
  const [trees, setTrees] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrees = async () => {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      try {
        const treeRef = firestore().collection('users').doc(userId).collection('trees');
        const snapshot = await treeRef.get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrees(data);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };

    fetchTrees();
  }, []);

  const getTreeImage = (name: string, stage: string) => {
    const validStages = ['Seed', 'Sprout', 'Seedling', 'Sapling', 'Fully Grown'] as const;
    const stageKey = validStages.includes(stage as any) ? stage as keyof typeof stageMap : undefined;
    const stageNum = stageKey ? stageMap[stageKey] : undefined;
    const lowerName = name.toLowerCase();

    const key = stageNum
      ? lowerName === 'strawberry' ? `Straw${stageNum}` :
        lowerName === 'bean' ? `Bean${stageNum}` :
        lowerName === 'tomato' ? `Tomato${stageNum}` : 'Unknown'
      : 'Unknown';

    return treeImages[key] || treeImages['Unknown'];
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>GF</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellBox}>
            <Ionicons name="notifications-outline" size={18} color="#1bbc65" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.treeBox}
            onPress={() => router.push('/(auth)/(nav)/treePlanting')}>
            <Ionicons name="image-outline" size={16} color="#1bbc65" />
            <Text style={styles.treeText}>Tree</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.galleryTitle}>Tree gallery</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {trees.map((tree, index) => (
            <View key={index} style={styles.treeItem}>
              <Image
                source={getTreeImage(tree.id, tree.growthStage)}
                style={styles.treeImage}
                resizeMode="contain"
              />
              <View style={styles.treeTextBox}>
                <Text style={styles.treeTitle}>{tree.id}</Text>
                <Text style={styles.treeDetails}>
                  Progress: {tree.growthProgress ?? 0}% | Stage: {tree.growthStage ?? 'Unknown'}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
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
    gap: 12,
  },
  bellBox: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 24,
    gap: 5,
  },
  treeText: {
    color: '#1bbc65',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  contentBox: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  galleryTitle: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#28332d',
    marginBottom: 20,
    alignSelf: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  treeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  treeImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  treeTextBox: {
    flex: 1,
  },
  treeTitle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: '#000',
  },
  treeDetails: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Poppins',
    color: '#555',
  },
});
