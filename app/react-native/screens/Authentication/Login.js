import React, { useState } from 'react';
import tw from 'twrnc'
import { Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Button from 'vibe/components/Button'
import TextInput from 'vibe/components/TextInput'
import useHttpQuery from 'vibe/modules/hooks/useHttpQuery'

const Login = ({ setIsAuthenticated }) => {
  const [formState, setFormState] = useState({})
  
  const { triggerQuery } = useHttpQuery({
    url: '/users/sign_in',
    method: 'POST',
    body: { user: { ...formState, remember_me: 1, commit: 'Log in' } },
    onSuccess: ({ data }) => {
      setIsAuthenticated(true)
    },
    trigger: true,
  })

  return (
  <SafeAreaView style={tw`flex-1`}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View style={tw`h-full w-full flex items-center`}>
      <Text style={tw`text-5xl text-center font-bold mt-8`}>Login</Text>
      <View style={tw`flex justify-end w-full flex-1 px-8`}>
        <View style={tw`w-full my-auto`}>
          <TextInput keyboardType="email-address" textContentType="emailAddress" label="Email" style={tw`w-full mb-8`} value={formState.email} onChangeText={(email) => setFormState((state) => ({ ...state, email }))} />
          <TextInput textContentType="password" secureTextEntry label="Password" style={tw`w-full`} value={formState.password} onChangeText={(password) => setFormState((state) => ({ ...state, password }))} />
        </View>
        <Button style={tw`w-full`} onPress={() => triggerQuery()}>Login</Button>
      </View>
    </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
};

export default Login;
