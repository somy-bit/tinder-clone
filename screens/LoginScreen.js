import { SafeAreaView, TouchableOpacity, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'



const LoginScreen = () => {

  const { promptAsync } = useAuth();

  return (

    <SafeAreaView style={tw` flex-1 px-18 bg-red-400 items-center justify-center`} >
      <TouchableOpacity style={tw` rounded-lg bg-blue-500`} onPress={()=>promptAsync()}>
        <View style={tw`flex-row items-center p-4 justify-center `}>
          <Text style={tw`mr-4 font-semibold text-gray-100 text-center`}>Login With </Text>
          <Text style={tw`text-3xl font-bold text-gray-200 `}>G</Text>
          <Text style={tw`text-3xl font-bold text-blue-300`}>O</Text>
          <Text style={tw`text-3xl font-bold text-green-400`}>O</Text>
          <Text style={tw`text-3xl font-bold text-yellow-300`}>G</Text>
          <Text style={tw`text-3xl font-bold text-blue-300`}>L</Text>
          <Text style={tw`text-3xl font-bold text-gray-500`}>E</Text>
        </View>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default LoginScreen