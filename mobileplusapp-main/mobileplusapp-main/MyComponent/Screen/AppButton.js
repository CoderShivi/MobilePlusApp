import React,{useState,useEffect} from 'react';
import {Text,Dimensions,View,TextInput,TouchableOpacity} from 'react-native';
const {width,height}=Dimensions.get('window')


export default function AppButton({ fnwth, plft,borderwdth,brdcolor,Inputcolor,borderRadii,buttonText,btnWidth,bgcolor,...props}){
return(
    <TouchableOpacity {...props}>
<View style={{width:width*(btnWidth?btnWidth:1),
         backgroundColor:bgcolor?bgcolor:'#3498db',
         borderRadius:borderRadii?borderRadii:10,
         borderWidth: borderwdth? borderwdth:0.5,
         borderColor:brdcolor?brdcolor:'red',
        padding:10,
         marginTop:10,
         display:'flex',
         alignItems:'center',}}>
<Text style={{fontSize:14,fontWeight:fnwth?fnwth:'bold',color:Inputcolor?Inputcolor:'#fff',paddingLeft:plft?plft:0}}>
    {buttonText}</Text>
</View>
</TouchableOpacity>
)

}