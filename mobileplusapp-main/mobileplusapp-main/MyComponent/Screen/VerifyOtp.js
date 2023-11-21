import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  BackHandler
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import OTPTextInput from 'react-native-otp-textinput';
import {useNavigation} from '@react-navigation/native';
import LoginPage from './LoginPage';
import {postData} from '../Services/FetchNodeServices';
import {useIsFocused} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
export default function VerifyOtp({route}) {
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newOtp, setNewOtp] = useState('');
  const [second, setSecond] = useState(true);
  const [time, setTime] = useState(20);
  const [refresh, setRefresh] = useState(false);

  const [mobileNumber, setMobileNumber] = useState(route.params.mobileNo);
  const isFocused = useIsFocused();
const dispatch=useDispatch()
  //console.log(route.params.notp);
  // alert(route.params.notp);
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

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
  useEffect(()=>{
  },[isFocused])

  const verifyOtp = async () => {
    if (newOtp == generatedOtp) {
      ToastAndroid.show('Otp Correct', ToastAndroid.LONG);

      var result = await postData('users/checkUser', {
        mobileno: route.params.mobileNo,
      });
      if (result.RESULT) {
        ToastAndroid.show('Login Sucessfully', ToastAndroid.LONG);
     dispatch({ type: "ADD_USER", payload: result.data });
     navigation.replace('ProjectDrawer')
      //  navigation.navigate('ProjectDrawer');
        //setGeneratedOtp('')
      } else  {

        navigation.replace('SignUp', {mb: mobileNumber});
      }


    }
    
    else if(generatedOtp.length) {
      ToastAndroid.show('Please Enter Correct Otp', ToastAndroid.LONG);
    }else{
      ToastAndroid.show('Enter Otp', ToastAndroid.LONG);

    }
  };

  const fetchUserDetails = async () => {
    var result = await postData('users/checkUser', {
      mobileno: route.params.mobileNo,
    });
    if (result.data) {
      // alert(JSON.stringify(result.RESULT));
      // alert(JSON.stringify(result.data));
      var otp = parseInt(Math.random() * 8999) + 1000;
      ToastAndroid.show('Otp Sent Sucessfully', ToastAndroid.LONG);

      ToastAndroid.show('' + otp, ToastAndroid.LONG);

      setNewOtp(otp);
      // alert(otp)
      myTimer();
    } else {
      var otp = parseInt(Math.random() * 8999) + 1000;
      ToastAndroid.show('Otp Sent Sucessfully', ToastAndroid.LONG);

      ToastAndroid.show('' + otp, ToastAndroid.LONG);

      setNewOtp(otp);
      // alert(otp);
      myTimer();
    }
  };
  const resendOtp = () => {
    setSecond(true);
    var otp = parseInt(Math.random() * 8999) + 1000;
    setNewOtp(otp);
    ToastAndroid.show('' + otp, ToastAndroid.LONG);

    // alert(otp);
    myTimer(true);
  };

  const myTimer = s => {
    var interval;
    if (s || second) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev >= 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setSecond(false);
            return 20;
          }
        });
      }, 1000);
      setRefresh(!refresh);
    }
  };
  useEffect(() => {
    if(generatedOtp.length==4){
      verifyOtp()
    }
  }, [generatedOtp]);
 
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <View style={{width: width, height: height, backgroundColor: '#fff'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack('')}
        style={{padding: 10}}>
        <AntIcon color="#282c3f" name="arrowleft" size={25} />
      </TouchableOpacity>

      <View style={{padding: 30}}>
        <View style={{marginBottom: 30}}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 10,
              letterSpacing: 1.8,
              color: '#282c3f',
            }}>
            Verify with OTP
          </Text>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 12, fontWeight: 400, letterSpacing: 0.3}}>
            Sent via SMS to {route.params.mobileNo}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <View
          //    style={{borderWidth:0.5,borderRadius:3,padding:5,borderColor:'#d4d5d9'}}
          >
           

            <OTPTextInput
              handleTextChange={txt => setGeneratedOtp(txt)}
              autoFocus={true}
              inputCount={4}
              onSubmitEditing={() => {
                verifyOtp();
              }}
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
          </View>
          {/* <View style={{borderWidth:0.5,marginLeft:30,borderRadius:3,padding:5,borderColor:'#d4d5d9'}}>
            <TextInput />
          </View>
          <View style={{borderWidth:0.5,marginLeft:30,borderRadius:3,padding:5,borderColor:'#d4d5d9'}}>
            <TextInput />
          </View>
          <View style={{borderWidth:0.5,marginLeft:30,borderRadius:3,padding:5,borderColor:'#d4d5d9'}}>
            <TextInput />
          </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <Text style={{fontFamily:'Lato-BoldItalic',fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 12, letterSpacing: 0.3}}>
            Click to      
          </Text>
          <TouchableOpacity
          onPress={verifyOtp}
          >
            <Text
              style={{
                color: '#ff3f6c',
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: '#fff',
                letterSpacing: 0.3,
               
              }}>
              &nbsp;Verify OTP
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            {second ? (
              <Text
                style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 12, letterSpacing: 0.3}}>
                Waiting for OTP 00:{time}
              </Text>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 12, letterSpacing: 0.3}}>
                  Did not recieve OTP?{' '}
                </Text>

                <TouchableOpacity onPress={resendOtp}>
                  <Text
                    style={{fontFamily:'Lato-BoldItalic',
                      color: '#ff3f6c',
                      fontSize: 12,
                      fontWeight: 700,
                      backgroundColor: '#fff',
                      letterSpacing: 0.3,
                    }}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <Text style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 12, letterSpacing: 0.3}}>
              Log in using{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LoginByPassword', {myp: mobileNumber})
              }>
              <Text
                style={{fontFamily:'Lato-BoldItalic',
                  color: '#ff3f6c',
                  fontSize: 12,
                  fontWeight: 700,
                  backgroundColor: '#fff',
                  letterSpacing: 0.3,
                }}>
                Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#282c3f', fontSize: 12, letterSpacing: 0.3}}>
              Having trouble logging in?{' '}
            </Text>
            <Text
              style={{
                color: '#ff3f6c',
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: '#fff',
                letterSpacing: 0.3,
              }}>
              Get help
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}
