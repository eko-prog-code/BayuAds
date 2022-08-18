import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Home,
  Informasi,
  Obat,
  Appoitment,
  Splash,
  Register,
  Sukses,
  Login,
  ForgotPass,
  Video,
  PenunjangUser,
  UploadPhoto,
  Jadwal,
  Opsi,
  Am,
  New,
  Filter,
  WebviewPage,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNavigator} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false}}
      tabBar={props => <BottomTabNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Informasi" component={Informasi} />
      <Tab.Screen name="Notif" component={Obat} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen name="New" component={New} options={{headerShown: false}} />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebviewPage"
        component={WebviewPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sukses"
        component={Sukses}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Video"
        component={Video}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PenunjangUser"
        component={PenunjangUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Appoitment"
        component={Appoitment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Jadwal"
        component={Jadwal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Opsi"
        component={Opsi}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Am" component={Am} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default Router;
