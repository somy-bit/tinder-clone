
import React, { createContext, useContext ,useState,useEffect, useMemo} from 'react'
import "react-native-gesture-handler"

import * as Google from "expo-auth-session/providers/google"
import * as Web from "expo-web-browser"
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential
} from "firebase/auth"
import {auth} from '../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from 'firebase/auth'


Web.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [userInfo,setUserInfo] = useState()
  const [isLoading,setIsLoading] = useState(false)

  const [request,response,promptAsync] = Google.useAuthRequest({
    iosClientId:'1013055613828-81n0l8dig3g0sm64p3rj28jb4j29kf31.apps.googleusercontent.com',
    androidClientId:'1013055613828-71ih35010d2lgalm67ookd4c6lo42pcn.apps.googleusercontent.com'
  })

const checkLocalUser = async()=>{

  try{
    setIsLoading(true)
    const userJson = await AsyncStorage.getItem('@user');
    const UserData = userJson ? JSON.parse(userJson) : null;
    setUserInfo(UserData)

  }catch(er){
    alert(er.message)
  }finally{
    setIsLoading(false)
  }
}

useEffect(()=>{

    if(response?.type == "success") {

      const {id_token} = response.params;
      const credentials = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth,credentials)
    }

  },[response])

  useEffect(()=>{
    checkLocalUser();
    const unsub = onAuthStateChanged(auth , async(user)=>{

      if(user){

        console.log('user...............',JSON.stringify(user,null,2))
        setUserInfo(user)
        await AsyncStorage.setItem('@user',JSON.stringify(user));
        console.log('info--------------',JSON.stringify(userInfo))

      }else{
        console.log('failed')
      }

    })

    return ()=>unsub();
  },[])

  const logout = async()=>{

    await signOut(auth);
    await AsyncStorage.clear();
    setUserInfo(null)
  }

  const memoedValues = useMemo(()=>({
    userInfo,
    setUserInfo,
    isLoading,
    setIsLoading,
    promptAsync,
    logout
  }),[userInfo,isLoading])


    return (
        <AuthContext.Provider value={{
            userInfo,
            setUserInfo,
            isLoading,
            setIsLoading,
            promptAsync,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export default function useAuth(){

    return useContext(AuthContext)
} 