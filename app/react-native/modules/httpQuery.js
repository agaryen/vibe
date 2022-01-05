import * as SecureStore from 'expo-secure-store';

const environment = 'development';

const URLS = {
  development: 'http://localhost:3000',
  production: 'https://vibe-app.herokuapp.com',
};

const getUrl = ({ url, params }) => {
  const urlObj = new URL(url, URLS[environment]);

  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });
  return urlObj.href;
};

const httpQuery = async ({ url, method = 'GET', body = {}, params = {} }) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = await SecureStore.getItemAsync('token');
  if (token) headers.Authorization = token;

  const response = await fetch(getUrl({ url, params }), {
    method,
    headers,
    body: method !== 'GET' && JSON.stringify(body),
  });

  const data = await response.json().catch(() => {});
  console.log(data);
  if (!response.ok) throw { ...response, message: data?.message };
  return { ...response, data: await data };
};

export default httpQuery;
