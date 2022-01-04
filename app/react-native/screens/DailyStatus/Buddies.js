import React, { useState } from 'react';
import tw from 'twrnc';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import useHttpQuery from 'vibe/modules/hooks/useHttpQuery';

const Buddies = () => {
  const [users, setUsers] = useState([]);
  useHttpQuery({
    url: '/buddies',
    onSuccess: ({ data }) => {
      setUsers(data.items);
    },
  });

  const { triggerQuery: save } = useHttpQuery({
    url: '/buddies',
    method: 'POST',
    trigger: true,
  });

  return (
    <SafeAreaView style={tw`flex-1 my-6`}>
      <ScrollView style={tw`h-full w-full px-8`}>
        <Text style={tw`text-5xl text-center my-8`}>Your buddies</Text>
        {users.map((user) => (
          <BouncyCheckbox
            key={user.id}
            size={30}
            textStyle={{
              textDecorationLine: 'none',
            }}
            fillColor="#6366f1"
            text={user.email}
            isChecked={user.buddy}
            iconStyle={{ borderColor: '#4741ab' }}
            style={tw`my-3`}
            onPress={(checked) => {
              setUsers((users) => {
                const newUsers = users.map((currentUser) =>
                  currentUser.id === user.id ? { ...currentUser, buddy: checked } : currentUser
                );
                save({
                  body: {
                    buddy_ids: newUsers
                      .filter((user) => user.buddy)
                      .map(({ id }) => id)
                      .join(','),
                  },
                });

                return newUsers;
              });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Buddies;
