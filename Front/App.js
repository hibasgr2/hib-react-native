// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from './Screens/CreateAccountScreen';
import LoginScreen from './Screens/LoginScreen';
import ClientInterface from './Screens/ClientInterface';
import ServiceDetailScreen from './Screens/ServiceDetailScreen';
import CategoryScreen from './Screens/CategoryScreen';
import CategoryDetailScreen from './Screens/CategoryDetailScreen';
import MenuScreen from './Screens/MenuScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AddServiceScreen from './Screens/AddServiceScreen';
import AdminScreen from './Screens/AdminScreen';
import AdminLoginScreen from './Screens/AdminLoginScreen';

const Stack = createStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccountScreen}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="ClientHome" 
          component={ClientInterface}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
        />
        <Stack.Screen 
          name="Categories" 
          component={CategoryScreen}
        />
        <Stack.Screen 
          name="CategoryDetail" 
          component={CategoryDetailScreen}
        />
        <Stack.Screen 
          name="ServiceDetail" 
          component={ServiceDetailScreen}
        />
        <Stack.Screen 
          name="AddService" 
          component={AddServiceScreen}
        />
        <Stack.Screen 
          name="AdminLogin" 
          component={AdminLoginScreen}
        />
        <Stack.Screen 
          name="Admin" 
          component={AdminScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}