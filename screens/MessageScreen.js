import { View, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Button, KeyboardAvoidingView, Platform, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import ReceivedMessage from '../components/ReceivedMessage'
import SentMessage from '../components/SentMessage'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebaseConfig'



const MessageScreen = ({ route }) => {

    const { params } = route
    const{userInfo} = useAuth()

    console.log('messages', userInfo)
    const { matchDetails } = params;
    const [input, setInput] = useState()
    const [messsage, setMessages] = useState([])

    useEffect(()=>{

        onSnapshot(query(collection(db,'matches',matchDetails.id,'messages'),orderBy('timeStamp','desc'))
        ,snapShot=>{setMessages(snapShot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        })));})

        console.log('.......::::::::....::::::.....:::..',messsage[1].image)

    },[matchDetails,db])



    const sendMessage =  () => { 
        addDoc(collection(db,'matches',matchDetails.id,'messages'),{
            message:input,
            userId:userInfo.uid,
            displayName:userInfo.displayName,
            timeStamp:serverTimestamp(),
            image:userInfo.photoURL
        })

        setInput('')
    }




    return (
        <SafeAreaView style={tw`flex-1`}>
            <Header callEnabled={true} title={matchDetails?.job} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={10}
                style={tw`flex-1`}
            >
                <TouchableWithoutFeedback onPress={null}>
                    <FlatList
                        style={tw`pl-4`}
                        data={messsage}
                        inverted={true}
                        keyExtractor={item=>item.id}
                        renderItem={({item:message})=>
                    message.userId === userInfo.uid ? 
                
                    <SentMessage  key={message.id} message={message}/>
                    
                    :
                    
                    <ReceivedMessage key={message.id} message={message}/>
                    
                    }
                    />
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>

                <View style={tw` flex-row  w-full px-5 py-3 items-center justify-between border-t border-gray-200 bg-white z-60`}>
                    <TextInput
                        style={tw`flex-1 h-10 text-lg text-left `}
                        value={input}
                        placeholder='send a message'
                        onSubmitEditing={sendMessage}
                        onChangeText={(text) => setInput(text)}
                    />
                    <Button onPress={sendMessage} title='send' color='#ff5864' />
                </View>
            


        </SafeAreaView>
    )
}

export default MessageScreen