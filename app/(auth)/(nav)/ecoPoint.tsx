import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ecoPoints() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Eco-points </Text>
        <Button title="Open ecoQuest" onPress={() => router.push('/(auth)/(nav)/ecoQuest')} />
        <Button title="Open Tree Gallery" onPress={() => router.push('/(auth)/(nav)/treeGallery')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
});