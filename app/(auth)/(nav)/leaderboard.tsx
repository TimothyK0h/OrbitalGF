import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Leaderboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Friend' | 'Region' | 'National'>('Region');
  const [users, setUsers] = useState<any[]>([]);
  const [region, setRegion] = useState<string>('');
  const [rank, setRank] = useState<number>(0);
  const placeholderImage = require('../../../assets/images/placeholder.png');

  useEffect(() => {
    const fetchRegionAndUsers = async () => {
      const currentUser = auth().currentUser;
      if (!currentUser) return;

      const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
      const currentRegion = userDoc.data()?.region || 'Unknown';
      setRegion(currentRegion);

      const snapshot = await firestore().collection('users').get();
      const fetchedUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as {
        id: string;
        name: string;
        region: string;
        ecoPoints: number;
        profileImage?: string;
      }[];

      const filtered = fetchedUsers.filter(user => {
        if (activeTab === 'Region') return user.region === currentRegion;
        if (activeTab === 'Friend') return true; // Placeholder logic for now
        return true;
      });
      const sorted = filtered.sort((a, b) => b.ecoPoints - a.ecoPoints);
      const userIndex = sorted.findIndex(user => user.id === currentUser.uid);
      if (userIndex !== -1) setRank(userIndex + 1);

      setUsers(sorted);
    };

    fetchRegionAndUsers();
  }, [activeTab]);

  const podiumUsers = [1, 0, 2].map(i => users[i]).filter(Boolean);

  const getTabLabel = () => {
    switch (activeTab) {
      case 'National':
        return 'your nation';
      case 'Friend':
        return 'your friends list';
      case 'Region':
        return 'your region';
      default:
        return 'the leaderboard';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(auth)/(nav)/home')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.leaderboardBox}>
        <View style={styles.tabsContainer}>
          <View style={styles.tabsBorder}>
            <View style={styles.tabs}>
              {['Friend', 'Region', 'National'].map((tab, index) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, index < 2 && styles.tabDivider, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab as any)}
                >
                  <Text style={activeTab === tab ? styles.activeTabText : styles.inactiveTabText}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.podiumWrapper}>
          <View style={styles.podiumSection}>
            {podiumUsers.map((user, index) => (
              <View
                key={user.id}
                style={[styles.podium, index === 0 ? styles.second : index === 1 ? styles.first : styles.third, { alignItems: 'center' }]}
              >
                <View style={index === 1 ? styles.userIconLarge : styles.userIcon}>
                  {user.profileImage ? (
                    <Image source={{ uri: user.profileImage }} style={{ width: 24, height: 24, borderRadius: 12 }} />
                  ) : (
                    <Ionicons name="person-outline" size={24} color="#1bbc65" />
                  )}
                </View>
                <Text style={{ textAlign: 'center' }}>{user.name}</Text>
                <Text style={{ textAlign: 'center' }}>{user.ecoPoints}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.summary}>You've finished <Text style={{ color: '#1bbc65', fontWeight: 'bold' }}>#{rank}</Text> in {getTabLabel()} </Text>

        <FlatList
          contentContainerStyle={styles.rankList}
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.rankRow}>
              <Text style={styles.rank}>{index + 1}</Text>
              <View style={styles.rankUserIcon}>
                {item.profileImage ? (
                  <Image source={{ uri: item.profileImage }} style={{ width: 18, height: 18, borderRadius: 9 }} />
                ) : (
                  <Ionicons name="person-outline" size={18} color="#1bbc65" />
                )}
              </View>
              <Text style={styles.rankName}>{item.name}</Text>
              <Text style={styles.rankPoints}>{item.ecoPoints} points</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1bbc65', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 30 },
  headerTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  tabsContainer: { marginHorizontal: 20, marginBottom: 20 },
  tabsBorder: { borderWidth: 1, borderColor: '#1bbc65', borderRadius: 10, overflow: 'hidden' },
  tabs: { flexDirection: 'row', backgroundColor: '#fff' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabDivider: { borderRightWidth: 1, borderColor: '#1bbc65' },
  activeTab: { backgroundColor: '#1bbc65' },
  activeTabText: { color: '#fff', fontWeight: '600' },
  inactiveTabText: { color: '#000', fontWeight: '500' },
  leaderboardBox: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, flex: 1, paddingTop: 10 },
  podiumWrapper: { height: 180, justifyContent: 'flex-end', marginBottom: 10 },
  podiumSection: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' },
  podium: { alignItems: 'center', justifyContent: 'flex-end', padding: 10, borderRadius: 10, width: 80, marginHorizontal: -1 },
  first: { backgroundColor: '#facc15', height: 140 },
  second: { backgroundColor: '#d1d5db', height: 110 },
  third: { backgroundColor: '#f97316', height: 100 },
  userIcon: { position: 'absolute', top: -28, alignSelf: 'center', borderWidth: 2, borderColor: '#1bbc65', borderRadius: 999, padding: 10, backgroundColor: '#fff', zIndex: 1 },
  userIconLarge: { position: 'absolute', top: -32, alignSelf: 'center', borderWidth: 2, borderColor: '#1bbc65', borderRadius: 999, padding: 12, backgroundColor: '#fff', zIndex: 1 },
  summary: { color: '#000', fontSize: 14, fontWeight: '500', textAlign: 'center', marginBottom: 20 },
  rankList: { paddingHorizontal: 20, paddingBottom: 120 },
  rankRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  rank: { width: 30, fontWeight: 'bold' },
  rankUserIcon: { marginRight: 10 },
  rankName: { flex: 1 },
  rankPoints: { fontWeight: '500', color: '#555' },
});

export default Leaderboard;
