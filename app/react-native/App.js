import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from 'vibe/screens/Authentication/Authentication';
import Registration from 'vibe/screens/Authentication/Registration';
import Login from 'vibe/screens/Authentication/Login';
import DailyStatus from 'vibe/screens/DailyStatus/DailyStatus';

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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <DailyStatus setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <AuthenticationRoutes setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
};

export default App;
