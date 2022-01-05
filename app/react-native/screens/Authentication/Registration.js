import React, { useState } from 'react';
import tw from 'twrnc';
import { Text, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Button from 'vibe/components/Button';
import TextInput from 'vibe/components/TextInput';
import useHttpQuery from 'vibe/modules/hooks/useHttpQuery';

const Registration = ({ setIsAuthenticated }) => {
  const [formState, setFormState] = useState({});

  const { triggerQuery } = useHttpQuery({
    url: '/users',
    method: 'POST',
    body: { user: { ...formState, commit: 'Sign up' } },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    trigger: true,
  });

  return (
    <SafeAreaView style={tw`my-6 flex-1`}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={tw`h-full w-full flex items-center`}>
          <Text style={tw`text-5xl text-center font-bold mt-8`}>Login</Text>
          <View style={tw`flex justify-end w-full flex-1 px-8`}>
            <View style={tw`w-full my-auto`}>
              <TextInput
                keyboardType="email-address"
                textContentType="emailAddress"
                label="Email"
                style={tw`w-full mb-6`}
                value={formState.email}
                onChangeText={(email) => setFormState((state) => ({ ...state, email }))}
              />
              <TextInput
                textContentType="password"
                secureTextEntry
                label="Password"
                style={tw`w-full mb-6`}
                value={formState.password}
                onChangeText={(password) => setFormState((state) => ({ ...state, password }))}
              />
              <TextInput
                textContentType="password"
                secureTextEntry
                label="Password confirmation"
                style={tw`w-full`}
                value={formState.password_confirmation}
                onChangeText={(password_confirmation) => setFormState((state) => ({ ...state, password_confirmation }))}
              />
            </View>
            <Button style={tw`w-full`} onPress={() => triggerQuery()}>
              Register
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Registration;
