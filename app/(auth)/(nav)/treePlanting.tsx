import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TreePlanting() {
  const router = useRouter();
  const [waterPoints, setWaterPoints] = useState(15);

  const increaseWater = () => setWaterPoints(waterPoints + 1);
  const decreaseWater = () => setWaterPoints(Math.max(1, waterPoints - 1));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>GF</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBox}>
            <Ionicons name="notifications-outline" size={18} color="#1bbc65" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.galleryBox}
            onPress={() => router.push('/(auth)/(nav)/treeGallery')}
          >
            <Ionicons name="image-outline" size={16} color="#1bbc65" />
            <Text style={styles.galleryText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tree Display Area */}
      <View style={styles.treeCard}>
        {/* This area could be used for tree visualization */}
      </View>

      {/* Tree Base Bar (positioned above the status bar) */}
      <View style={styles.treeBaseBar}>
        <Text style={styles.treeStage}>Seedling</Text>
        <View style={styles.treeNav}>
          <Ionicons name="chevron-back" size={16} color="#fff" />
          <Text style={styles.treeName}>Tree 1</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </View>
        <TouchableOpacity>
          <Feather name="share-2" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Floating Growth + Water Bar */}
      <View style={styles.statusBar}>
        <View style={styles.progressSection}>
          <Text style={styles.statusLabel}>Growth progress</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.waterSection}>
          <Text style={styles.statusLabel}>Water with points</Text>
          <View style={styles.waterRow}>
            <Ionicons name="water-outline" size={18} color="#00b0f0" />
            <Text style={styles.waterAmount}>{waterPoints}</Text>
            <View style={styles.chevronControl}>
              <TouchableOpacity onPress={increaseWater}>
                <Ionicons name="chevron-up" size={14} color="#00b0f0" />
              </TouchableOpacity>
              <TouchableOpacity onPress={decreaseWater}>
                <Ionicons name="chevron-down" size={14} color="#00b0f0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    gap: 10,
  },
  iconBox: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 24,
    gap: 5,
  },
  galleryText: {
    color: '#1bbc65',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  treeCard: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 16,
    backgroundColor: '#eac67a',
    borderColor: '#000',
    borderWidth: 1,
    overflow: 'hidden',
  },
  treeBaseBar: {
    position: 'absolute',
    bottom: 160, 
    backgroundColor: '#8a5d20',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treeStage: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  treeNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  treeName: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  statusBar: {
    position: 'absolute',
    bottom: 90, 
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#28332d',
    marginBottom: 4,
  },
  progressSection: {
    flex: 1,
  },
  progressBar: {
    height: 10,
    width: 100,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#6fcf97',
  },
  waterSection: {
    alignItems: 'flex-end',
  },
  waterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  waterAmount: {
    fontSize: 16,
    color: '#00b0f0',
    fontWeight: '600',
  },
  chevronControl: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginLeft: 2,
  },
});
