import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../styles/styles';

const FuelListItem = props => {
    return (
        <View style={styles.listItem}>
            <Text>Fuel Type: {props.item.type}</Text>
            <Text>Fuel Used: {props.item.amount}</Text>
            <Text>Price: {props.item.price}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderRadius: 10, }}>
                <TouchableOpacity style={styles.rmvBtn} activeOpacity={0.8} onPress={props.onSelect.bind(this, props.id)}>
                    <Text style={{ marginLeft: 'auto', color: 'white', padding:10 }}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default FuelListItem;