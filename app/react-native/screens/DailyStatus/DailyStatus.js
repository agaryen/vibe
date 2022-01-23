import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { Text, View, SafeAreaView, Image } from 'react-native';
import Button from 'vibe/components/Button';
import useHttpQuery from 'vibe/modules/hooks/useHttpQuery';
import dayjs from 'dayjs';
import RemoteImg from '../../assets/remote.png';
import OfficeImg from '../../assets/office.png';
import MaybeImg from '../../assets/maybe.png';

const choicesOfAnswer = {
  NO: 'No, I will stay at home',
  MAYBE: 'Maybe, it depends who is coming',
  YES: 'Yes, I will be vibing at the office!',
};

const IMAGES = {
  NO: RemoteImg,
  MAYBE: MaybeImg,
  YES: OfficeImg,
};

const DailyStatus = ({ setIsAuthenticated }) => {
  const isWeekend = [5, 6].includes(dayjs().day());
  const [answer, setAnswer] = useState();
  const { loading, triggerQuery: triggerFetch } = useHttpQuery({
    url: '/daily_statuses',
    onSuccess: ({ data }) => {
      setAnswer(data.answer);
    },
    onFailure: ({ status }) => {
      if (status === 401) setIsAuthenticated(false);
    },
    trigger: true,
  });
  const { triggerQuery: saveAnswer } = useHttpQuery({
    url: '/daily_statuses',
    method: 'POST',
    trigger: true,
    onSuccess: () => triggerFetch(),
  });

  const chooseAnswer = (choice) => {
    saveAnswer({ body: { daily_status: { answer: choice } } });
  };

  useEffect(() => {
    triggerFetch();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={tw`flex-1 my-6`}>
      <View style={tw`flex h-full w-full px-8 justify-between items-center`}>
        <Text style={tw`text-5xl text-center mt-8`}>{isWeekend ? '🙈' : 'Hello'}</Text>
        <View style={tw`w-full`}>
          {isWeekend ? (
            <Text style={tw`text-2xl mb-8`}>It's the end of the week, get some rest.</Text>
          ) : (
            <>
              {answer ? (
                <View
                  style={{
                    width: 120,
                    height: 250,
                    justifyContent: 'space-around',
                  }}
                >
                  <Image source={IMAGES[answer]} style={{ width: 305, height: 180 }} />
                </View>
              ) : null}
              <Text style={tw`text-2xl font-bold mb-8`}>{'Are you coming tomorrow?'}</Text>
              {answer === null ? (
                <>
                  <Button uiStyle="success" style={tw`mb-8`} onPress={() => chooseAnswer('YES')}>
                    {choicesOfAnswer.YES}
                  </Button>
                  <Button uiStyle="warning" style={tw`mb-8`} onPress={() => chooseAnswer('MAYBE')}>
                    {choicesOfAnswer.MAYBE}
                  </Button>
                  <Button uiStyle="danger" style={tw`mb-8`} onPress={() => chooseAnswer('NO')}>
                    {choicesOfAnswer.NO}
                  </Button>
                </>
              ) : (
                <>
                  <Text style={tw`text-xl mb-20`}>{choicesOfAnswer[answer]}</Text>
                  <Button uiStyle="primary" style={tw`mb-8`} onPress={() => setAnswer(null)}>
                    Change my answer
                  </Button>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DailyStatus;
