import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FeedbackScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name="star"
            size={36}
            color={i <= rating ? '#facc15' : '#000'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const submitFeedback = async () => {
    try {
      if (rating === 0 && feedback.trim() === '') {
        Alert.alert('Feedback Required', 'Please provide a rating or suggestion.');
        return;
      }

      await firestore()
        .collection('feedback')
        .add({
          rating,
          suggestion: feedback.trim(),
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Thank you!', 'Your feedback has been submitted.');
      setRating(0);
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback and Suggestions</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>We value your opinion.</Text>

        <Text style={styles.subTitle}>How would you rate us?</Text>
        <View style={styles.starsRow}>{renderStars()}</View>

        <Text style={styles.prompt}>
          Kindly take a moment to tell us what you think.
        </Text>
        <TextInput
          style={styles.inputBox}
          multiline
          numberOfLines={5}
          placeholder="Your feedback..."
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#1bbc65',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  star: {
    marginHorizontal: 6,
  },
  prompt: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  inputBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1bbc65',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});