import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>GF</Text>
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => router.push('/(auth)/settings')}
          >
            <Text style={styles.menuText}>Menu</Text>
            <Ionicons name="menu" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome */}
      <Text style={styles.welcome}>Welcome to your forest!</Text>

      {/* Forest Image */}
      <Image
        source={require('../../../assets/images/forest.jpg')}
        style={styles.forestImage}
        resizeMode="contain"
      />

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Tree Gallery */}
        <Text style={styles.sectionTitle}>Tree gallery</Text>
        <View style={styles.treeRow}>
          <TouchableOpacity
            style={styles.treeBox}
            onPress={() => router.push('/(auth)/(nav)/treeGallery')}
          >
            <View style={[styles.treeColor, { backgroundColor: treeColors[0] }]} />
            <Text style={styles.treeLabel}>Tree 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.treeBox}
            onPress={() => router.push('/(auth)/(nav)/treeGallery')}
          >
            <View style={[styles.treeColor, { backgroundColor: treeColors[1] }]} />
            <Text style={styles.treeLabel}>Tree 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.treeBox}
            onPress={() => router.push('/(auth)/(nav)/treeGallery')}
          >
            <View style={[styles.treeColor, { backgroundColor: treeColors[2] }]} />
            <Text style={styles.treeLabel}>Tree 3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.treeBox}
            onPress={() => router.push('/(auth)/(nav)/treeGallery')}
          >
            <View style={[styles.treeColor, { backgroundColor: treeColors[3] }]} />
            <Text style={styles.treeLabel}>Tree 4</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Other Features */}
        <Text style={styles.sectionTitle}>Other features</Text>
        <View style={styles.featureRow}>
          <TouchableOpacity
            style={styles.featureBox}
            onPress={() => router.push('/(auth)/(nav)/ecoQuest')}
          >
            <Image
              source={require('../../../assets/images/eco-quest.png')}
              style={styles.featureImage}
              resizeMode="contain"
            />
            <Text style={styles.featureLabel}>Eco‑quests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureBox}
            onPress={() => router.push('/(auth)/(nav)/greenRec')}
          >
            <Image
              source={require('../../../assets/images/eco-rec.png')}
              style={styles.featureImage}
              resizeMode="contain"
            />
            <Text style={styles.featureLabel}>Green rec</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureBox}
            onPress={() => router.push('/(auth)/(nav)/impactDashboard')}
          >
            <Image
              source={require('../../../assets/images/impact-dash.png')}
              style={styles.featureImage}
              resizeMode="contain"
            />
            <Text style={styles.featureLabel}>Impact dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureBox}
            onPress={() => router.push('/(auth)/(nav)/feedback')}
          >
            <Image
              source={require('../../../assets/images/feedback.png')}
              style={styles.featureImage}
              resizeMode="contain"
            />
            <Text style={styles.featureLabel}>Feedback</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </View>
  );
}

const treeColors = ['#86EFAC', '#5EEAD4', '#A3E635', '#67E8F9'];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#22C55E' },
  header: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureImage: {
    width: '100%',
    height: 60, // adjust based on your layout
    borderRadius: 8,
    marginBottom: 8,
  },
  logo: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
  },
  menuText: { color: '#fff', marginRight: 4 },
  welcome: { textAlign: 'center', color: '#fff', fontSize: 16, marginVertical: 8 },
  forestImage: { width: '100%', height: 160, marginBottom: 10 },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  contentContainer: { flexGrow: 1, padding: 20, paddingBottom: 130 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  treeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  treeBox: { alignItems: 'center', width: "22%", height: 100 },
  treeColor: { width: 80, height: 80, borderRadius: 14 },
  treeLabel: { marginTop: 8, fontSize: 14, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 20 },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 20,
  },
  featureBox: { alignItems: 'center', width: '20%' },
  featureColor: { width: 80, height: 80, borderRadius: 14 },
  featureLabel: { fontSize: 13, textAlign: 'center', marginTop: 8 },
});