import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function treeGallery() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Tree Gallery </Text>
      <Button title="Open Tree Planting" onPress={() => router.push('/(auth)/(nav)/treePlanting')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
});