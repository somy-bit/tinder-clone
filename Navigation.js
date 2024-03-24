import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
import MatchScreen from "./screens/MatchScreen";
import MessageScreen from "./screens/MessageScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const { userInfo } = useAuth();


    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userInfo ?
                    <>
                        <Stack.Group>
                            <Stack.Screen name="home" component={HomeScreen} />
                            <Stack.Screen options={{headerShown:false}} name="chat" component={ChatScreen} />
                            <Stack.Screen options={{headerShown:false}} name="match" component={MatchScreen} />
                            <Stack.Screen options={{headerShown:false}} name="message" component={MessageScreen} />


                        </Stack.Group>
                        <Stack.Group screenOptions={{presentation:'modal'}}>
                            <Stack.Screen options={{headerShown:false}} name="modal" component={ModalScreen} />
                        </Stack.Group>
                    </>
                    :
                    <Stack.Screen  name="login" options={{ headerShown: false }} component={LoginScreen} />
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation