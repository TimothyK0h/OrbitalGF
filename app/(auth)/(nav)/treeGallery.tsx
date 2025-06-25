import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

export default function TreeGallery() {
  const router = useRouter();
  const treeList = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>GF</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellBox}>
            <Ionicons name="notifications-outline" size={18} color="#1bbc65" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.treeBox}
          onPress={() => router.push('/(auth)/(nav)/treePlanting')}>
            <Ionicons name="image-outline" size={16} color="#1bbc65" />
            <Text style={styles.treeText}>Tree</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.galleryTitle}>Tree gallery</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {treeList.map((i) => (
            <View key={i} style={styles.treeItem}>
              <View style={styles.treeSquare} />
              <View style={styles.treeTextBox}>
                <Text style={styles.treeTitle}>{`Tree ${i}`}</Text>
                <Text style={styles.treeDetails}>Details</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1bbc65',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellBox: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 24,
    gap: 5,
  },
  treeText: {
    color: '#1bbc65',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  contentBox: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  galleryTitle: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#28332d',
    marginBottom: 20,
    alignSelf: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  treeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  treeSquare: {
    width: 60,
    height: 60,
    backgroundColor: '#6fcf97',
    borderRadius: 6,
  },
  treeTextBox: {
    marginLeft: 15,
  },
  treeTitle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: '#000',
  },
  treeDetails: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: '#000',
  },
});