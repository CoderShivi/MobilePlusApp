import { View, Text } from 'react-native'
import {WebView} from 'react-native-webview';
import React from 'react'
import { ServerURL } from '../Services/FetchNodeServices';
export default function Bill({route}) {
   // console.log(route.params.orderid)
  return (
    <WebView
    source={{uri: `${ServerURL}/storelogin/Billshow?invoiceno=${route.params.orderid}`}}
    javaScriptEnabled={true}
  />
  )
}