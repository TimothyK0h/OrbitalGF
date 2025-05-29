import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';

const regionData = {
  Central: {
    locations: ['Botanic Gardens', 'Fort Canning Park'],
    image: require('../assets/sg-central.png'),
  },
  Southwest: {
    locations: ['West Coast Park', 'Labrador Nature Reserve'],
    image: require('../assets/sg-southwest.png'),
  },
  Northwest: {
    locations: ['Woodlands Park', 'Sembawang Park'],
    image: require('../assets/sg-northwest.png'),
  },
  Northeast: {
    locations: ['Punggol Waterway Park', 'Coney Island'],
    image: require('../assets/sg-northeast.png'),
  },
  East: {
    locations: ['East Coast Park', 'Pasir Ris Park'],
    image: require('../assets/sg-east.png'),
  },
};

const PlantScreen = ({ progress }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionPress = (region) => {
    if (progress < 100) {
      Alert.alert('Locked', 'You must complete your tree to unlock planting!');
      return;
    }
    setSelectedRegion(region);
  };

  const displayedMap = selectedRegion
    ? regionData[selectedRegion].image
    : require('../assets/sg-map.png');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Where will you plant your tree?</Text>

      <View style={styles.regionContainer}>
        {Object.keys(regionData).map((region) => (
          <TouchableOpacity
            key={region}
            style={styles.regionButton}
            onPress={() => handleRegionPress(region)}
          >
            <Text style={styles.regionText}>{region}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Image source={displayedMap} style={styles.sgMap} resizeMode="contain" />

      {selectedRegion && (
        <View style={styles.selectedRegionContainer}>
          <Text style={styles.subtitle}>{selectedRegion} Locations:</Text>
          {regionData[selectedRegion].locations.map((loc, idx) => (
            <Text key={idx} style={styles.locationText}>• {loc}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default PlantScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F0F8F0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  regionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  regionButton: {
    backgroundColor: '#A8D5BA',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5,
  },
  regionText: {
    fontSize: 16,
    color: '#fff',
  },
  sgMap: {
    width: '100%',
    height: 250,
    marginVertical: 10,
  },
  selectedRegionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
  },
});
