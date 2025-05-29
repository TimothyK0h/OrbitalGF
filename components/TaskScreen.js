import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function TaskScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Water your plant', done: false },
    { id: 2, title: 'Do 10 pushups', done: false },
    { id: 3, title: 'Recycle something', done: true },
  ]);

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Daily Tasks</Text>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskItem}>
          <CheckBox value={task.done} onValueChange={() => toggleTask(task.id)} />
          <Text style={task.done ? styles.taskDone : styles.taskText}>{task.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  taskItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  taskText: { marginLeft: 10, fontSize: 16 },
  taskDone: { marginLeft: 10, fontSize: 16, textDecorationLine: 'line-through', color: '#888' },
});