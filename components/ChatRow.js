import { TouchableOpacity, View,Image,Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import useAuth from '../hooks/useAuth'
import getMatchesUser from '../lib/getMatchesUser'
import { useNavigation } from '@react-navigation/native'

const ChatRow = ({ matchDetails }) => {

    const{userInfo} = useAuth();
    const [matchInfo,setMatchInfo] =useState()
    const navigation = useNavigation()

    useEffect(()=>{
        const userData = {...matchDetails.users}
        delete userData[userInfo.uid]
        
        setMatchInfo(Object.values(userData).map(val=>val)[0])
        console.log('====================>>>>',matchDetails)

    },[matchDetails,userInfo])
    

    return (
        <TouchableOpacity  
        onPress={()=>navigation.navigate('message',{matchDetails})}
        style={tw`mx-2 px-2 py-3 flex-row rounded-lg bg-white`}>
            <View style={tw`m-2`}>
                <Image
                    source={{ uri:matchInfo?.image}}
                    style={tw`rounded-full w-14 h-14`}
                />
            </View>

            <View style={tw`justify-center ml-3 `}>
                <Text style={tw`text-lg font-bold`}>
                    {matchInfo?.job}
                </Text>
                <Text>
                   
                   say hello!
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export default ChatRow