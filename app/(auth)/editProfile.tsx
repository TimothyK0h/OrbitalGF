import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EditProfile() {
  const router = useRouter();
  const user = auth().currentUser;

  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [openRegion, setOpenRegion] = useState(false);
  const [regionItems, setRegionItems] = useState([
    { label: 'Central', value: 'Central' },
    { label: 'North', value: 'North' },
    { label: 'North-East', value: 'North-East' },
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' },
  ]);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const doc = await firestore().collection('users').doc(user.uid).get();
      const data = doc.data();
      if (!data) return;

      setName(data.name || '');
      setPlace(data.region || '');
      setPhone(data.phoneNumber || '');
      setEmail(data.email || '');
      if (data.profileImage) {
        setImageUri(data.profileImage);
      }
    };

    fetchUserData();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadProfileImage = async (userId: string) => {
    if (!imageUri || imageUri.startsWith('https://')) return imageUri; 

    const filePath = `profileImages/${userId}/profile.jpg`;
    const reference = storage().ref(filePath);

    await reference.putFile(imageUri);
    const downloadUrl = await reference.getDownloadURL();

    await firestore().collection('users').doc(userId).update({ profileImage: downloadUrl });
    return downloadUrl;
  };

  const saveProfile = async () => {
    if (!user) return;

    const userRef = firestore().collection('users').doc(user.uid);

    try {
      const updates: any = {
        name,
        region: place,
        phoneNumber: phone,
        email,
      };

      const imageUrl = await uploadProfileImage(user.uid);
      if (imageUrl) updates.profileImage = imageUrl;

      await userRef.update(updates);
      Alert.alert('Profile updated!');
      router.push('/(auth)/(nav)/profile');
    } catch (err) {
      console.error(err);
      Alert.alert('Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(auth)/(nav)/profile')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentBox} style={styles.scrollArea}>
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.avatarCircle} onPress={handleImagePick}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={{ width: 64, height: 64, borderRadius: 32 }} />
            ) : (
              <Ionicons name="person-outline" size={32} color="#1bbc65" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={[styles.inputGroup, { zIndex: 1000 }]}>
          <DropDownPicker
            open={openRegion}
            value={place}
            items={regionItems}
            setOpen={setOpenRegion}
            setValue={setPlace}
            setItems={setRegionItems}
            placeholder="Select Region"
            style={styles.input}
            dropDownContainerStyle={{ borderColor: '#d1d5db' }}
            listMode="MODAL"
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>UPDATE PROFILE DETAILS</Text>
        </TouchableOpacity>
      </ScrollView>
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
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Poppins',
  },
  contentBox: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    padding: 24,
  },
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#1bbc65',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#1bbc65',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: '#1bbc65',
    fontWeight: '500',
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  saveButton: {
    backgroundColor: '#1bbc65',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  scrollArea: {
    flex: 1,
  },
});
