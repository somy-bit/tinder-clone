import { View, Text, FlatList } from 'react-native'
import React, { useEffect,useState } from 'react'
import { collection, onSnapshot, query ,where} from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import {db} from '../firebaseConfig'
import tw from 'twrnc'
import ChatRow from './ChatRow';

const ChatList = () => {

    const [matches, setMatches] = useState([]);
    const { userInfo } = useAuth()

    useEffect(() => {
        onSnapshot(query(collection(db, 'matches'), where('usersMatched', 'array-contains',userInfo.uid)),
        snapshot=> setMatches(snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))))
        
    }, [userInfo])


    return (
       matches.length > 0 ?

       <FlatList
       data={matches}
       keyExtractor={item=>item.id}
       renderItem={({item})=><ChatRow matchDetails={item} />}
       
       />
       :
       <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-xl font-bold text-gray-500 text-center`}>
            no matches yet !
        </Text>
       </View>
    )
}

export default ChatList