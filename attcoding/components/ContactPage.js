import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permissão de localização é necessária para agendar a entrevista.');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setName('Nome da Empresa');
        setEmail('email@recrutador.com');
        setPhone('(00) 0000-0000');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Nome da Empresa:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email do Recrutador:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Telefone para Contato:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>
        <MapView
          style={styles.map}
          initialRegion={location}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Localização da Empresa"
          />
        </MapView>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
  map: {
    height: 200,
    marginVertical: 10,
  },
});