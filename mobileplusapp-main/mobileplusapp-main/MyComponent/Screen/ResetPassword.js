import {View,BackHandler, Text, Touchable, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import ANT from 'react-native-vector-icons/AntDesign';
import Input from './Input';
import AppButton from './AppButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import {postData} from '../Services/FetchNodeServices';

export default function ResetPassword({route}) {
  const [getverifyStatus, setVerifyStatus] = useState(false);
  const [getsendOtpBtn, setSendOtpBtn] = useState(true);
  const [mobile, setMobile] = useState(route.params.MobileNo);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newOtp, setNewOtp] = useState('');
//alert(route.params.MobileNo)
  const navigation = useNavigation();
  const [error, setError] = useState({});
  const isFocused = useIsFocused();
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
  const handleError = (inputs, value) => {
    setError(prev => ({...prev, [inputs]: value}));
  };
  const validation = () => {
    var isValid = true;

    if (mobile.length == 0 || mobile.length < 10) {
      handleError('mobile', 'Enter 10 Digit mobile Number.');
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    setError({});
  }, [isFocused]);

  const handleSendOtp = async () => {
    if (validation()) {
      var result = await postData('users/checkUser', {
        mobileno: mobile,
      });
      if (result.data) {
        var otp = parseInt(Math.random() * 8999) + 1000;
        setNewOtp(otp);
       
      ToastAndroid.show(''+ otp, ToastAndroid.LONG);

        setVerifyStatus(true);
        setSendOtpBtn(false);
      } else {
      ToastAndroid.show('Mobile Number is not Exist', ToastAndroid.LONG);

      }
    }
  };
  const verifyOtp = async () => {
    if (newOtp == generatedOtp) {
      navigation.navigate('ForgotNewPassword', {mobileNo: mobile});
    
      ToastAndroid.show('Otp Correct', ToastAndroid.LONG);

    } else if(generatedOtp.length) {
     
      ToastAndroid.show('Otp Not Correct', ToastAndroid.LONG);

    }else{
      ToastAndroid.show('Input Otp', ToastAndroid.LONG);

  
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack('')}
        style={{padding: 15}}>
        <ANT style={{color: '#282c3f'}} name="arrowleft" size={24} />
      </TouchableOpacity>
      <View style={{padding: 30}}>
        <View style={{marginBottom: 8}}>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 18, fontWeight: 700}}>
            Reset Password
          </Text>
        </View>
        <View>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 12, color: '#282C3F', opacity: 0.6}}>
            Enter your mobile number and we’ll send a otp on your mobilenumber
            to reset your password.
          </Text>
        </View>
        <View style={{marginTop: 25}}>
          <Input
            onChangeText={txt => setMobile(txt.trim())}
            value={mobile}
            maxLength={10}
            placeholderTextColor="#282c3f"
            selectionColor={'#FF3F6C'}
            placeholder="Mobile Number"
            keyboardType="numeric"
            onFocus={() => handleError('mobile', null)}
          />
          <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 10, fontWeight: 700}}>
            {error.mobile}
          </Text>
        </View>
        {getverifyStatus ? (
         
          <View
            style={{ marginTop: 5,alignSelf:'center'}}>
              
            <OTPTextInput
              handleTextChange={txt => setGeneratedOtp(txt)}
              autoFocus={true}
              inputCount={4}
              inputCellLength={1}
              tintColor="#4984CA72"
              keyboardType="numeric"
              defaultValue={generatedOtp}
              textInputStyle={{
                borderWidth: 0.5,
                borderRadius: 3,
                borderColor: '#d4d5d9',
                borderBottomWidth: 1,
              }}
            />
            <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing:4,padding:5}}>Please Input otp...</Text>
          </View>
        ) : (
          <></>
        )}
        {getsendOtpBtn ? (
          <View style={{marginTop: 5, alignItems: 'center'}}>
            <AppButton
              bgcolor="#ff3c6f"
              borderRadii={3}
              btnWidth={0.85}
              buttonText={'SEND OTP'}
              onPress={handleSendOtp}
            />
          </View>
        ) : (
          <></>
        )}
        {getverifyStatus ? (
          <View style={{marginTop: 5, alignItems: 'center'}}>
            <AppButton
              bgcolor="#ff3c6f"
              borderRadii={3}
              btnWidth={0.85}
              buttonText={'VERIFY OTP'}
              onPress={verifyOtp}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
