import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Componentes de tela
import HomePage from './HomePage';
import ContactPage from './ContactPage';

// Componente de barra de navegação
const NavigationBar = ({ navigation }) => {
  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleContactPress = () => {
    navigation.navigate('Contact');
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
        <Text style={styles.navButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={handleContactPress}>
        <Text style={styles.navButtonText}>Contate-me</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente principal
const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Contact" component={ContactPage} />
      </Stack.Navigator>
      <NavigationBar navigation={navigation} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;