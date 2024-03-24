import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


//ios:1013055613828-81n0l8dig3g0sm64p3rj28jb4j29kf31.apps.googleusercontent.com
//and:1013055613828-71ih35010d2lgalm67ookd4c6lo42pcn.apps.googleusercontent.com
const firebaseConfig = {
  apiKey: "AIzaSyDFMBoCiPBphDjh6HRGAWnc-2xSfPu9APY",
  authDomain: "tinder123-3470a.firebaseapp.com",
  projectId: "tinder123-3470a",
  storageBucket: "tinder123-3470a.appspot.com",
  messagingSenderId: "755754430074",
  appId: "1:755754430074:web:6c4d763c548c51b95b95c3"
};

const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
export const auth = getAuth(app)

export const db = getFirestore(app)