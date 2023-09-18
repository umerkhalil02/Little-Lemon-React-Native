import React from "react";
import { useState, } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Alert, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from 'expo-checkbox';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const LogOut = async (navigation) => {
    try {
        await AsyncStorage.clear()
        navigation.navigate('Onboarding')
    } catch (e) {
        Alert.alert("Couldn't load data", e.message);
    }
    ToastAndroid.show('Logged Out!', ToastAndroid.SHORT);
}

const SaveChanges = async (fname, lname, email, phone) => {
    try {
        await AsyncStorage.clear()
        await AsyncStorage.multiSet([['fname', fname], ['lname', lname], ['email', email], ['phone', phone]])
    } catch (e) {
        Alert.alert("Couldn't store data", e.message);
    }
    ToastAndroid.show('Credentials updated!', ToastAndroid.SHORT);
}

function Profile({ navigation }) {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(true)
    const [order_status, setOrderStatus] = useState(false)
    const [password_changes, setPassChanges] = useState(false)
    const [special_offers, setSpecialOffer] = useState(false)
    const [newsletter, setNewsletter] = useState(false)
    var updated = ['', '', '', '']

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                try {
                    await AsyncStorage.getAllKeys().then(async keys => {
                        await AsyncStorage.multiGet(keys).then(key => {
                            let x = []
                            key.forEach(data => {
                                if (data[0] == 'email') {
                                    setEmail(data[1])
                                }
                                else if (data[0] == 'fname') {
                                    setFname(data[1])
                                }
                                else if (data[0] == 'lname') {
                                    setLname(data[1])
                                }
                                else if (data[0] == 'phone') {
                                    setPhone(data[1])
                                }
                                console.log(data[1]); //values
                            });
                            setLoading(false)
                        });
                    });
                } catch (error) {
                    Alert.alert("Couldn't load data", error);
                }
            })();
        }, [loading])
    );

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#495e57' }}>
            {!loading && <SafeAreaView style={{ flex: 1 }}>
                <TextInput
                    mode="outlined"
                    placeholder="Enter First Name"
                    label="First Name * "
                    activeOutlineColor="#495e57"
                    value={fname}
                    style={styles.fname}
                    onChangeText={(value) => { setFname(value) }}
                />
                <TextInput
                    mode="outlined"
                    placeholder="Enter Last Name "
                    label="Last Name * "
                    value={lname}
                    activeOutlineColor="#495e57"
                    style={styles.lname}
                    onChangeText={(value) => { setLname(value) }}
                />
                <TextInput
                    mode="outlined"
                    placeholder="Enter Email Address"
                    label="Email Address * "
                    value={email}
                    activeOutlineColor="#495e57"
                    style={styles.input}
                    onChangeText={(value) => { setEmail(value) }}
                />
                <TextInput
                    mode="outlined"
                    placeholder="Enter Phone Number"
                    label="Phone Number * "
                    value={phone}
                    activeOutlineColor="#495e57"
                    style={styles.input}
                    onChangeText={(value) => { setPhone(value) }}
                />
                <Text style={styles.heading}>
                    Email Notifications
                </Text>
                <View style={styles.section}>
                    <Checkbox
                        style={styles.checkbox}
                        value={order_status}
                        onValueChange={(value) => { setOrderStatus(value) }}
                        color={true ? '#495e57' : 'yellow'}
                    />
                    <Text style={styles.paragraph}>Order Statuses</Text>
                </View>
                <View style={styles.section}>
                    <Checkbox
                        style={styles.checkbox}
                        value={password_changes}
                        onValueChange={(value) => { setPassChanges(value) }}
                        color={true ? '#495e57' : 'yellow'}
                    />
                    <Text style={styles.paragraph}>Password Changes</Text>
                </View>
                <View style={styles.section}>
                    <Checkbox
                        style={styles.checkbox}
                        value={special_offers}
                        onValueChange={(value) => { setSpecialOffer(value) }}
                        color={true ? '#495e57' : 'yellow'}
                    />
                    <Text style={styles.paragraph}>Special Offers</Text>
                </View>
                <View style={styles.section}>
                    <Checkbox
                        style={styles.checkbox}
                        value={newsletter}
                        onValueChange={(value) => { setNewsletter(value) }}
                        color={true ? '#495e57' : 'yellow'}
                    />
                    <Text style={styles.paragraph}>Newsletter</Text>
                </View>

                <Button mode="contained" textColor="black" buttonColor="#f9d112" style={{ margin: 10, }} onPress={() => { LogOut(navigation) }} >
                    Log Out
                </Button>
                <Button mode="contained" textColor="white" buttonColor="#495e57" style={{ marginTop: 10, marginLeft: 40, marginRight: 40 }} onPress={() => { SaveChanges(fname, lname, email, phone) }} >
                    Save Changes
                </Button>
            </SafeAreaView>}
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: "#495e57",
        marginBottom: 10
    },
    heading: {
        color: 'black',
        fontSize: 30,
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
        margin: 10
    },
    lname: {
        margin: 10
    },
    input: {
        margin: 10
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 18,
    },
    checkbox: {
        margin: 10
    }
});
export default Profile;