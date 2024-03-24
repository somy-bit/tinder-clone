import { View, Text ,StatusBar,TouchableOpacity} from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Ionicons,Foundation } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'

const Header = ({ title, callEnabled }) => {

    const navigation = useNavigation()
    return (
        <View style={tw`p-2 justify-between items-center flex-row pt-[${StatusBar.currentHeight}]`}>
            <View style={tw`flex-row flex gap-x-8 items-center pt-3`}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw``}>
                    <Ionicons name='chevron-back-outline' size={36} color='#ff5864' />
                </TouchableOpacity>
                <Text style={tw`text-xl font-semibold text-gray-700`}>{title}</Text>
            </View>

            {callEnabled && 
            <TouchableOpacity style={tw`rounded-full  bg-red-200 py-2 px-3 mr-4`}>
                <Foundation name='telephone' size={20} color='red' />
            </TouchableOpacity>
            }
        </View>
    )
}

export default Header