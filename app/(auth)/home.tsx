import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import auth from "@react-native-firebase/auth"
import { useRouter } from 'expo-router';

export default function Page() {
    const router = useRouter()

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>GF</Text>
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Menu</Text>
            <Ionicons name="menu" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcome}>Welcome to your forest!</Text>

      {/* Forest Image */}
      <Image source={require('../../assets/images/forest.jpg')} style={styles.forestImage} resizeMode="contain" />

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Tree Gallery */}
        <Text style={styles.sectionTitle}>Tree gallery</Text>
        <View style={styles.treeRow}>
          {['Tree 1', 'Tree 2', 'Tree 3', 'Tree 4'].map((label, index) => (
            <View style={styles.treeBox} key={index}>
              <View style={[styles.treeColor, { backgroundColor: treeColors[index] }]} />
              <Text style={styles.treeLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Other Features */}
        <Text style={styles.sectionTitle}>Other features</Text>
        <View style={styles.featureRow}>
          {[
            { label: 'Eco-quests', color: '#FACC15' },
            { label: 'Green rec', color: '#FB7185' },
            { label: 'Impact dashboard', color: '#D4A373' },
            { label: 'Feedback and\nSuggestions', color: '#60A5FA' },
          ].map((item, index) => (
            <View key={index} style={styles.featureBox}>
              <View style={[styles.featureColor, { backgroundColor: item.color }]} />
              <Text style={styles.featureLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.navbar}>
        <Ionicons name="wallet-outline" size={30} color="#000" />
        <MaterialIcons name="edit" size={30} color="#000" />
        <View style={styles.navCenter}>
          <Ionicons name="home" size={30} color="#fff" />
          <Text style={styles.navCenterText}>Home</Text>
        </View>
        <Ionicons name="bar-chart-outline" size={30} color="#000" />
        <TouchableOpacity onPress={() => router.push('/(auth)/settings')}>
            <Ionicons name="settings-outline" size={30} color="#000" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const treeColors = ['#86EFAC', '#5EEAD4', '#A3E635', '#67E8F9'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22C55E',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    marginRight: 4,
  },
  welcome: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginVertical: 8,
  },
  forestImage: {
    width: '100%',
    height: 160,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 130, // push up from navbar
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  treeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  treeBox: {
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  treeColor: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },
  treeLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 20,
  },
  featureBox: {
    alignItems: 'center',
    width: '25%',
  },
  featureColor: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },
  featureLabel: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  navbar: {
    position: 'absolute',
    bottom: 10, // more spacing so it doesn't block image
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  navCenter: {
    backgroundColor: '#22C55E',
    padding: 12,
    borderRadius: 300,
    alignItems: 'center',
  },
  navCenterText: {
    color: '#fff',
    fontSize: 10,
  },
});
