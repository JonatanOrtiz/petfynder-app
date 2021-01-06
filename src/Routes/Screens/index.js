import React from 'react';
import { TouchableOpacity, View, Text, Dimensions, LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux'
import Login from '../../pages/Login/index'
import ForgotPassword from '../../pages/ForgotPassword/index'
import ResetPassword from '../../pages/ResetPassword/index'
import UserRegistration from '../../pages/Register/UserRegistration/index'
import PetRegistration from '../../pages/Register/PetRegistration/index'
import FilterSearch from '../../pages/Search/FilterSearch/index'
import MapSearch from '../../pages/Search/MapSearch/index'
import Favorites from '../../pages/Favorites/index'
import Rescued from '../../pages/Rescued/index'
import PetProfile from '../../pages/Profiles/PetProfile/index'
import RescuedProfile from '../../pages/Profiles/RescuedProfile/index'
import UserAccount from '../../pages/User/UserAccount/index'
import UserAccountUpdate from '../../pages/User/UserAccountUpdate/index'
import DeleteAccount from '../../pages/DeleteAccount/index'
import DeleteAccountFacebook from '../../pages/DeleteAccountFacebook/index'
import About from '../../pages/About/index'
import HelpAndFeedback from '../../pages/HelpAndFeedback/index'
import PrivacyPolicy from '../../pages/PrivacyPolicy/index'
import TermsOfUse from '../../pages/TermsOfUse/index'
import UserPets from '../../pages/User/UserPets/index'
import styles from './styles.scss'
const PushNotification = require("react-native-push-notification");
LogBox.ignoreLogs([
  'Cannot record touch end without a touch start',
  'Ended a touch event which was not counted in',
  'Warning: Cannot update'
])

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MapSearchTabs = () => {

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { height: 35, elevation: 0 },
        inactiveBackgroundColor: '#e0e0e0',
        activeBackgroundColor: '#ffffff',
        labelStyle: { fontWeight: 'bold', fontSize: 18, marginLeft: -2 },
        labelPosition: "beside-icon",
        activeTintColor: 'rgb(220, 78, 65)',
        inactiveTintColor: '#a0a0a0',
      }}
    >
      <Tab.Screen name="Perdidos">{props => <MapSearch {...props} />}</Tab.Screen>
      <Tab.Screen name="Encontrados">{props => <MapSearch {...props} />}</Tab.Screen>
    </Tab.Navigator>
  )
}

const FavoriteTabs = () => {

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { height: 35, elevation: 0 },
        inactiveBackgroundColor: '#e0e0e0',
        activeBackgroundColor: '#ffffff',
        labelStyle: { fontWeight: 'bold', fontSize: 18, marginLeft: -2 },
        labelPosition: "beside-icon",
        activeTintColor: 'rgb(220, 78, 65)',
        inactiveTintColor: '#a0a0a0',
      }}
    >
      <Tab.Screen name="Perdidos">{props => <Favorites {...props} />}</Tab.Screen>
      <Tab.Screen name="Encontrados">{props => <Favorites {...props} />}</Tab.Screen>
    </Tab.Navigator>
  )
}

export default Screens = ({ navigation }) => {
  const appStore = useSelector(state => state.appReducer);
  const dispatch = useDispatch();
  if (appStore.userId === '') {
    navigation.setOptions({ gestureEnabled: false })
  } else {
    navigation.setOptions({ gestureEnabled: true })
  }
  PushNotification.configure({
    onNotification: function (notification) {
      dispatch({ type: 'SET_NAV', payload: 'notification' }),
      navigation.navigate('PetProfile', { lostOrFound: notification.lostOrFound, id: notification.id }),
      PushNotification.cancelAllLocalNotifications()
    }
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: null,
        header: () => appStore.userId !== '' && (
          <TouchableOpacity style={{ height: deviceHeight * 0.15, width: deviceWidth * 0.08 }} onPress={() => navigation.openDrawer()}>
            <View style={[styles.menuButtonInternalView, { height: deviceHeight * 0.05, width: deviceHeight * 0.05, marginTop: deviceHeight * 0.06 }]}>
              <Text style={[styles.menuButtonText, { fontSize: deviceHeight * 0.035 }]}>&#9776;</Text>
            </View>
          </TouchableOpacity>
        ),
      }}>
      {appStore.userId === '' ? (
        <>
          <Stack.Screen name="Login">{props => <Login {...props} />}</Stack.Screen>
          <Stack.Screen name="UserRegistration">{props => <UserRegistration {...props} />}</Stack.Screen>
          <Stack.Screen name="ForgotPassword">{props => <ForgotPassword {...props} />}</Stack.Screen>
          <Stack.Screen name="ResetPassword">{props => <ResetPassword {...props} />}</Stack.Screen>
        </>
      ) : (
          <>
            <Stack.Screen name="UserAccount">{props => <UserAccount {...props} />}</Stack.Screen>
            <Stack.Screen name="UserPets">{props => <UserPets {...props} />}</Stack.Screen>
            <Stack.Screen name="PetProfile">{props => <PetProfile {...props} />}</Stack.Screen>
            <Stack.Screen name="RescuedProfile">{props => <RescuedProfile {...props} />}</Stack.Screen>
            <Stack.Screen name="UserAccountUpdate">{props => <UserAccountUpdate {...props} />}</Stack.Screen>
            <Stack.Screen name="DeleteAccount">{props => <DeleteAccount {...props} />}</Stack.Screen>
            <Stack.Screen name="DeleteAccountFacebook">{props => <DeleteAccountFacebook {...props} />}</Stack.Screen>
            <Stack.Screen name="ForgotPassword">{props => <ForgotPassword {...props} />}</Stack.Screen>
            <Stack.Screen name="PrivacyPolicy">{props => <PrivacyPolicy {...props} />}</Stack.Screen>
            <Stack.Screen name="TermsOfUse">{props => <TermsOfUse {...props} />}</Stack.Screen>
            <Stack.Screen name="About">{props => <About {...props} />}</Stack.Screen>
            <Stack.Screen name="HelpAndFeedback">{props => <HelpAndFeedback {...props} />}</Stack.Screen>
            <Stack.Screen name="PetRegistration">{props => <PetRegistration {...props} />}</Stack.Screen>
            <Stack.Screen name="FilterSearch">{props => <FilterSearch {...props} />}</Stack.Screen>
            <Stack.Screen name="Rescued">{props => <Rescued {...props} />}</Stack.Screen>
            <Stack.Screen name="MapSearchTabs">{props => <MapSearchTabs {...props} />}</Stack.Screen>
            <Stack.Screen name="FavoriteTabs">{props => <FavoriteTabs {...props} />}</Stack.Screen>
          </>
        )}
    </Stack.Navigator>
  );
};
