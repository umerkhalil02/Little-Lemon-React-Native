import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView>
                <Image source={require('../assets/drawer_image.png')} style={styles.image} />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>

    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 200,
        height: 360,
        alignSelf: 'center',
        margin: 20
    }
})
export default CustomDrawer;