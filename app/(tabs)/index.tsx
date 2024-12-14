import React, { createContext, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignUpForm from './SignUp';
import LoginForm from './Login';

// Create a Context for Navigation
const ScreenContext = createContext<any>(null);

const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  return (
    <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};

const useScreen = () => useContext(ScreenContext);

const HomeScreen = () => {
  const { setCurrentScreen } = useScreen();

  return (
    <LinearGradient colors={['#8B0000', '#000000','#000000','#000000','#000000', '#000000' ,'#8B0000']} style={styles.container}>
      <Text style={styles.title}>FormFlow</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentScreen('SignUp')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} /> {/* Gap between buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentScreen('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const App = () => {
  const { currentScreen } = useScreen();

  let ScreenComponent;
  if (currentScreen === 'SignUp') ScreenComponent = SignUpForm;
  else if (currentScreen === 'Login') ScreenComponent = LoginForm;
  else ScreenComponent = HomeScreen;

  return (
    <View style={styles.container}>
      <ScreenComponent />
    </View>
  );
};

export default () => (
  <ScreenProvider>
    <App />
  </ScreenProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white', // Title text color
    marginBottom: 40,
    elevation: 8, // Shadow depth (higher values for stronger shadows)
  },
  buttonContainer: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#8B0000', // Dark Red background
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20, // Adds rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Adds shadow for Android
  },
  buttonText: {
    color: 'white', // Button text color
    fontWeight: 'bold',
    fontSize: 16,
  },
});
