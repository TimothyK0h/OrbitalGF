import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function feedback() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}> feedback </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold' },
});
