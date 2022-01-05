import { useEffect } from 'react';
import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from 'expo-notifications';
import httpQuery from 'vibe/modules/httpQuery';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const registerForPushNotificationsAsync = async () => {
  if (!Constants.isDevice) return alert('Must use physical device for Push Notifications');
  const { status: existingStatus } = await getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  const token = (await getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};

export const usePushNotifications = () => {
  const postToken = (notification_token) => {
    httpQuery({ url: '/users/notification_tokens', method: 'POST', body: { notification_token } });
  };

  useEffect(() => {
    setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    registerForPushNotificationsAsync().then(postToken);
  }, []);
};

export default usePushNotifications;
