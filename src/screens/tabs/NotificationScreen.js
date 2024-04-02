import { FlatList, Text, View } from 'react-native';
import React, { useState } from 'react';


const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const showNotification = (isSwitch1Enabled, isSwitch2Enabled, isSwitch3Enabled,isSwitch4Enabled) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const status = isSwitch1Enabled || isSwitch2Enabled || isSwitch3Enabled ? 'bật' : 'tắt';
    const newNotification = { id: Date.now().toString(), time, status };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  }
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.time}</Text>
          <Text>{item.status}</Text>
        </View>
      )}
    />
  );
};


export default NotificationScreen

