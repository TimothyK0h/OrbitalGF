import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as FileSystem from 'expo-file-system';
import type { ImagePickerAsset } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function QuestSubmission() {
  const router = useRouter();
  const { questId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleOpenCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera permission is required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
  const user = auth().currentUser;
  if (!user || !questId) {
    Alert.alert('Missing user or quest ID');
    return;
  }

  if (!selectedImage) {
    Alert.alert('Please select an image');
    return;
  }

  try {
    setLoading(true);

    const questRef = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('quests')
      .doc(String(questId));

    const questSnap = await questRef.get();

    if (!questSnap.exists) {
      Alert.alert('Quest not found');
      return;
    }

    const quest = questSnap.data();
    const questTitle = quest?.title || 'Quest';

    const filename = `${Date.now()}.jpg`;
    const storageRef = storage().ref(`questUploads/${user.uid}/${filename}`);

    // Ensure local file URI
    let fileUri = selectedImage.uri;
    if (!fileUri.startsWith('file://')) {
      const downloaded = await FileSystem.downloadAsync(
        selectedImage.uri,
        FileSystem.cacheDirectory + filename
      );
      fileUri = downloaded.uri;
    }

    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    console.log('File exists:', fileInfo.exists, '| URI:', fileUri);

    if (!fileInfo.exists) {
      Alert.alert('Local file not found', fileUri);
      return;
    }

    try {
      await storageRef.putFile(fileUri);
      console.log('File uploaded to:', storageRef.fullPath);
    } catch (uploadError) {
      console.error('Upload failed:', uploadError);
      Alert.alert('Upload failed', 'putFile failed before downloadURL.');
      return;
    }

    const downloadURL = await storageRef.getDownloadURL();

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('questUploads')
      .add({
        imageUrl: downloadURL,
        questTitle,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

    const newProgress = (quest?.progress ?? 0) + 1;
    const isCompleted = newProgress >= (quest?.target ?? 1);

    await firestore().runTransaction(async (transaction) => {
      const userRef = firestore().collection('users').doc(user.uid);
      const userSnap = await transaction.get(userRef);
      const currentPoints = userSnap.data()?.ecoPoints ?? 0;

      transaction.update(userRef, {
        ecoPoints: currentPoints + (quest?.points ?? 0),
      });

      transaction.update(questRef, {
        progress: newProgress,
        completed: isCompleted,
      });
    });
    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('carbonEmissionList')
      .add({
        carbonEmission: quest?.carbonEmission ?? 0,
        questCompletionDate: firestore.FieldValue.serverTimestamp(),
    });

    Alert.alert('Photo uploaded and progress updated!');
    router.push('/(auth)/(nav)/ecoQuest');
  } catch (error) {
    console.error('Upload error:', error);
    if (error instanceof Error) {
      Alert.alert('Upload failed', error.message);
    } else {
      Alert.alert('Upload failed', 'An unknown error occurred.');
    }
  } finally {
    setLoading(false);
  }
};

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

      <View style={styles.uploadBox}>
        <View style={styles.dashedBorder}>
          <TouchableOpacity style={styles.uploadIconContainer} onPress={handlePickImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 10 }}
              />
            ) : (
              <>
                <Image
                  source={require('../../assets/images/UploadCloud.png')}
                  style={styles.uploadIcon}
                />
                <Text style={styles.uploadText}>Tap to upload photo</Text>
                <Text style={styles.uploadNote}>PNG, JPEG or PDF</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity style={styles.cameraButton} onPress={handleOpenCamera}>
            <Text style={styles.cameraButtonText}>Open camera</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.bottomButtonText}>Upload Photo</Text>
        )}
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
    gap: '10',
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
