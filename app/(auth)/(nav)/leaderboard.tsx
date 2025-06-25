import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Leaderboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Region');
  const [rank, setRank] = useState(5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => router.push('/(auth)/(nav)/home') }>
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
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={activeTab === tab ? styles.activeTabText : styles.inactiveTabText}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.podiumWrapper}>
          <View style={styles.podiumSection}>
            <View style={[styles.podium, styles.second]}>
              <View style={styles.userIcon}><Ionicons name="person-outline" size={24} color="#1bbc65" /></View>
              <Text>User2</Text>
              <Text>1000</Text>
            </View>

            <View style={[styles.podium, styles.first]}>
              <View style={styles.userIconLarge}><Ionicons name="person-outline" size={28} color="#1bbc65" /></View>
              <Text>User1</Text>
              <Text>1200</Text>
            </View>

            <View style={[styles.podium, styles.third]}>
              <View style={styles.userIcon}><Ionicons name="person-outline" size={24} color="#1bbc65" /></View>
              <Text>User3</Text>
              <Text>900</Text>
            </View>
          </View>
        </View>

        <Text style={styles.summary}>You've finished <Text style={{ color: '#1bbc65', fontWeight: 'bold' }}>#{rank}</Text> in the region last month</Text>

        {
          //Place holder to look better for milestone 2 LOL
        }
        <ScrollView contentContainerStyle={styles.rankList} showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={styles.rankRow}>
              <Text style={styles.rank}>{i}</Text>
              <View style={styles.rankUserIcon}><Ionicons name="person-outline" size={18} color="#1bbc65" /></View>
              <Text style={styles.rankName}>Name</Text>
              <Text style={styles.rankPoints}>??? points</Text>
            </View>
          ))}
          <View style={styles.rankRow}>
            <Text style={styles.rank}>5</Text>
            <View style={styles.rankUserIcon}><Ionicons name="person-outline" size={18} color="#1bbc65" /></View>
            <Text style={styles.rankName}>Timothy Koh</Text>
            <Text style={styles.rankPoints}>400 points</Text>
          </View>
          <View style={styles.rankRow}>
            <Text style={styles.rank}>6</Text>
            <View style={styles.rankUserIcon}><Ionicons name="person-outline" size={18} color="#1bbc65" /></View>
            <Text style={styles.rankName}>Andrew Gan</Text>
            <Text style={styles.rankPoints}>250 points</Text>
          </View>
          <View style={styles.rankRow}>
            <Text style={styles.rank}>7</Text>
            <View style={styles.rankUserIcon}><Ionicons name="person-outline" size={18} color="#1bbc65" /></View>
            <Text style={styles.rankName}>Mehfyr3</Text>
            <Text style={styles.rankPoints}>100 points</Text>
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  tabsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tabsBorder: {
    borderWidth: 1,
    borderColor: '#1bbc65',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabDivider: {
    borderRightWidth: 1,
    borderColor: '#1bbc65',
  },
  activeTab: {
    backgroundColor: '#1bbc65',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#000',
    fontWeight: '500',
  },
  leaderboardBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    paddingTop: 10,
  },
  podiumWrapper: {
    height: 180,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  podiumSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  podium: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    borderRadius: 10,
    width: 80,
    marginHorizontal: -1,
  },
  first: {
    backgroundColor: '#facc15',
    height: 140,
  },
  second: {
    backgroundColor: '#d1d5db',
    height: 110,
  },
  third: {
    backgroundColor: '#f97316',
    height: 100,
  },
  userIcon: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#1bbc65',
    borderRadius: 999,
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  userIconLarge: {
    position: 'absolute',
    top: -32,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#1bbc65',
    borderRadius: 999,
    padding: 12,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  summary: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  rankList: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    width: 30,
    fontWeight: 'bold',
  },
  rankUserIcon: {
    marginRight: 10,
  },
  rankName: {
    flex: 1,
  },
  rankPoints: {
    fontWeight: '500',
    color: '#555',
  },
});