import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Install this package if not using Expo

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [progress, setProgress] = useState(30);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Water your plant", done: false },
    { id: 2, title: "Do 10 pushups", done: false },
    { id: 3, title: "Recycle something", done: true },
  ]);

  const handleLogin = () => {
    if (username.trim() !== '') {
      setIsLoggedIn(true);
    }
  };

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  return (
    <ImageBackground
      source={require('./assets/forest-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.appContainer}>
          <Image
            source={require('./assets/goon-foresters-icon.png')}
            style={styles.logo}
          />

          {!isLoggedIn ? (
            <View style={styles.loginContainer}>
              <Text style={styles.header}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <Button title="Login" onPress={handleLogin} />
            </View>
          ) : (
            <View style={styles.homeContainer}>
              <Text style={styles.title}>Welcome, {username}!</Text>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🌱 Tree Growth Progress</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text>{progress}% grown</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 Daily Tasks</Text>
                {tasks.map((task) => (
                  <View key={task.id} style={styles.taskItem}>
                    <CheckBox
                      value={task.done}
                      onValueChange={() => toggleTask(task.id)}
                    />
                    <Text style={task.done ? styles.taskDone : styles.taskText}>
                      {task.title}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>👤 Profile</Text>
                <Text>Username: {username}</Text>
                <Text>
                  Tree Stage:{' '}
                  {progress < 30 ? 'Seedling' : progress < 70 ? 'Growing' : 'Bloomed'}
                </Text>
              </View>
            </View>
          )}

          <Text style={styles.footer}>© 2025 Goon-Foresters</Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#e0f2f1',
  },
  appContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
  },
  loginContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2e7d32',
  },
  homeContainer: {
    width: '100%',
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1b5e20',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#388e3c',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#c8e6c9',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
  },
  taskDone: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#2e7d32',
  },
});

export default App;
