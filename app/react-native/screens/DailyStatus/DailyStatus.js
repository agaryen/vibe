import React, { useEffect } from 'react';
import tw from 'twrnc';
import { Text, View, SafeAreaView } from 'react-native';
import Button from 'vibe/components/Button';
import useHttpQuery from 'vibe/modules/hooks/useHttpQuery';

const choicesOfAnswer = {
  NO: "I won't be present",
  MAYBE: "Meh. I'll be there if my buddies are there",
  YES: "I'll be there for sure",
};

const DailyStatus = ({ setIsAuthenticated }) => {
  const {
    loading,
    data: { answer } = {},
    triggerQuery: triggerFetch,
  } = useHttpQuery({
    url: '/daily_statuses',
    onFailure: ({ status }) => {
      if (status === 401) setIsAuthenticated(false);
    },
    trigger: true,
  });
  const { triggerQuery: triggerAnswer } = useHttpQuery({
    url: '/daily_statuses',
    method: 'POST',
    trigger: true,
    onSuccess: () => triggerFetch(),
  });

  const chooseAnswer = (choice) => {
    triggerAnswer({
      body: {
        daily_status: {
          answer: choice,
        },
      },
    });
  };

  useEffect(() => {
    triggerFetch();
  }, []);

  if (loading) return null;
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex h-full w-full px-8 justify-between items-center`}>
        <Text style={tw`text-5xl text-center font-bold mt-8`}>Welcome</Text>
        <View style={tw`w-full`}>
          <Text style={tw`text-2xl font-bold mb-8`}>{"What's your office status tomorrow?"}</Text>
          {answer === null ? (
            <>
              <Button uiStyle="danger" style={tw`mb-8`} onPress={() => chooseAnswer('NO')}>
                {choicesOfAnswer.NO}
              </Button>
              <Button uiStyle="warning" style={tw`mb-8`} onPress={() => chooseAnswer('MAYBE')}>
                {choicesOfAnswer.MAYBE}
              </Button>
              <Button uiStyle="success" onPress={() => chooseAnswer('YES')}>
                {choicesOfAnswer.YES}
              </Button>
            </>
          ) : (
            <Text style={tw`text-xl mb-40`}>{`You answered "${choicesOfAnswer[answer]}"`}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DailyStatus;
