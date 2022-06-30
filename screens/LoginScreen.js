import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { styles } from '../styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import fuelUsageData from '../contexts/FuelUsageContext'


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const fuelStore = {
    Petrol:{fuelType: "Petrol", pricePerLiter: 30},
    Diesel:{fuelType: "Diesel", pricePerLiter: 40},
    BatteryCharge:{fuelType: "BatteryCharge", pricePerUnit: 10},
  }
  const userMaxAllowance = 300

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        saveInitialConfig();
        navigation.replace("Home")
      }
    })

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Registered user with email:", user.email);
      })
      .catch(error => alert(error.message));
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  }

  const saveInitialConfig = async () => {
    try {

      await AsyncStorage.setItem('fuel_store', JSON.stringify(fuelStore));
      await AsyncStorage.setItem('user_max_allowance', JSON.stringify(userMaxAllowance));
      await AsyncStorage.setItem('user_allowance', JSON.stringify(userMaxAllowance));

      return userMaxAllowance;

    } catch (ex) {
      console.error(ex);
    }
  }

  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    // </fuelUsageData.Provider>
  )
}

export { LoginScreen, fuelUsageData }

