import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const treeImages = [
  require('../assets/plant1a.png'),  // 0-20%
  require('../assets/plant1b.png'),  // 21-40%
  require('../assets/plant1c.png'),  // 41-60%
  require('../assets/plant1d.png'),  // 61-80%
  require('../assets/plant1e.png'),  // 81-100%
];

const getTreeLevel = (score) => {
  if (score <= 20) return 0;
  if (score <= 40) return 1;
  if (score <= 60) return 2;
  if (score <= 80) return 3;
  return 4;
};

const TreeProgress = ({ score }) => {
  const level = getTreeLevel(score);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Tree's Growth 🌱</Text>
      <Image source={treeImages[level]} style={styles.tree} resizeMode="contain"/>

      <Text style={styles.progressText}>{score}% grown</Text>

      <Text style={styles.leaderboardTitle}>🏆 Leaderboard</Text>
      <Text>1. Alex - 100%</Text>
      <Text>2. Jamie - 85%</Text>
      <Text>3. You - {score}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32' },
  tree: {tree: {
  width: '100%',
  height: 250, // or adjust based on screen size
  marginVertical: 20,
},
 },
  progressText: { fontSize: 18, marginBottom: 20 },
  leaderboardTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 10 },
});

export default TreeProgress;
