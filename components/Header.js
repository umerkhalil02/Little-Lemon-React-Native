import React from 'react';
import { View, Image, Text } from 'react-native';

const Header = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Image
                style={{ width: 50, height: 50, }}
                source={require('../assets/little-lemon-logo.png')} />
            <Text style={{ color: 'black', fontWeight: 'bold', verticalAlign: 'middle' }}>
                LITTLE LEMON
            </Text>
        </View>

    );
};
export default Header;