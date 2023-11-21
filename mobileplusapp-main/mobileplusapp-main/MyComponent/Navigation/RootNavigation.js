import React,{useEffect} from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';
import Header from '../Screen/Header';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { BackHandler } from 'react-native';
import Home from '../Component/Home';
import OrderCart from '../Screen/OrderCart';
import SignUp from '../Screen/SignUp';
import LoginPage from '../Screen/LoginPage';
import LoginByPassword from '../Screen/LoginByPassword';
import VerifyOtp from '../Screen/VerifyOtp';
import ResetPassword from '../Screen/ResetPassword';
import Category from '../Screen/Category';
import SearchComponent from '../Screen/SearchComponent';
import Banner from '../Screen/Banner';
import BannerTwo from '../Screen/BannerTwo';
import Strip from '../Screen/Strip';
import GetSetGo from '../Screen/GetSetGo';
import BestSeller from '../Screen/BestSeller';
import TrendingBrand from '../Screen/TrendingBrand';
import SimilarProduct from '../Screen/SimilarProduct';
import ProductDeatailsOne from '../Screen/ProductDeatailsOne';
import AddTobag from '../Screen/AddTobag';
import ProductListing from '../Screen/ProductListing';
import Coupons from '../Screen/Coupons';
import CheckDelivery from '../Screen/CheckDelivery';
import Splashscreen from '../Screen/Splashscreen';
import ProductDescription from '../Screen/ProductDescription';
import Avalability from '../Screen/Avalability';
import Order from '../Screen/Order';
import CustomDrawerContent from './CustomDrawerContent';
import MobileUnderFifteen from '../Screen/MobileUnderFifteen';
import MobileUnderTwenty from '../Screen/MobileUnderTwenty';
import DisplayAddress from '../Screen/DisplayAddress';
import Addaddress from '../Screen/Addaddress';
import PaymentMethod from '../Screen/PaymentMethod';
import DisplayOrder from '../Screen/DisplayOrder';
import OrderDetails from '../Screen/OrderDetails';
import ChangePassword from '../Screen/ChangePassword';
import Bill from '../Screen/Bill';
import ForgotNewPassword from '../Screen/ForgotNewPassword';
import DisplayAds from '../Screen/DisplayAds';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootNavigation() {
 
const ProjectDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            header: Header,

            drawerIcon: () => <MCI name={'home-city'} size={24} />,
          }}
        />
         
      </Drawer.Navigator>
    );
  };




  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName={"Splashscreen"}
      //initialRouteName={"Addaddress"}
      >
        <Stack.Screen
          name="ProjectDrawer"
          component={ProjectDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotNewPassword"
          component={ForgotNewPassword}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Bill"
          component={Bill}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{  title: 'Order Details',
          headerStyle: {
            backgroundColor: '#ff3c6f',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:18,
           
          },}}
        />
         <Stack.Screen
          name="DisplayOrder"
          component={DisplayOrder}
          options={{  title: 'Order Details',
          headerStyle: {
            backgroundColor: '#ff3c6f',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:18,
           
          },}}
        />
 <Stack.Screen
          name="DisplayAddress"
          component={DisplayAddress}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Addaddress"
          component={Addaddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: Header,
          }}
        />
        <Stack.Screen
          name="OrderCart"
          component={OrderCart}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="LoginByPassword"
          component={LoginByPassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Category"
          component={Category}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SearchComponent"
          component={SearchComponent}
          options={{headerShown: false}}
        />

       

        <Stack.Screen
          name="Banner"
          component={Banner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BannerTwo"
          component={BannerTwo}
          options={{headerShown: false}}
        />

     
        <Stack.Screen
          name="Strip"
          component={Strip}
          options={{headerShown: false}}
        />
      
        <Stack.Screen
          name="GetSetGo"
          component={GetSetGo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BestSeller"
          component={BestSeller}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TrendingBrand"
          component={TrendingBrand}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SimilarProduct"
          component={SimilarProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDeatailsOne"
          component={ProductDeatailsOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTobag"
          component={AddTobag}
          options={{headerShown: false}}
        />
      
        <Stack.Screen
          name="ProductListing"
          component={ProductListing}
          options={{  title: 'Product List',
          headerStyle: {
            backgroundColor: '#fff',
            
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:18,
           
          },}}
        />
        <Stack.Screen
          name="Coupons"
          component={Coupons}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckDelivery"
          component={CheckDelivery}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="DisplayAds"
          component={DisplayAds}
          options={{headerShown: false}}
        />
      
        <Stack.Screen
          name="Splashscreen"
          component={Splashscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDescription"
          component={ProductDescription}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Avalability"
          component={Avalability}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{  title: 'SHOPPING BAG',
          headerStyle: {
            backgroundColor: '#fff',
            
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:18,
           
          },}}
        />
        <Stack.Screen
          name="MobileUnderFifteen"
          component={MobileUnderFifteen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="MobileUnderTwenty"
          component={MobileUnderTwenty}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
