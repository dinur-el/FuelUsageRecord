
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { styles } from '../styles/styles';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from '@firebase/util';

const CreateListScreen = (props) => {
    const navigation = useNavigation()
    const [enteredAmount, setAmount] = useState();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Petrol', value: 'Petrol' },
        { label: 'Diesel', value: 'Diesel' },
        { label: 'Battery Charge', value: 'BatteryCharge' }
    ]);

    const amountInputHandler = (value) => {
        setAmount(value);
    }

    const saveItemHandler = async () => {
        let price = await calculateFuelPrice();

        props.onSaveItem(value, enteredAmount, price);
        setAmount("");
        setValue(null);
        setOpen(false);
        successAlert();
    }

    const calculateFuelPrice = async () => {
        let fuelStore = await AsyncStorage.getItem('fuel_store');
        fuelStore = JSON.parse(fuelStore);

        if (value == 'BatteryCharge') {
            return enteredAmount * fuelStore[value].pricePerUnit
        } else {
            return enteredAmount * fuelStore[value].pricePerLiter
        }

    }

    const successAlert = () => {
        Alert.alert(
            'SUCCESS',
            'Fuel List created Successfully',
            [
                {
                    text: 'OK',
                    onPress: () => props.navigation.navigate('Home')
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Fuel Type"
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter Litres / charge unit here"
                        style={styles.input}
                        onChangeText={amountInputHandler}
                        value={enteredAmount} />
                </View>
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={saveItemHandler}
                >
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}

export default CreateListScreen