import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View , StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import Init from './src/screens/init/Init.jsx';
import Cadastro from './src/screens/cadastro/Cadastro.jsx'
import Login from './src/screens/login/Login.jsx';
import Home from './src/screens/Home/Home.jsx';
import Endereco from './src/screens/cadastro/Endereco.jsx';


const Stack = createStackNavigator();
const ScreenContainer = ({ children }) => {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#e9e9e9' }}>
      {children}
    </View>
  );
};

export default function App() {
  return (
    <View>
      <StatusBar
        backgroundColor="#B100FF"
        barStyle={Platform.OS === 'android' ? 'white-content' : 'default'}
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Init'
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Init">
            {() => (
              <ScreenContainer>
                <Init/>
              </ScreenContainer>
            )}
          </Stack.Screen>

          <Stack.Screen name="Cadastro">
            {() => (
              <ScreenContainer>
                <Cadastro/>
              </ScreenContainer>
            )}
          </Stack.Screen>

          <Stack.Screen name="Endereco">
            {() => (
              <ScreenContainer>
                <Endereco/>
              </ScreenContainer>
            )}
          </Stack.Screen>

          <Stack.Screen name="Login">
            {() => (
              <ScreenContainer>
                <Login/>
              </ScreenContainer>
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Home">
            {() => (
              <ScreenContainer>
                <Home/>
              </ScreenContainer>
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}
