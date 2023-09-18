import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Header from "../components/Header";
import CustomDrawer from "./CustomDrawer";

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => <CustomDrawer{...props} />}
            screenOptions={{ drawerActiveBackgroundColor: "#f9d112", drawerActiveTintColor: "#495e57" }}
        >
            <Drawer.Screen
                component={Home}
                name='Home'
                options={{
                    headerTitleAlign: "center",
                    headerTitle: (props) => <Header {...props} />,
                    drawerIcon: () => (
                        <Ionicons name="home" size={24} color="#495e57" />
                    )
                }} />
            <Drawer.Screen
                component={Profile}
                name='Profile'
                options={{
                    headerTitleAlign: "center",
                    headerTitle: (props) => <Header {...props} />,
                    drawerIcon: () => (
                        <Ionicons name="person" size={24} color="#495e57" />
                    )
                }} />
        </Drawer.Navigator>
    )
};
export default DrawerNavigator;