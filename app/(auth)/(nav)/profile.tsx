import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.title}> profile </Text>
        <Button title="Open edit profile" onPress={() => router.push('/(auth)/editProfile')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold' },
});