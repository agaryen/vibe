import React from 'react';
import tw from 'twrnc';
import { Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Button from 'vibe/components/Button';
import TextInput from 'vibe/components/TextInput';
import useHttpQuery from 'vibe/modules/hooks/useHttpQuery';

const DailyStatus = ({ setIsAuthenticated }) => {
  useHttpQuery({
    url: '/daily_statuses',
    onFailure: ({ status }) => {
      if (status === 401) setIsAuthenticated(false);
    },
  });

  return <></>;
};

export default DailyStatus;
