import { View, Text, TouchableOpacity, Image, StatusBar, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper'
import { collection, doc, getDocs,getDoc, onSnapshot, setDoc, where ,query, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import generateId from '../lib/generateId'




const HomeScreen = () => {

  const navigation = useNavigation();
  const swiperRef = useRef();

  const { logout, userInfo } = useAuth();

  const [profiles,setProfiles] = useState([])
  const [lastCard,setLastCard] = useState(false)


  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
    const unsub = onSnapshot(doc(db,'users',userInfo.uid),snapShot=>{
      if(!snapShot.exists())
      navigation.navigate('modal')
    })

    return ()=>unsub();

  }, [])


  useEffect(()=>{

    let unsub;

    const fetchProfile = async()=>{

      const passed = await getDocs(collection(db,'users',userInfo.uid,'passes')).then(
        snapshot=>snapshot.docs.map(doc=>doc.id)

      );

      const swipes =await  getDocs(collection(db,'users',userInfo.uid,'swipes')).then(
        snapshot=>snapshot.docs.map(doc=>doc.id)

      );

      const passedUsers = passed.length>0 ? passed :['test']
      const swipedUsers = swipes.length>0 ? swipes :['test']

      

      unsub = onSnapshot(
        query(
          collection(db,'users'),
          where('id','not-in',[...passedUsers,...swipedUsers])),
          
          snapShot=>{

        setProfiles(
          snapShot.docs.filter(doc=>doc.id !== userInfo.uid).map(doc=>({
            id:doc.id,
            ...doc.data()
          }))
        )
      })

    }

    fetchProfile();
    return unsub;
  },[db])

const swipeLeft =(index)=>{

  if(!profiles[index]) return

  const swipedUser = profiles[index]
  if(index == profiles.length-1)
  setLastCard(true)

  setDoc(doc(db,'users',userInfo.uid,'passes',swipedUser.id),swipedUser)

}

const swipeRight =async(index)=>{

  if(!profiles[index]) return

  const swipedUser = profiles[index]
  // if(index == profiles.length-1)
  // setLastCard(true)

  const loggedInProfile = await (
    await getDoc(doc(db,'users',userInfo.uid))
  ).data();

  // check if they swiped on us
  setDoc(doc(db,'users',userInfo.uid,'swipes',swipedUser.id),swipedUser)
  

  getDoc(doc(db,'users',swipedUser.id,'swipes',userInfo.uid)).then(docSnapshot=>{

    if(docSnapshot.exists()){

      //there is a match
      console.log('matchhhhhhhh')
      const mactchId = generateId(userInfo.uid,swipedUser.id)
      setDoc(doc(db,'matches',mactchId),{
        users:{
          [userInfo.uid]:loggedInProfile,
          [swipedUser.id]:swipedUser
        },
        usersMatched:[userInfo.uid,swipedUser.id],
        timeStamp : serverTimestamp()
      });

      navigation.navigate('match',{swipedUser,loggedInProfile})
    }else{

      console.log('wait for matchhhhhh')
    }
  })
  

}



  return (
    <SafeAreaView style={tw`pt-[${StatusBar.currentHeight}] flex-1`}>

      {/* header start */}

      <View style={tw`relative items-center`}>
        <TouchableOpacity onPress={logout} style={tw`absolute left-5 top-3`}>
          <Image source={{ uri: userInfo.photoURL }} style={tw`w-10 h-10 rounded-full`} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('modal')}>
          <Image style={tw`w-14 h-14 bg-transparent`} source={require('../assets/logo1.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('chat')} style={tw`absolute right-5 top-3`}>
          <Ionicons name='chatbubbles-sharp' size={35} style={tw`text-red-400`} />
        </TouchableOpacity>
      </View>


      {/* header end */}

      {/* cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swiperRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          animateCardOpacity
          verticalSwipe={false}
          cardIndex={0}
          stackSize={4}
          cards={profiles}
          onSwipedLeft={cardIndex=>{
            swipeLeft(cardIndex)
          }}
          onSwipedRight={cardIndex=>{
            swipeRight(cardIndex)
          }}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red'
                }
              }
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  textAlign: 'left',
                  color: "#4DED30"
                }
              }
            }
          }}
          renderCard={card => card?
            <View key={card.id} style={tw`bg-white relative h-3/4 rounded-xl`}>
              <Image source={{ uri: card.image }} style={tw`absolute right-0 top-0 h-full w-full rounded-xl`} />


              <View style={tw`absolute bottom-0 left-0 w-full bg-white py-4 px-4 rounded-b-xl flex-row items-center justify-between`}>
                <View style={tw``}>
                  <Text style={tw`font-semibold text-lg`}>{card.name}</Text>
                  <Text style={tw`text-gray-600`}>{card.job}</Text>
                </View>

                <Text style={tw`text-xl font-bold`}>{card.age}</Text>
              </View>

            </View>
            :
            <View style={tw`relative h-3/4 rounded-xl justify-center items-center bg-white`}>
              <Text style={tw`font-bold pb-5`}>OOps! No MoRe PrOfIlE</Text>
              <Image 
              source={{uri:'https://links.papareact.com/6gb'}}
              style={tw`w-20 h-20`}
             
              />
            </View>
          }
        />

        <View style={tw`flex-row items-center justify-evenly absolute bottom-0 w-full py-10 px-10`}>
          <TouchableOpacity
            onPress={() => swiperRef.current.swipeLeft()}
            style={tw`h-16 w-16 rounded-full bg-red-300 items-center justify-center`}>
            <Entypo name='cross' size={24} color='red' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => swiperRef.current.swipeRight()}
            style={tw`h-16 w-16 rounded-full bg-green-300 items-center justify-center`}>
            <AntDesign name='heart' color='green' size={24} />
          </TouchableOpacity>
        </View>
      </View>




    </SafeAreaView>
  )
}

export default HomeScreen