import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import { useNavigation, useIsDrawerOpen } from '@react-navigation/native';
import SCREENS from '../screens';
import IntroScreen from '../screens/intro/IntroScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import UpdatePasswordScreen from '../screens/auth/UpdatePasswordScreen';
import SmartScreen from '../screens/tabs/SmartScreen';
import NotificationScreen from '../screens/tabs/NotificationScreen';
import ConfirmLoginScreen from '../screens/auth/ConfirmLoginScreen';
import ConfirmEmailScreen from '../screens/auth/ConfirmEmailScreen';
import {Image, SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IMAGES from '../assets/images';

import AIScreen from '../screens/tabs/AIScreen';
import AddScreen from '../screens/tabs/AddScreen';

import {useTheme} from '@react-navigation/native';
import AboutScreen from '../screens/tabs/AboutScreen';
import {COLORS} from '../constants';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: {
          height: 10,
        }
      }}
      onPress={onPress}
    >
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#3CC1C1'
      }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};


const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.INTRO}>
      <Stack.Screen
        name={SCREENS.INTRO}
        component={IntroScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.LOGIN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.SIGNUP}
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.HOME}
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.FORGOTPASS}
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.CONFIRMLOGIN}
        component={ConfirmLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.CONFIRMEMAIL}
        component={ConfirmEmailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenWithDrawer = () => {
  const navigation = useNavigation();

  const handleLogout = () => {

    navigation.navigate(SCREENS.LOGIN);
  };

  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.PROFILE}
      drawerContent={props => {
        const { routeNames, index } = props.state;
        const focused = routeNames[index];
        console.log('focused', focused);

        return (
          <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image source={IMAGES.LOGOMAIN} style={{ height: 100, width: 100 }} />
              <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 10, fontWeight: 'bold' }}>
                Smart Home Nhóm 4
              </Text>
            </View>
            <DrawerItem
              label={'Home'}
              onPress={() => props.navigation.navigate(SCREENS.HOME)}
              focused={focused === SCREENS.HOME}
              activeBackgroundColor={COLORS.MAIN}
              inactiveBackgroundColor={COLORS.GRAY_LIGHT}
              inactiveTintColor={COLORS.BLACK}
              activeTintColor={COLORS.WHITE}
            />
            <DrawerItem
              label={'Đổi mật khẩu'}
              onPress={() => props.navigation.navigate(SCREENS.UPDATEPASS)}
              focused={focused === SCREENS.ABOUT}
              activeBackgroundColor={COLORS.MAIN}
              inactiveBackgroundColor={COLORS.GRAY_LIGHT}
              inactiveTintColor={COLORS.BLACK}
              activeTintColor={COLORS.WHITE}
            />
            <DrawerItem
              label={'Đăng xuất'}
              onPress={handleLogout} // Gọi hàm xử lý đăng xuất khi nhấn vào
              focused={focused === SCREENS.LOGIN}
              activeBackgroundColor={COLORS.MAIN}
              inactiveBackgroundColor={COLORS.GRAY_LIGHT}
              inactiveTintColor={COLORS.BLACK}
              activeTintColor={COLORS.WHITE}
            />
            
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Drawer.Screen name={SCREENS.UPDATEPASS} component={UpdatePasswordScreen} />
      <Drawer.Screen name={SCREENS.LOGIN} component={LoginScreen} />
    </Drawer.Navigator>
  );
};

const TabNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
    initialRouteName={SCREENS.HOME}
      screenOptions={{
        headerShown: true, 
        tabBarStyle:{
        position: 'absolute',
        bottom: 20,
        // flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 20, 
        backgroundColor: '#fff', 
        height: 60,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset:{
        width: 5,
        height: 5,
      }
      }
      }}
      >
    <Tab.Screen 
      name= 'Dashboard'
      component={ProfileScreenWithDrawer} 
      options={({route}) => ({
        headerShown: false,
        tabBarLabel: route.name === 'Dashboard' ? ' ' : 'Dashboard',
      tabBarIcon: ({focused}) => (
    <View style={styles.root}>
    <Image 
      source={IMAGES.HOME}
      resizeMode='contain'
      style={{
        width: 30,
        height: 30,
        tintColor: focused ? '#E32F45' : '#748C94'
      }}
      />
   
    </View>
      )
      })}
    />

<Tab.Screen 
  name="Thêm người dùng"
  component={AddScreen} 
  options={({route}) => ({
    tabBarLabel: route.name === 'Thêm người dùng' ? ' ' : 'Thêm người dùng',
    tabBarIcon: ({focused}) => (
      <View style={styles.root}>
        <Image 
          source={IMAGES.ADD}
          resizeMode='contain'
          style={{
            width: 30,
            height: 30,
            tintColor: focused ? '#E32F45' : '#748C94'
          }}
        />
       
      </View>
    )
  })}
/>
        <Tab.Screen 
  name=' '
  component={AIScreen} 
  options={{
    tabBarIcon: ({focused}) => (
      <Image 
        source={IMAGES.CHAT} 
        style={{
          width: 40,
          height: 40,
          // tintColor: focused ? '#E32F45' : '#fff',
          marginTop: 10,
          // tintColor: focused ? '#E32F45' : '#748C94',
        }}
      />
    ),
    tabBarButton: (props) => (
      <CustomTabBarButton {...props} />
    )
  }}
/>
<Tab.Screen 
  name='Tiện ích'
  component={SmartScreen} 
  options={({route}) => ({
    tabBarLabel: route.name === 'Tiện ích' ? ' ' : 'Tiện ích',
    tabBarIcon: ({focused}) => (
      <View style={styles.root}>
        <Image 
          source={IMAGES.SMART}
          resizeMode='contain'
          style={{
            width: 30,
            height: 30,
            tintColor: focused ? '#E32F45' : '#748C94'
          }}
        />
      
      </View>
    )
  })}
/>
<Tab.Screen 
  name='Thông báo'
  component={NotificationScreen} 
  options={({route}) => ({
    tabBarLabel: route.name === 'Thông báo' ? ' ' : 'Thông báo',
    tabBarIcon: ({focused}) => (
      <View style={styles.root}>
        <Image 
          source={IMAGES.NOTIFICATION}
          resizeMode='contain'
          style={{
            width: 30,
            height: 30,
            tintColor: focused ? '#E32F45' : '#748C94'
          }}
        />
     
      </View>
    )
  })}
/> 
    </Tab.Navigator>
   
  );
};
const styles = StyleSheet.create({
  root:{
    alignItems: 'center',
    justifyContent: 'center',
    top: 22,
    marginHorizontal: -10,
  },
  icon:{
    width: 25,
    height: 25,
  
   
  },
  setting:{
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:  -30,
     
  }
})


export default StackNavigation;
