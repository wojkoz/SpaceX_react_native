import NetInfo from '@react-native-community/netinfo';

export async function checkNetworkConnection() {
  let isConnected = false;
  await NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    isConnected = state.isConnected;
  });
  return isConnected;
}
