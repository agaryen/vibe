import React from 'react';
import { Text, TextInput as NativeTextInput, View } from 'react-native';
import tw from 'twrnc';

const Label = ({ children }) => <Text style={tw`text-gray-700 text-base font-bold mb-1`}>{children}</Text>;

const TextInput = ({ style, label, ...props }) => (
  <View style={style}>
    {label && <Label>{label}</Label>}
    <NativeTextInput
      style={tw`border border-gray-300 rounded w-full py-3 px-3 text-gray-700 bg-white`}
      {...props}
    />
  </View>
);

export default TextInput;
