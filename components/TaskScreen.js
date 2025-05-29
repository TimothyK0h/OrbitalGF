import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialTasks = [
  { id: '1', text: 'Recycle plastic bottles', points: 10, done: false },
  { id: '2', text: 'Use reusable shopping bag', points: 15, done: false },
  { id: '3', text: 'Take public transport', points: 20, done: false },
  { id: '4', text: 'Plant a tree', points: 50, done: false },
];

export default function TaskScreen({ onScoreChange }) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);

    const total = updatedTasks.reduce((sum, t) => sum + (t.done ? t.points : 0), 0);
    if (onScoreChange) onScoreChange(total);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eco-Friendly Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.task}
            onPress={() => toggleTask(item.id)}
          >
            <Ionicons
              name={item.done ? 'checkbox' : 'square-outline'}
              size={24}
              color="green"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.text, item.done && { textDecorationLine: 'line-through' }]}>
              {item.text} (+{item.points} pts)
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#2e7d32' },
  task: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  text: { fontSize: 16 },
});
