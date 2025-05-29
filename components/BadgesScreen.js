import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const badges = [
  {
    emoji: '✅',
    title: 'Verified User',
    description: 'You’ve completed your onboarding!',
  },
  {
    emoji: '🌱',
    title: 'Tree Planter',
    condition: (progress) => progress >= 100,
    description: 'You completed a tree and unlocked planting!',
  },
  {
    emoji: '🧠',
    title: 'Task Master',
    condition: (tasksCompleted) => tasksCompleted >= 10,
    description: 'Completed 10 eco-friendly tasks',
  },
  {
    emoji: '💯',
    title: 'Perfectionist',
    condition: (progress) => progress === 100,
    description: 'Reached 100% tree progress',
  },
  {
    emoji: '📅',
    title: 'Daily Dedication',
    condition: (tasksCompleted) => tasksCompleted >= 3,
    description: 'Completed tasks for 3+ days',
  },
];

const BadgesScreen = ({ progress = 0, tasksCompleted = 0 }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎖️ Your Achievements</Text>
      {badges.map((badge, index) => {
        const unlocked =
          !badge.condition || badge.condition(progress, tasksCompleted);
        return (
          <View
            key={index}
            style={[
              styles.badgeCard,
              { opacity: unlocked ? 1 : 0.3 },
            ]}
          >
            <Text style={styles.emoji}>{badge.emoji}</Text>
            <View>
              <Text style={styles.badgeTitle}>{badge.title}</Text>
              <Text style={styles.description}>{badge.description}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BadgesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFBEF',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    width: '100%',
  },
  emoji: {
    fontSize: 32,
    marginRight: 15,
  },
  badgeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
