import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Image  } from 'react-native';

const width = Dimensions.get('window').width

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Image source = {require('../assets/drawer_image.png')} style = {styles.image} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'white'
    },
    image: {
        width: width * .6,
        height: width * 1.08,
    },
});
