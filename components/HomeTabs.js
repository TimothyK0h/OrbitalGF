import React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TreeProgress from './TreeProgress';


const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('window');

function Tab1() {
  return <View style={styles.tabContent}><Text>🌱 Task Tracker</Text></View>;
}

function Tab2() {
  const progress = 40; // Replace with actual progress later
  return (
    <View style={styles.tabContent}>
      <TreeProgress progress={progress} />
    </View>
  );
}


function Tab3() {
  return <View style={styles.tabContent}><Text>🌼 Settings</Text></View>;
}

export default function HomeTabs() {
  return (
    <ImageBackground
      source={require('../assets/forest-gif.gif')}
      style={styles.background}
      resizeMode="cover"
    >
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'rgba(255,255,255,0.3)' },
          swipeEnabled: true,
          tabBarLabelStyle: { fontWeight: 'bold', color: '#2e7d32' },
          tabBarIndicatorStyle: { backgroundColor: '#2e7d32' },
        }}
      >
        <Tab.Screen name="Tasks" component={Tab1} />
        <Tab.Screen name="Progress" component={Tab2} />
        <Tab.Screen name="Settings" component={Tab3} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
