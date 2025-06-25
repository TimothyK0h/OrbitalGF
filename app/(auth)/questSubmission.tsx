import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function questSubmission() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(auth)/(nav)/ecoQuest')}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quest submission</Text>
        </View>
      </View>

      {/* Upload Section */}
      <View style={styles.uploadBox}>
        <View style={styles.dashedBorder}>
          <TouchableOpacity style={styles.uploadIconContainer}>
            <Image
              source={require('../../assets/images/UploadCloud.png')}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>Tap to upload photo</Text>
            <Text style={styles.uploadNote}>PNG, JPEG or PDF</Text>
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity style={styles.cameraButton}>
            <Text style={styles.cameraButtonText}>Open camera</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>Upload Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  headerBox: {
    backgroundColor: '#1bbc65',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10'
  },
  backArrow: {
    fontSize: 22,
    color: '#fff',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 10,
  },
  uploadBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dashedBorder: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
  },
  uploadIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  uploadText: {
    color: '#10b981',
    fontWeight: '600',
  },
  uploadNote: {
    fontSize: 12,
    color: '#6b7280',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
  },
  orLine: {
    flex: 1,
    borderTopWidth: 1,             
    borderTopColor: '#d1d5db',
    borderStyle: 'dashed',        
    marginHorizontal: 10,
  },
  orText: {
    fontWeight: '600',
    color: '#9ca3af',
  },
  cameraButton: {
    backgroundColor: '#1bbc65',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  cameraButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  bottomButton: {
    backgroundColor: '#1bbc65',
    paddingVertical: 16,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  bottomButtonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});

