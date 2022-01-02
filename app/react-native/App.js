import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from 'vibe/screens/Authentication/Authentication'
import Registration from 'vibe/screens/Authentication/Registration'
import Login from 'vibe/screens/Authentication/Login'

const websiteUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.1.10:3000' : 'http://vibe.com';

const AuthenticationStack = createStackNavigator();

const AuthenticationRoutes = () => (
    <AuthenticationStack.Navigator
      initialRouteName="Authentication"
      screenOptions={{
        title: '',
        headerShown: true,
        headerBackTitle: ' Back',
      }}
    >
      <AuthenticationStack.Screen name="Authentication" options={{ headerShown: false }} component={Authentication} />
      <AuthenticationStack.Screen name="Registration" component={Registration} />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
  <NavigationContainer>
    {isAuthenticated ? <></> : <AuthenticationRoutes />}
  </NavigationContainer>
  );
}

export default App;
