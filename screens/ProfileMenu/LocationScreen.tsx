import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

interface LocationData {
  branchID: number;
  name: string;
  address: string;
  image: string;
  phone: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const LocationScreen = () => {
  const url = 'http://10.0.2.2:5003/api/data';

  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Fetch branch data from the server
  const fetchData = async() => {
    try {
      const response = await fetch(url);          //default - GET
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setLocationData(result.branches); // Adjust this based on your response structure
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderBranch = ({ item }: { item: LocationData }) => (
    <View style={styles.branchContainer}>
      <View style={{flexDirection: 'row',justifyContent: 'space-between' }}>
        <View style={{width: 175}}>
          <Text style={styles.branchName}>{item.name}</Text>
          <Text style={styles.branchInfo}>{item.address}</Text>
          <Text style={styles.branchInfo}>{item.phone}</Text>
          <Text style={styles.branchServices}>Services: </Text>
          <Text style={styles.branchServices}>{item.services.map(service => service.charAt(0).toUpperCase() + service.slice(1)).join(', ')}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.branchImage} />
        </View>
      </View>
      <Text style={styles.branchHoursHeader}>Hours:</Text>
      {Object.entries(item.hours).map(([day, hours]) => (
        <View key={day} style={styles.hoursRow}>
          <Text key={day} style={styles.branchHoursDay}>
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Text>
          <Text style={styles.branchHoursTime}>{hours}</Text>
        </View>
      ))}  
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={locationData}
        renderItem={renderBranch}
        keyExtractor={(item) => item.branchID.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E5',
    padding: 16,
  },
  branchContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    justifyContent: 'center'
  },
  branchImage: {
    width: 120, 
    height: 120,
    borderRadius: 10, 
  },
  branchName: {
    fontSize: 18,
    fontFamily: 'Gantari-Bold',
    color: '#102C57'
  },
  branchInfo: {
    fontSize: 16,
    fontFamily: 'Gantari-Regular',
    color: '#666',
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  branchHoursHeader: {
    fontFamily: 'Gantari-Bold',
    fontSize: 16,
    marginVertical: 8,
  },
  branchHoursDay: {
    fontFamily: 'Gantari-Regular',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  branchHoursTime: {
    fontFamily: 'Gantari-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    flex: 1,
  },
  branchServices: {
    fontSize: 16,
    fontFamily: 'Gantari-Regular',
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LocationScreen;