import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const websiteUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://vibe.com'

  return (
    <WebView
      style={styles.container}
      source={{ uri: websiteUrl }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
