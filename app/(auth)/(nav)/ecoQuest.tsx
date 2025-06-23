import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ecoPoints() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Eco-Quest </Text>
        <Button title="Open questSubmission" onPress={() => router.push("/(auth)/questSubmission")} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold' },
});