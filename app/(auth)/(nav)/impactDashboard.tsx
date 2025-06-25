import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ImpactDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Daily');
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState('2 June – 8 June (Week 23)');

  const data = [150, 250, 270, 100, 80, 180, 190];
  const maxBarHeight = 120;
  const maxValue = Math.max(...data);
  const step = Math.ceil(maxValue / 3 / 10) * 10;
  const yAxisLabels = [step * 3, step * 2, step, 0];
  const average = Math.round(data.reduce((sum, val) => sum + val, 0) / data.length);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(auth)/(nav)/home')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.tabBarWrapper}>
          <View style={styles.tabBar}>
            {['Daily', 'Weekly', 'Monthly'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text
                  style={
                    activeTab === tab
                      ? styles.activeTabText
                      : styles.inactiveTabText
                  }
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
  
        <View style={styles.chartBox}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>{average}g</Text>
            <Text style={styles.chartSubtitle}>
              Daily average reduction in carbon footprint
            </Text>
          </View>

          <View style={styles.chartContent}>
            <View style={styles.yAxisWrapper}>
              {yAxisLabels.map((label, idx) => (
                <View key={idx} style={styles.yAxisRow}>
                  <Text style={styles.yAxisLabel}>{label}g</Text>
                  <View style={styles.yAxisDivider} />
                </View>
              ))}
            </View>

            <View style={styles.barChart}>

              {data.map((val, i) => {
                const height = (val / (step * 3)) * maxBarHeight;
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.barContainer}
                    onPress={() =>
                      setSelectedBar(i === selectedBar ? null : i)
                    }
                  >
                    <View style={[styles.bar, { height }]} />
                    {selectedBar === i && (
                      <Text style={styles.barValue}>{val}g</Text>
                    )}
                    <Text style={styles.dayLabel}>{days[i]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {
          //impact cards placeholder
        }

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              If you keep your sustainable habits up for a year, you would save
              the carbon footprint equivalent of driving over
              <Text style={styles.highlight}> 1200km</Text>
            </Text>
            <MaterialCommunityIcons
              name="recycle"
              size={32}
              color="#22c55e"
              style={styles.cardIcon}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardText}>
              Saving 200g of carbon footprint daily adds up to 182KWH of
              electricity a year{"\n"}
              <Text style={styles.highlightGreen}>
                Enough energy to power your laptop for 125 days
              </Text>
            </Text>
            <Entypo
              name="light-bulb"
              size={32}
              color="#facc15"
              style={styles.cardIcon}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1bbc65', paddingTop: 50 },
  scroll: { paddingBottom: 100, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBarWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#1bbc65',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#000',
  },
  dateInput: {
    marginHorizontal: 20,
    marginTop: 10,
    color: '#1bbc65',
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
  },
  chartBox: {
    backgroundColor: '#fff',
    margin: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    position: 'relative',
  },
  chartHeader: {
    marginBottom: 40,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  chartContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  yAxisWrapper: {
    justifyContent: 'space-between',
    height: 160,
    paddingRight: 5,
    marginBottom: 9,
  },
  yAxisRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    height: 30,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#6b7280',
    width: 30,
    textAlign: 'right',
    marginLeft: 5,
  },
  yAxisDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginRight: 4,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    flex: 1,
    position: 'relative',
  },
  redLine: { //Keeping this here because i want to implement this but i wasnt able to get it write in the actual code
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: 'red',
    borderStyle: 'dotted',
  },
  barContainer: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  bar: {
    width: 14,
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  dayLabel: {
    marginTop: 5,
    fontWeight: '600',
  },
  barValue: {
    position: 'absolute',
    top: -20,
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    position: 'relative',
  },
  cardText: {
    fontSize: 14,
    color: '#111827',
  },
  cardIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  highlight: {
    color: '#1bbc65',
    fontWeight: '700',
  },
  highlightGreen: {
    color: '#22c55e',
    fontWeight: '600',
  },
});