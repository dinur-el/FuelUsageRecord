
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FuelListItem from '../components/FuelListItem';
import {fuelUsageData} from './LoginScreen'

const HomeScreen = (props) => {
  const navigation = useNavigation()
  const [fuelList, setFuelList] = useState([]);
  const handleSignOut = () => {
    signOut(auth).then(async () => {
      props.navigation.navigate('Login')
    })
  }

  const saveFuelListHandler = (fuelType, fuelUsed, price) => {
    setFuelList(fuelList => [...fuelList, { key: Math.random().toString(), value: { type: fuelType, amount: fuelUsed, price: price } }]);
  }

  const updateFuelListHandler = (fuelListId) => {
    let index = fuelList.findIndex((key) => key !== fuelListId);
    fuelList.splice(index, 1);
    setFuelList(fuelList => [...fuelList]);
}

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate(
          'CreateListScreen',
          {
            onSaveItem: saveFuelListHandler,
          })}
      >
        <Text style={styles.buttonText}>Create List</Text>
      </TouchableOpacity>
      <Text>User Allowance Remaining:  {'300'}</Text>
      <FlatList style={styles.flatList}
        data={fuelList}
        renderItem={
          (itemData) => (
            <FuelListItem
              id={itemData.item.key}
              onSelect={() => updateFuelListHandler(itemData.item.key)}
              item={itemData.item.value}
            />
          )
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen