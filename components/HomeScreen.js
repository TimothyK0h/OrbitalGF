import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TreeProgress from './TreeProgress';

export default function HomeScreen({ username }) {
  const progress = 40; // for testing, replace with dynamic value later

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}!</Text>
      <TreeProgress progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf8ec',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
});
