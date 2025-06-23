import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function questSubmission() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Quest Submission </Text>
        <Button title="Open ecoQuest" onPress={() => router.push('/(auth)/(nav)/ecoQuest')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold' },
});