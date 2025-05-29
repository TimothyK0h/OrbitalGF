import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TreeProgress from './TreeProgress';
import PlantScreen from './PlantScreen';
import BadgesScreen from './BadgesScreen';

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('window');

function Tab1() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.tabText}>🌱 Task Tracker</Text>
    </View>
  );
}

function Tab2({ score }) {
  return (
    <View style={styles.tabContent}>
      <TreeProgress score={score} />
    </View>
  );
}

function Tab3() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.tabText}>🌼 Settings</Text>
    </View>
  );
}

export default function HomeTabs({ score, completedTasks }) {
  return (
    <ImageBackground
      source={require('../assets/forest-bg.jpg')}
      style={styles.background}
      resizeMode="cover">
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'rgba(255,255,255,0.3)',
            elevation: 0,
          },
          swipeEnabled: true,
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#1B5E20',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#2e7d32',
          },
        }}
      >
        <Tab.Screen name="Badges">{() => <BadgesScreen progress={score} tasksCompleted={completedTasks  } />}</Tab.Screen>
        <Tab.Screen name="Progress">{() => <Tab2 score={score} />}</Tab.Screen>
        <Tab.Screen name="Plant" component={PlantScreen} />
      </Tab.Navigator>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  tabContent: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)', // transparent layer over background
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
  },
});
