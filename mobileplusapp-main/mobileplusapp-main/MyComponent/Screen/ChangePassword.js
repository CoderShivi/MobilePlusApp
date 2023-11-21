import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  BackHandler
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import {postData} from '../Services/FetchNodeServices';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function ChangePassword() {
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const userDetailList = useSelector(state => state.userDetails);
   //alert(confirmPassword);
  //  useEffect(()=>{
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

    if (oldPassword) {
      if (oldPassword !== userDetailList.password) {
        handleError('oldPassword', 'oldPassword  not matching.');
        isValid = false;
      } else {
        handleError('oldPassword', null);
      }
    } else if (!oldPassword) {
      handleError('oldPassword', 'Please fill out this oldPassword.');
      isValid = false;
    }
    if (!newPassword) {
      handleError('newPassword', 'Please fill out this newPassword.');
      isValid = false;
    }
    if (confirmPassword) {
      if (confirmPassword !== newPassword) {
        handleError('confirmPassword', 'password  not matching.');
        isValid = false;
      } else {
        handleError('confirmPassword', null);
      }
    } else if (!confirmPassword) {
      handleError('confirmPassword', 'Please fill out this confirmpassword.');
      isValid = false;
    }

    return isValid;
  };

  const handleChangePassword = async () => {
    if (validation()) {
      var body = {
        password: newPassword,
        mobileno: userDetailList.mobileno,
      };
      // alert(JSON.stringify(body))
      var response = await postData('users/updatepassword', body);
      if (response) {
        ToastAndroid.show('Update Password Sucessfully', ToastAndroid.SHORT);
        navigation.navigate('ProjectDrawer')
      }
      else {
        ToastAndroid.show('Server Error', ToastAndroid.SHORT);

      }
    }
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <MCI color="#282c3f" size={27} name="arrow-left" />
        </TouchableOpacity>
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            marginLeft: 10,
            fontWeight: 600,
            color: '#000',
            fontSize: 16,
          }}>
          PROFILE
        </Text>
      </View>
      <View style={{marginTop: 60}}>
        <View
          style={{
            width: width * 0.85,
            alignSelf: 'center',
          }}>
          <TextField
            secureTextEntry={true}
            activeLineWidth={1}
            labelFontSize={13}
            label="Old Password *"
            keyboardType="text"
            tintColor="#008080"
            baseColor="#D2D6DE"
            title="Required"
            animationDuration={200}
            lineWidth={0.5}
            fontSize={13}
            errorColor="#FF0000"
            error={error.oldPassword}
            onFocus={() => handleError('oldPassword', null)}
            onChangeText={txt => setOldPassword(txt.trim())}
          />
        </View>
        <View
          style={{
            width: width * 0.85,
            alignSelf: 'center',
          }}>
          <TextField
            secureTextEntry={true}
            activeLineWidth={1}
            labelFontSize={13}
            label="New Password *"
            keyboardType="text"
            tintColor="#008080"
            baseColor="#D2D6DE"
            lineWidth={0.5}
            title="Required"
            animationDuration={200}
            fontSize={13}
            errorColor="#FF0000"
            error={error.newPassword}
            onFocus={() => handleError('newPassword', null)}
            onChangeText={txt => setNewPassword(txt.trim())}
          />
        </View>
        <View
          style={{
            width: width * 0.85,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <TextField
            secureTextEntry={true}
            animationDuration={200}
            tintColor="#008080"
            baseColor="#D2D6DE"
            activeLineWidth={1}
            lineWidth={0.5}
            labelFontSize={13}
            fontSize={13}
            label="Confirm New Password *"
            keyboardType="text"
            title="Required"
            error={error.confirmPassword}
            errorColor="#FF0000"
            onFocus={() => handleError('confirmPassword', null)}
            onChangeText={txt => setConfirmPassword(txt.trim())}
          />
        </View>

        <TouchableHighlight
          underlayColor="#D2D6DE"
          onPress={handleChangePassword}
          style={{
            marginTop: 30,
            alignItems: 'center',
            backgroundColor:
              oldPassword?.length &&
              newPassword?.length &&
              confirmPassword?.length
                ? '#FF3F6C'
                : '#D2D6DE',
            padding: 14,
            justifyContent: 'center',
            alignSelf: 'center',
            width: width * 0.7,
            borderRadius: 5,
          }}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}>
            CHANGE PASSWORD
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
