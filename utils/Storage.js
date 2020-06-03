import AsyncStorage from '@react-native-community/async-storage';

export async function saveData(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export async function loadData(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

export const keys = {
  list: {
    rockets: 'ROCKETS_KEY',
    missions: 'MISSIONS_KEY',
    launches: 'LAUNCHES_KEY',
    events: 'EVENTS_KEY',
    roadster: 'ROADESTER_KEY',
  },
};
