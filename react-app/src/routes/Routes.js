import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import LogadoProvider from '../context/LogadoProvider.js';

import Init from './../screens/init/Init.jsx';
import Cadastro from './../screens/cadastro/Cadastro.jsx';
import Login from './../screens/login/Login.jsx';
import Home from './../screens/Home/Home.jsx';
import Endereco from './../screens/cadastro/Endereco.jsx';
import LoginCadastro from './../screens/cadastro/LoginCadastro.jsx';
import AuthContext from './../context/AuthContext.js';
import HeaderTab from './headerTab/HeaderTab.jsx';
import Perfil from './../screens/perfil/Perfil.jsx'

import Pedidos from '../screens/Pedidos/Pedidos.jsx';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import LogadoContext from '../context/LogadoContext.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MapaHeader = () => (
    <HeaderTab
        superText="Veja as opções"
        miniText="Selecione um receptor para doar"
    />
);

const PedidosHeader = () => (
    <HeaderTab
        superText="Doações"
        miniText="Olhe suas doações"
    />
);

const PerfilHeader = () => (
    <HeaderTab
        superText="Meu Perfil"
        miniText="Faça atualizações aqui"
    />
);

function HomeTabScreen() {

    return (
        <LogadoProvider>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#B100FF',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: [
                        {
                            display: 'flex',
                            height: 60,
                            paddingBottom: 10,
                            paddingTop: 10,
                        },
                    ],
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
                        header: () => <MapaHeader />,
                    }}
                />
                <Tab.Screen
                    name="Pedidos"
                    component={Pedidos}
                    options={{
                        tabBarLabel: 'Pedidos',
                        tabBarIcon: ({ color, size }) => (
                            <Octicons name="checklist" color={color} size={size} />
                        ),
                        header: () => <PedidosHeader />,
                    }}
                />
                <Tab.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="user" color={color} size={size} />
                        ),
                        header: () => <PerfilHeader />,
                    }}
                />
            </Tab.Navigator>
        </LogadoProvider>
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
    const { token, logout } = useContext(AuthContext);
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
                    <Stack.Screen name="Init">
                        {() => (
                            <ScreenContainer>
                                <Init />
                            </ScreenContainer>
                        )}
                    </Stack.Screen>
                    <Stack.Screen name="Cadastro">
                        {() => (
                            <ScreenContainer>
                                <Cadastro />
                            </ScreenContainer>
                        )}
                    </Stack.Screen>

                    <Stack.Screen name="Endereco">
                        {() => (
                            <ScreenContainer>
                                <Endereco />
                            </ScreenContainer>
                        )}
                    </Stack.Screen>

                    <Stack.Screen name="LoginCadastro">
                        {() => (
                            <ScreenContainer>
                                <LoginCadastro />
                            </ScreenContainer>
                        )}
                    </Stack.Screen>

                    <Stack.Screen name="Login">
                        {() => (
                            <ScreenContainer>
                                <Login />
                            </ScreenContainer>
                        )}
                    </Stack.Screen>

                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default Routes;
