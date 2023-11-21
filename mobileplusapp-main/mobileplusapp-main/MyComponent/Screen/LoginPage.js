import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
BackHandler,Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppButton from './AppButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';

export default function LoginPage() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');
  // const [newOtp, setNewOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState({});
  // useEffect(()=>{
  //   const backAction=()=>{
  //     BackHandler.exitApp()
  //     // Alert.alert('Stop','Are you sure want to exit app',[
  //     //   {
  //     //     text:"Cancel",
  //     //     onPress:()=>null,
  //     //     style:"cancel"
  //     //   },
  //     //   {
  //     //     text:"Yes",
  //     //     onPress:()=>BackHandler.exitApp()
  //     //   }

  //     // ]);
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
      handleError('mobile','Enter 10 Digit Mobile Number.');
      isValid = false;
    }
   
    return isValid;
  };

  useEffect(() => {
    setError({});
  }, [isFocused]);
  useEffect(() => {
   
  }, [isFocused]);
  const handleContinue = () => {
    if (validation()) {
      navigation.replace('VerifyOtp', {mobileNo: mobile});
    }
  };

  // const fetchUserDetails = async () => {
  //   // alert('hy')
  //   // alert(mobile)
  //   var result = await postData('users/checkUser', {mobileno: mobile});
  //   // alert('hy')
  //   if (result.data) {
  //     alert(JSON.stringify(result.RESULT));
  //     alert(JSON.stringify(result.data));
  //     var otp = parseInt(Math.random() * 8999) + 1000;
  //     setNewOtp(otp);
  //     ExistingLogin();
  //   } else {
  //     var otp = parseInt(Math.random() * 8999) + 1000;
  //     setNewOtp(otp);
  //     ExistingLogin();
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{flex: 1, backgroundColor: '#fff'}}>
       {/* <View style={{alignItems:'center', backgroundColor: '#fff',height:height*0.2}}>

      </View> */}
      <View style={{marginTop: height * 0.12,}}>
     
        <View style={{backgroundColor: '#fff',alignItems:'center'}}>
<Image 
style={{resizeMode:'contain',width:width*0.7,height:height*0.2}}
 source={require('../Assets/mobile.png')}
  />

          <Image
            resizeMode="stretch"
            style={{width: width, height: height * 0.25}}
            source={require('../Assets/loginbanner.jpeg')}
          />
        </View>
       
        <View
          style={{backgroundColor: '#fff', padding: 60, alignSelf: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 24,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#424553',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}>
              Login
            </Text>
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#535766',
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
              }}>
              &nbsp;or&nbsp;
            </Text>
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#424553',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}>
              Signup
            </Text>
          </View>

          <View style={{marginBottom: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 0.5,
                borderRadius: 0.1,
                borderColor: '#bfc0c6',
                backgroundColor: '#fff',
              }}>
              <View style={{paddingLeft: 16, alignItems: 'center'}}>
                <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 14, color: '#282c3f'}}>+91 |</Text>
              </View>
              <View style={{width:width*0.65}}>
                <TextInput
                  onChangeText={txt => setMobile(txt)}
                  maxLength={10}  
                  keyboardType="numeric"
                  onFocus={() => handleError('mobile', null)}
                  value={mobile}
                  
                  placeholder="Mobile Number *"
                  placeholderTextColor="#282c3f"
                  selectionColor={'#FF3F6C'}
                  
                  style={{
                    paddingLeft: 10,
                    color: '#424242',
                    padding: 8,
                    fontSize: 14,
                    width:width,
                    // backgroundColor:'red'
                  }}
                />
              </View>
            </View>
            <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 10, fontWeight: 700}}>
              {error.mobile}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
              justifyContent:'center'
            }}>
            <Text style={{fontFamily:'Lato-BoldItalic',color: '#424242', fontSize: 12, letterSpacing: 0.3}}>
              By continuing, I agree to the
            </Text>
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#ff3c6f',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 0.3,
              }}>
              &nbsp;Terms of Use{' '}
            </Text>
            <Text style={{fontFamily:'Lato-BoldItalic',color: '#424242', fontSize: 12, letterSpacing: 0.3}}>
              &amp;
            </Text>
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#ff3c6f',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.3,
              }}>
             &nbsp;Privacy Policy
            </Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <AppButton
              onPress={handleContinue}
              // onPress={() => navigation.navigate('VerifyOtp')}
              borderRadii={0.1}
              btnWidth={0.90}
              buttonText={'CONTINUE'}
              bgcolor="#ff3c6f"
            />
            
          </View>
<TouchableOpacity onPress={()=>navigation.navigate('ProjectDrawer')}
 style={{alignSelf:'center',marginTop:10}}>
<Text style={{fontFamily:'Lato-BoldItalic',color: '#ff3c6f',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0.3,}}>
              Skip Now
            </Text>
</TouchableOpacity>
        </View>
     
      </View>
    </KeyboardAvoidingView>
  );
}
