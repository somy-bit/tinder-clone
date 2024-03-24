import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation, useRoute } from '@react-navigation/core'


const MatchScreen = () => {

  const naviagtion = useNavigation();
  const { params } = useRoute();

  const { swipedUser, loggedInProfile } = params;

  return (
    <View style={tw`flex-1  bg-red-500/80`}>
      <View style={tw`justify-center  px-8 pt-56`}>
        <Image
          style={tw`h-24 w-full`}
          source={{ uri: "https://links.papareact.com/mg9" }}
        />
      </View>

      <Text style={tw`text-white text-center mt-5`}>
        you and {swipedUser.name} are a match
      </Text>
      <View style={tw`flex-row justify-evenly mt-5`}>
        <Image
          source={{ uri: swipedUser.image }}
          style={tw`rounded-full w-32 h-32`}
        />
        <Image
          source={{ uri: loggedInProfile.image }}
          style={tw`rounded-full w-32 h-32`}
        />
      </View>
      <TouchableOpacity
      onPress={()=>naviagtion.navigate('chat')}
      style={tw`rounded-full mt-24 w-2/3 mx-auto px-10 py-5 bg-white`}>
        <Text style={tw`text-gray-500 font-bold text-center text-lg`}>
          send a message
        </Text>
        
      </TouchableOpacity>

    </View>
  )
}

export default MatchScreen