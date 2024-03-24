import "react-native-gesture-handler"
import React from 'react'
import Navigation from "./Navigation";
import  { AuthProvider } from "./hooks/useAuth";






export default function App() {


  return (
    
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

