import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EcoTips() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Green Full-Width Header Section */}
        <View style={styles.fullWidthGreen}>
          <Text style={styles.title}>Eco-tips</Text>
          <Text style={styles.subtitle}>Recommendation of the day</Text>
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>
              You haven’t been cycling as much lately, consider getting back on the{' '}
              <Text style={styles.highlight}>bike</Text> and help both the environment and you stay fit
            </Text>
          </View>
        </View>

        {/* Daily Habits Section */}
        <Text style={styles.sectionTitle}>Daily habits</Text>
        <View style={styles.groupedCard}>
          <Text style={styles.cardText}>
            If you recycle just <Text style={styles.highlight}>2 more items</Text> today you will be in the top 5% of recyclers nationwide!
          </Text>
          <View style={styles.cardDivider} />
          <Text style={styles.cardText}>
            Consider using <Text style={styles.highlight}>reusable bags</Text> for your next grocery trip, it’s a simple switch to help reduce plastic waste
          </Text>
          <View style={styles.cardDivider} />
          <Text style={styles.cardText}>
            Over the past month you purchased <Text style={styles.highlight}>5 eco-friendly products</Text>, thanks for making sustainability a daily habit
          </Text>
        </View>

        {/* Divider between sections */}
        <View style={styles.sectionLineDivider} />

        {/* Beyond the App Section */}
        <Text style={styles.sectionTitle}>Beyond the app</Text>
        <View style={styles.groupedCard}>
          <Text style={styles.cardText}>
            A local green event is coming up!{' '}
            <Text style={styles.link} onPress={() => Linking.openURL('https://www.nparks.gov.sg')}>
              Drop by to make a positive impact
            </Text>
          </Text>
          <View style={styles.cardDivider} />
          <Text style={styles.cardText}>
            Share this app with your friends
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingBottom: 100 },

  // Full-width green header section
  fullWidthGreen: {
    backgroundColor: '#1bbc65',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  tipBox: {
    backgroundColor: '#f0fdf4',
    padding: 14,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  tipText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '500',
  },

  sectionTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
  },

  groupedCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  cardText: {
    fontSize: 14,
    color: '#111827',
    padding: 14,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#ccc',
  },

  sectionLineDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  highlight: {
    color: '#1bbc65',
    fontWeight: '700',
  },
  link: {
    color: '#1bbc65',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});