import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function editProfile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.title}> edit profile </Text>
        <Button title="Open profile" onPress={() => router.push('/(auth)/(nav)/profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold' },
});