import React from 'react';
import tw from 'twrnc';
import { Text, View, SafeAreaView } from 'react-native';
import Button from 'vibe/components/Button';

const Authentication = ({ navigation }) => (
  <SafeAreaView style={tw`flex-1 my-6`}>
    <View style={tw`flex h-full w-full px-8 justify-between items-center`}>
      <Text style={tw`my-auto text-7xl font-bold`}>Vibe</Text>
      <View style={tw`flex w-full items-center`}>
        <Button style={tw`mb-8 w-full`} onPress={() => navigation.navigate('Login')}>
          Login
        </Button>
        <Button style={tw`w-full`} onPress={() => navigation.navigate('Registration')}>
          Register
        </Button>
      </View>
    </View>
  </SafeAreaView>
);

export default Authentication;
