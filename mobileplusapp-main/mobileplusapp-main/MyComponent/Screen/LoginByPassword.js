import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
  BackHandler
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ANT from 'react-native-vector-icons/AntDesign';
import Input from './Input';
import ENTP from 'react-native-vector-icons/Entypo';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import AppButton from './AppButton';
import {postData} from '../Services/FetchNodeServices';

export default function LoginByPassword({route}) {
  // console.log(route.params.myp);
  const isFocused = useIsFocused();
  const [mobileNo, setMobileNo] = useState(route.params.myp);
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [eye, setEye] = useState(false);
  // useEffect(()=>{
  //   const backAction=()=>{
  //     navigation.goBack()
  //     return true;
  //   }
  //   const backHandler= BackHandler.addEventListener(
  //     'hardwareBackPress',
  //    backAction
  //   )
  // },[])
  const handleEye = () => {
    setEye(true);
  };
  const handleEye2 = () => {
    setEye(false);
  };


  const handleError = (inputs, value) => {
    setError(prev => ({...prev, [inputs]: value}));
  };
  const validation = () => {
    var isValid = true;

    if (mobileNo.length == 0 || mobileNo.length > 10 || mobileNo.length < 10) {
      handleError('mobileNo', ' Enter 10 Digit mobile Number.');
      isValid = false;
    }
    if (!password) {
      handleError('password', ' Enter correct password.');
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = async () => {
    if (validation()) {
      var body = {
        mobileno: mobileNo,
        password: password,
      };
      var response = await postData('users/checkLogin', body);
      // alert(JSON.stringify(response))
      if (response.RESULT) {
        // alert('you r log in');
        ToastAndroid.show('Login Sucessfully', ToastAndroid.SHORT);
        navigation.navigate("ProjectDrawer")

      } else {
        // alert('Error');
        ToastAndroid.show('Incorrect phone number or password', ToastAndroid.SHORT);

      }
    }
  };

  useEffect(() => {
    setError({});
  }, [isFocused]);

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack('')}
        style={{padding: 20}}>
        <ANT style={{color: '#282c3f'}} name="arrowleft" size={24} />
      </TouchableOpacity>
      <View style={{padding: 30}}>
        <View style={{marginBottom: 30}}>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 20, fontWeight: 700, color: '#424553'}}>
            Login to your account
          </Text>
        </View>
        <View>
          <Input
            value={mobileNo}
            maxLength={10}  
            keyboardType="numeric"
            onChangeText={txt => setMobileNo(txt.trim())}
            placeholder="Mobile Number"
            onFocus={() => handleError('mobileNo', null)}
          />
        </View>

        <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 12}}>{error.mobileNo}</Text>

        <View style={{marginTop: 5}}>
          <Input
            onChangeText={txt => setPassword(txt.trim())}
            onFocus={() => handleError('password', null)}
            placeholder="Password"
            secureTextEntry={eye ? false : true}
          />
          {eye ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 17, top: 12}}>
              <ENTP onPress={handleEye2} name="eye" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{position: 'absolute', right: 17, top: 12}}>
              <ENTP onPress={handleEye} name="eye-with-line" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 12}}>{error.password}</Text>

        <View style={{alignSelf: 'center', marginBottom: 30}}>
          <AppButton
            onPress={handleSubmit}
            borderRadii={3}
            btnWidth={0.85}
            buttonText={'LOG IN'}
            bgcolor="#ff3c6f"
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 12, opacity: 0.6}}>
            Forgot your password?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword',{MobileNo:mobileNo})}>
            <Text style={{fontFamily:'Lato-BoldItalic',color: '#ff3f6c', fontSize: 12, fontWeight: '700'}}>
              Reset here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
