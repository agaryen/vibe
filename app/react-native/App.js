import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from 'vibe/screens/Authentication/Authentication'
import Registration from 'vibe/screens/Authentication/Registration'
import Login from 'vibe/screens/Authentication/Login'

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
      <AuthenticationStack.Screen name="Registration" >
        {(props) => <Registration setIsAuthenticated={setIsAuthenticated} {...props}/>}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="Login">
        {(props) => <Login setIsAuthenticated={setIsAuthenticated} {...props}/>}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  fetch('http://192.168.1.10:3000/daily_statuses', { method: 'POST' })
  return (
  <NavigationContainer>
    {isAuthenticated ? <></> : <AuthenticationRoutes setIsAuthenticated={setIsAuthenticated}/>}
  </NavigationContainer>
  );
}

export default App;
