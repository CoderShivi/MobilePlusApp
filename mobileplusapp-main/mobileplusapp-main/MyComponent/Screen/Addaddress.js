import {View, Text, Dimensions,BackHandler} from 'react-native';
import React, {useState,useEffect} from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { ServerURL,postData } from '../Services/FetchNodeServices';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native';

export default function Addaddress() {
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const pincodeData = useSelector(state => state.pincode[0]);
  const navigation=useNavigation()
  const [pincodeState, setPincodeState] = useState(pincodeData.pincode);
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState(pincodeData.area+","+pincodeData.city);
  const [state, setState] = useState(pincodeData.state);
  const [error, setError] = useState({});
  

  //alert(JSON.stringify(pincodeData.area))
  //console.log(pincodeData)




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


  const handleClickAddAddress = () => {
   // alert(JSON.stringify({pincodeState,address,locality,state}))
    if (validation()) {
      //alert(JSON.stringify({pincode,address,locality,state}))
    dispatch({
      type: 'ADD_ADDRESS',
      payload: {pincodeState, address, locality, state},
    });
   navigation.navigate('PaymentMethod')
  }
  };

  const validation = () => {
    var isValid = true;

    // if (oldPassword) {
    //   if (oldPassword !== userDetailList.password) {
    //     handleError('oldPassword', 'oldPassword  not matching.');
    //     isValid = false;
    //   } else {
    //     handleError('oldPassword', null);
    //   }
    // } else if (!oldPassword) {
    //   handleError('oldPassword', 'Please fill out this oldPassword.');
    //   isValid = false;
    // }
    if (!pincodeState) {
      handleError('pincode', 'Please fill out this pincode.');
      isValid = false;
    }
    
    if (!address) {
      handleError('address', 'Please fill out this address.');
      isValid = false;
    }

    if (!locality) {
      handleError('locality', 'Please fill out this locality.');
      isValid = false;
    }
    
   
    if (!state) {
      handleError('state', 'Please fill out this state.');
      isValid = false;
    }

    // if (confirmPassword) {
    //   if (confirmPassword !== newPassword) {
    //     handleError('confirmPassword', 'password  not matching.');
    //     isValid = false;
    //   } else {
    //     handleError('confirmPassword', null);
    //   }
    // } else if (!confirmPassword) {
    //   handleError('confirmPassword', 'Please fill out this confirmpassword.');
    //   isValid = false;
    // }

    return isValid;
  };

  const handleError = (inputs, value) => {
    setError(prev => ({...prev, [inputs]: value}));
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}
        style={{
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <MCI color="#282c3f" size={25} name="arrow-left" />
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            marginLeft: 10,
            fontWeight: 600,
            color: '#282c3f',
            fontSize: 14,
            letterSpacing: 0.5,
          }}>
          ADD NEW ADDRESS
        </Text>
      </TouchableOpacity>
      <View style={{padding: 20}}>
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            fontSize: 11,
            fontWeight: 'bold',
            letterSpacing: 0.3,
            color: '#424242',
          }}>
          ADDRESS
        </Text>
      </View>
      <View style={{width: width, backgroundColor: '#fff'}}>
        <View style={{padding: 20}}>
          <View
            style={{
              width: width * 0.9,
              alignSelf: 'center',
            }}>
            <OutlinedTextField
              inputContainerStyle={{height: 50}}
              maxLength={6}
              value={pincodeData.pincode}
              activeLineWidth={1}
              labelFontSize={13}
              label="Pin Code*"
              keyboardType="numeric"
              tintColor="#008080"
              baseColor="#D2D6DE"
              lineWidth={0.5}
              //formatText={txt => setPincode(txt.trim())}
              errorColor="#FF0000"
            error={error.pincode}
            onFocus={() => handleError('pincode', null)}
              onChangeText={txt => setPincodeState(txt.trim())}
              fontSize={13}
            />
          </View>
          <View
            style={{
              width: width * 0.9,
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <OutlinedTextField
              inputContainerStyle={{height: 50}}
              activeLineWidth={1}
              labelFontSize={13}
              label="Address(House No,Building,Street,Area)*"
              keyboardType="text"
              tintColor="#008080"
              baseColor="#D2D6DE"
              lineWidth={0.5}
              errorColor="#FF0000"
              error={error.address}
              onFocus={() => handleError('address', null)}
              onChangeText={txt => setAddress(txt.trim())}
              fontSize={13}
            />
          </View>
          <View
            style={{
              width: width * 0.9,
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <OutlinedTextField
              inputContainerStyle={{height: 50}}
              activeLineWidth={1}
              labelFontSize={13}
              value={pincodeData.area+","+pincodeData.city}
              label="Locality/Town*"
              keyboardType="text"
              errorColor="#FF0000"
              error={error.locality}
              onFocus={() => handleError('locality', null)}
              onChangeText={txt => setLocality(txt.trim())}
              tintColor="#008080"
              baseColor="#D2D6DE"
              lineWidth={0.5}
              fontSize={13}
            />
          </View>
          <View
            style={{
              width: width * 0.9,
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <OutlinedTextField
              inputContainerStyle={{height: 50}}
              activeLineWidth={1}
              labelFontSize={13}
              label="State*"
              value={pincodeData.state}
              keyboardType="text"
              errorColor="#FF0000"
              error={error.state}
              onFocus={() => handleError('state', null)}
              onChangeText={txt => setState(txt.trim() )}
              tintColor="#008080"
              baseColor="#D2D6DE"
              lineWidth={0.5}
              fontSize={13}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 10,
          backgroundColor: '#fff',
          marginTop: 'auto',
          elevation: 5,
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}>
        <TouchableOpacity
          onPress={() => handleClickAddAddress()}
          style={{
            alignItems: 'center',
            backgroundColor: '#FF3F6C',
            padding: 14,
            justifyContent: 'center',
            alignSelf: 'center',
            width: width * 0.9,
            borderRadius: 5,
          }}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}>
            ADD ADDRESS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
