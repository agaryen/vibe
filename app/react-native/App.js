import React from 'react'
import tw from 'twrnc'
import Button from 'vibe/components/Button'
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const websiteUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.1.10:3000' : 'http://vibe.com'

const App = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex h-full w-full px-8 justify-between items-center`}>
        <Text style={tw`my-auto text-7xl font-bold`}>Vibe</Text>
        <View style={tw`flex w-full items-center`}>
          <Button style={tw`mb-8 w-full`}>Login</Button>
          <Button style={tw`w-full`}>Register</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
