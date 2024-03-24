import { View, Image, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import useAuth from '../hooks/useAuth'
import { TouchableOpacity } from 'react-native'
import { db } from '../firebaseConfig'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const ModalScreen = () => {

    const { userInfo } = useAuth();

    const navigation = useNavigation();

    const[image,setImage] = useState();
    const[job,setJob] = useState();
    const[age,setAge]=useState();

    const IncompleteForm = !job || !age || !image

    const uploadProfile = ()=>{

        setDoc(doc(db,'users',userInfo.uid),{
            id:userInfo.uid,
            name:userInfo.displayName,
            job:job,
            image:image,
            age:age,
            timeStamp:serverTimestamp()
        }).then(()=>navigation.navigate('home'))
        .catch(er=>console.log(er.message))
    }


    return (
        <View style={tw`flex-1 pt-4 items-center`}>
            <Image
                source={{ uri: 'https://links.papareact.com/2pf' }}
                style={tw`h-20 w-full`}
                resizeMode='contain'
            />
            <Text style={tw`text-gray-500 text-xl font-bold mb-8 p-2`}>Welcome {userInfo.displayName}</Text>

            
                <Text style={tw`text-center font-semibold text-red-300 text-lg`}>Step 1: Upload A Profile Picture</Text>
                <TextInput 
                value={image}
                onChangeText={text=>setImage(text)}
                style={tw`text-center`} placeholder='your image url' />

                <Text style={tw`mt-8 text-center font-semibold text-red-300 text-lg`}>Step 2: What IsYour Occupation?</Text>
                <TextInput 
                value={job}
                onChangeText={text=>setJob(text)}
                style={tw`text-center`} placeholder='Enter Your Ocuupation' />

                <Text style={tw`mt-8 text-center font-semibold text-red-300 text-lg`}>Step 3: How Old Are You?</Text>
                <TextInput 
                value={age}
                keyboardType='numeric'
                onChangeText={text=>setAge(text)}
                style={tw`text-center`} placeholder='Enter Your Age' />

                <TouchableOpacity 
                onPress={uploadProfile}
                disabled={IncompleteForm} style={[tw`w-64 p-3 rounded-xl absolute bottom-10`,IncompleteForm ? tw`bg-gray-400`: tw` bg-red-400`]}>
                    <Text style={tw`text-white text-center font-bold text-xl`} >Upload Profile</Text>
                </TouchableOpacity>
           
        </View>
    )
}

export default ModalScreen