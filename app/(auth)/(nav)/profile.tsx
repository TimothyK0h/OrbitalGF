import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(auth)/(nav)/home')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/editProfile')}>
          <MaterialIcons name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentBox}>
        <View style={styles.infoItem}>
          <Ionicons name="person" size={20} color="#a78bfa" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Username</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="location-sharp" size={20} color="#3b82f6" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Place</Text>
            <Text style={styles.value}>General location</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="emoji-events" size={20} color="#facc15" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Badges</Text>
            <Text style={styles.value}>List of badges</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <FontAwesome5 name="seedling" size={20} color="#22c55e" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Eco-points/Tree planted</Text>
            <Text style={styles.value}>10000 / 10</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={20} color="#a16207" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>+91 99887 76655</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Entypo name="mail" size={20} color="#fb923c" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>arjundas@mail.com</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  contentBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
    gap: 10,
  },
  infoText: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#111827',
  },
});