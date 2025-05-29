import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskScreen({ tasks, setTasks, onScoreChange }) {
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
