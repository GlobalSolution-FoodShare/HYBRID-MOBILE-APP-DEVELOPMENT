import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Init from './../screens/init/Init.jsx';
import Cadastro from './../screens/cadastro/Cadastro.jsx';
import Login from './../screens/login/Login.jsx';
import Home from './../screens/Home/Home.jsx';
import Endereco from './../screens/cadastro/Endereco.jsx';
import LoginCadastro from './../screens/cadastro/LoginCadastro.jsx';
import AuthContext from './../context/AuthContext.js';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#B100FF',  // cor quando selecionado
                tabBarInactiveTintColor: 'gray',  // cor quando não selecionado
                tabBarStyle: [
                    {
                        display: 'flex',
                        height: 60
                    }
                ]
            }}
        >
            <Tab.Screen
                name="Mapa"
                component={Home}
                options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map-marker-alt" color={color} size={size} />
                    ),
                }}
            />


            <Tab.Screen
                name="Pedidos"
                component={''}
                options={{
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="checklist" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={''}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

const ScreenContainer = ({ children }) => {
    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: '#e9e9e9' }}>
            {children}
        </View>
    );
};

const Routes = () => {
    const { token } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {token ? (
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Home" component={HomeTabScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator
                    initialRouteName="Init"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Init" component={Init} />
                    <Stack.Screen name="Cadastro" component={Cadastro} />
                    <Stack.Screen name="Endereco" component={Endereco} />
                    <Stack.Screen name="LoginCadastro" component={LoginCadastro} />
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default Routes;
