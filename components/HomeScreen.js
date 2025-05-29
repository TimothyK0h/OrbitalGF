import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen({ username }) {
  const progress = 30; // static for now
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username} 🌳</Text>
      <Text style={styles.sectionTitle}>🌱 Tree Growth Progress</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text>{progress}% grown</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 18, marginBottom: 10 },
  progressBar: { width: '100%', height: 20, backgroundColor: '#ddd', borderRadius: 10 },
  progressFill: { height: '100%', backgroundColor: 'green', borderRadius: 10 },
});
    