import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Authentication from 'vibe/screens/Authentication/Authentication';
import Registration from 'vibe/screens/Authentication/Registration';
import Login from 'vibe/screens/Authentication/Login';
import DailyStatus from 'vibe/screens/DailyStatus/DailyStatus';
import Buddies from 'vibe/screens/DailyStatus/Buddies';

const AuthenticationStack = createStackNavigator();

const AuthenticationRoutes = ({ setIsAuthenticated }) => (
  <AuthenticationStack.Navigator
    initialRouteName="Authentication"
    screenOptions={{
      title: '',
      headerShown: true,
      headerBackTitle: ' Back',
    }}
  >
    <AuthenticationStack.Screen name="Authentication" options={{ headerShown: false }} component={Authentication} />
    <AuthenticationStack.Screen name="Registration">
      {(props) => <Registration setIsAuthenticated={setIsAuthenticated} {...props} />}
    </AuthenticationStack.Screen>
    <AuthenticationStack.Screen name="Login">
      {(props) => <Login setIsAuthenticated={setIsAuthenticated} {...props} />}
    </AuthenticationStack.Screen>
  </AuthenticationStack.Navigator>
);

const Tab = createBottomTabNavigator();
const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Tomorrow') {
          iconName = 'calendar-outline';
        } else if (route.name === 'Buddies') {
          iconName = 'people-circle';
        }

        return <Ionicons name={iconName} size={size} color={color} focused={focused} />;
      },
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Tomorrow" component={DailyStatus} />
    <Tab.Screen name="Buddies" component={Buddies} />
  </Tab.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <NavigationContainer>
      {isAuthenticated ? <Tabs /> : <AuthenticationRoutes setIsAuthenticated={setIsAuthenticated} />}
    </NavigationContainer>
  );
};

export default App;
