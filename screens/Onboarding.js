import React from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Alert, } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const storeData = async (navigation, fname, lname, email, phone) => {
    try {
        await AsyncStorage.multiSet([['fname', fname], ['lname', lname], ['email', email], ['phone', phone]])
        navigation.navigate('SignedIn', { screen: 'Home' });
    } catch (e) {
        Alert.alert("ERROR", e.message)
    }
}

function Onboarding({ navigation }) {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    return (
        <KeyboardAwareScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 35, marginBottom: 5 }}>
                    <Image
                        style={{ width: 50, height: 50, }}
                        source={require('../assets/little-lemon-logo.png')} /><Text style={{ color: 'black', fontWeight: 'bold', verticalAlign: 'middle' }}>
                        LITTLE LEMON
                    </Text>
                </View>
                <View
                    style={styles.conatiner} >
                    <Text style={styles.heading} >
                        Little Lemon
                    </Text>
                    <View style={styles.subcontainer} >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.subheading} >
                                Chicago
                            </Text>
                            <Text style={styles.description} >
                                We are a family owned Mediterranean restaurant,
                                focused on traditional recipes served with a modern twist.
                            </Text>
                        </View>
                        <Image source={require('../assets/src1.png')} style={styles.image} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter First Name"
                        label="First Name * "
                        activeOutlineColor="#495e57"
                        style={styles.fname}
                        onChangeText={(value) => { setFname(value.trim()) }}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Last Name "
                        label="Last Name * "
                        activeOutlineColor="#495e57"
                        style={styles.lname}
                        onChangeText={(value) => { setLname(value.trim()) }}
                    />
                </View>
                <TextInput
                    mode="outlined"
                    placeholder="Enter Email Address"
                    label="Email Address * "
                    activeOutlineColor="#495e57"
                    style={styles.input}
                    onChangeText={(value) => { setEmail(value.trim()) }}
                />
                <TextInput
                    mode="outlined"
                    placeholder="Enter Phone Number"
                    label="Phone Number * "
                    activeOutlineColor="#495e57"
                    style={styles.input}
                    onChangeText={(value) => { setPhone(value.trim()) }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Button disabled={!fname || !lname || !email || !phone}
                        mode="contained"
                        buttonColor="#f9d112"
                        style={styles.button}
                        onPress={() => { storeData(navigation, fname, lname, email, phone) }}
                    >
                        Next
                    </Button>
                </View>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: "#495e57",
        marginBottom: 10
    },
    heading: {
        color: '#f9d112',
        fontSize: 40,
        paddingLeft: 10,
        paddingTop: 10
    },
    subheading: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 10
    },
    subcontainer: {
        flexDirection: 'row'
    },
    description: {
        color: 'white',
        margin: 10
    },
    image: {
        width: width * .4,
        height: height * .2,
        margin: 10,
        flex: 1,
        borderRadius: 20
    },
    fname: {
        width: width * .45,
        marginLeft: 10
    },
    lname: {
        width: width * .45,
        marginRight: 10
    },
    input: {
        margin: 10
    },
    button: {
        width: width * .4,
        marginTop: 10
    }
});
export default Onboarding;