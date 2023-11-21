import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const storeData=async(key,body)=>{
try{ 
    //console.log(body)
    AsyncStorage.setItem(key,JSON.stringify(body))
}catch(e)
{   
    console.log("Error for" +key ,e)
}
}

export const getStoreData=async(key)=>{
    try{
        var data= await AsyncStorage.getItem(key)
        return(JSON.parse(data))
    }catch(e)
    { return null
        console.log("Error for"+key,e)
    }
}

export const removeStoreData=async(key)=>{
    try{
       await  AsyncStorage.removeItem(key)
      
    }catch(e)
    {
        console.log("Error for"+key,e)
    }
}