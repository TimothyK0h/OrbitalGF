import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

export default function IntroPage2() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/intro-bg.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.logo}>GF</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../assets/images/intro-page-2.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Grow Together!</Text>
        <Text style={styles.text}>
          Invite your friends to plant with you, and compete to have the largest forest.
          Obtain rare badges, participate in events and become the greatest forester the world has ever seen!
        </Text>

        <View style={styles.pagination}>
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => router.back()} style={styles.skip}>
            <Text style={styles.skipText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/(auth)')} style={styles.next}>
            <Text style={styles.nextText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  logo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 6,
  },
  image: {
    width: 220,
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#222',
  },
  text: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2bbf5e',
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  skip: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  skipText: {
    fontSize: 14,
    color: '#666',
  },
  next: {
    backgroundColor: '#2bbf5e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  nextText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
