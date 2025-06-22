import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate to login page after 2 seconds
      router.replace('/intro'); // change if your main screen is not at index
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GoonForester</Text>
      <Text style={styles.tagline}>Red dot with a green heart</Text>
      <Image
        source={require('../assets/images/intro-page-hills.png')}
        style={styles.hills}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2bbf5e',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#d54b2d',
    marginBottom: 30,
  },
  hills: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 150,
  },
});
