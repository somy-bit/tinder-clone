import { View, Text,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
const ReceivedMessage = ({message}) => {
  console.log('from inside messages componenet',message.image)
  return (
    <View style={[tw`bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14`,{alignSelf:'flex-start'}]}>
      <Image 
     style={tw`absolute top-0 -left-14 w-12 h-12 rounded-full`}
     source={{uri:message.image}}
     />
      <Text style={tw`text-white`}>{message.message}</Text>
    </View>
  )
}

export default ReceivedMessage