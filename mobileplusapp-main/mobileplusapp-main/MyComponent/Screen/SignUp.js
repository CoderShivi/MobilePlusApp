import {
  View,
  Text,
  Dimensions,
  Touchable,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  BackHandler
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ANT from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialIcons';
import ENTP from 'react-native-vector-icons/Entypo';
import Input from './Input';
import AppButton from './AppButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {postData} from '../Services/FetchNodeServices';

export default function SignUp({route}) {
  const {width, height} = Dimensions.get('window');
  const [emailId, setEmailId] = useState('');
  const [name, SetName] = useState('');
  const [password, setPassword] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const isFocused = useIsFocused();

  const [error, setError] = useState({});
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
  const handleError = (inputs, value) => {
    setError(prev => ({...prev, [inputs]: value}));
  };
  const validation = () => {
    var isValid = true;

    if (!name) {
      handleError('name', 'Please fill out this name.');
      isValid = false;
    }
    if (!firstPassword) {
      handleError('firstPassword', 'Please fill out this createPassword.');
      isValid = false;
    }
    if (password) {
      if (password !== firstPassword) {
        handleError('password', 'password does not match.');
        isValid = false;
      } else {
        handleError('password', null);
      }
    } else if (!password) {
      handleError('password', 'password does not match.');
      isValid = false;
    }
    if (emailId.length) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailId)) {
        handleError('emailId', 'Pls Input valid Email.');
        isValid = false;
      }
    } else {
      handleError('emailId', null);
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var body = {
        email: emailId,
        mobile: route.params.mb,
        name: name,
        password: password,
        loginstatus: 'login',
      };
      // alert(JSON.stringify(body))
      var response = await postData('users/addnewrecord', body);
      // alert(JSON.stringify(response));
      if (response) {
        ToastAndroid.show('SignUp Sucessfully', ToastAndroid.SHORT);
        navigation.replace('ProjectDrawer');
      } else {
        ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
      }
    }
  };
  useEffect(() => {
    setError({});
  }, [isFocused]);

  const handleEye = () => {
    setEye(true);
  };
  const handleEye2 = () => {
    setEye(false);
  };

  const handleEye3 = () => {
    setEye2(true);
  };
  const handleEye4 = () => {
    setEye2(false);
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <ANT style={{color: '#282c3f'}} name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            color: '#282c3f',
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 15,
          }}>
          Complete your sign up
        </Text>
      </View>
      <View style={{padding: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 10, opacity: 0.6}}>
              Mobile Number
            </Text>
            <Text style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 14, marginTop: 5}}>
              {route.params.mb}
            </Text>
          </View>
          <MI color="#03A685" size={24} name="verified" />
        </View>
        <View
          style={{
            marginTop: 20,
            // justifyContent: 'space-between',
            // flexDirection: 'row',
            // alignItems: 'center',
          }}>
          <Input
            keyboardType="text"
            maxLength={50}
            secureTextEntry={eye ? false : true}
            placeholder="Create Password"
            value={firstPassword}
            onFocus={() => handleError('firstPassword', null)}
            onChangeText={txt => setFirstPassword(txt)}
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
        <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 10}}>{error.firstPassword}</Text>

        <View style={{marginTop: 5}}>
          <Input
            value={password}
            keyboardType="text"
            maxLength={40}
            onChangeText={txt => setPassword(txt)}
            secureTextEntry={eye2 ? false : true}
            placeholder="Confirm Password"
            onFocus={() => handleError('password', null)}
          />
          {eye2 ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 17, top: 12}}>
              <ENTP onPress={handleEye4} name="eye" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{position: 'absolute', right: 17, top: 12}}>
              <ENTP onPress={handleEye3} name="eye-with-line" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 10}}>{error.password}</Text>

        <View style={{marginTop: 5}}>
          <Input
            value={name.trimStart()}
            onFocus={() => handleError('name', null)}
            onChangeText={txt => SetName(txt)}
            placeholder="Full Name"
          />
        </View>
        <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 10}}>{error.name}</Text>
        <View style={{marginTop: 5}}>
          <Input
            value={emailId.trimStart()}
            keyboardType="email"
            onChangeText={txt => setEmailId(txt)}
            placeholder="Email (Optional)"
            onFocus={() => handleError('emailId', null)}
          />
        </View>
        <Text style={{fontFamily:'Lato-BoldItalic',color: 'red', fontSize: 10}}>{error.emailId}</Text>

        <View style={{marginTop: 5, alignSelf: 'center'}}>
          <AppButton
            onPress={handleSubmit}
            borderRadii={3}
            btnWidth={0.84}
            buttonText={'CREATE ACCOUNT'}
            bgcolor="#ff3c6f"
          />
        </View>
      </View>
    </View>
  );
}
