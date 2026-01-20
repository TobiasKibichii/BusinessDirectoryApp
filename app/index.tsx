import Colors from "@/services/Colors";
import { useRouter, useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Image, StyleSheet, Text, View, Button, Platform, TouchableOpacity} from 'react-native';
import { useSSO, useUser } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { axiosClient } from "@/services/GlobalApi";


// Preloads the browser for Android devices to reduce authentication load time
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}


// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()




export default function Index() {
  useWarmUpBrowser()
  
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const navigation = useNavigation();
  const router = useRouter();
  const {user} = useUser();
  console.log("Current User:", user);


  useEffect (() =>{
    navigation.setOptions({
      headerShown:false
    })
  }, [])


useEffect ( () => {
  user && CreateNewUser();
}, [user])


const CreateNewUser = async () =>{
  try{
    const response = await axiosClient.post('/user-lists', {
      data: {
        fullName: user?.fullName,
        email:user?.primaryEmailAddress?.emailAddress
      }
    })

    console.log("User created successfully:", response.data);

    router.push('/(tabs)/Home')
  }catch (e) {
    console.log(e)
    router.push('/(tabs)/Home')
  }
}

  
const onPress = useCallback(async () => {
 
    try {

     /* const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "businessdirectoryapp",
        path: "sso-callback"
      }) 

       console.log("Redirect URL:", redirectUrl); */

      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl:AuthSession.makeRedirectUri(),

      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Check for session tasks and navigate to custom UI to help users resolve them
          // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)

              // navigate to Home screen after successful sign in
              router.push('/')
              return
            }
            // No session tasks, navigate to the main app
            router.push('/')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])


  return (
    <View
      style={styles.container}
    >
      <Image source={require('./../assets/images/welcome.png')}
        style ={{width: '100%', height: 300, marginTop: 20, resizeMode: 'contain'}}
      />

      <Text style={styles.heading}>Welcome To</Text>
      <Text style={styles.heading}>Business Directory App</Text>

      <View
        style={{backgroundColor: Colors.WHITE, margin: 20,
        padding:20, borderRadius: 10}}
      >
        <Text style={{fontFamily:'appFontSemiBold', textAlign:'center', fontSize:15}}>Discover thousands of local businesses in one place.</Text>

        <TouchableOpacity onPress ={onPress} style ={[styles.button, {display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:10}]}>
          <Image source={require('../assets/images/google.png')}
          style={{width:20, height:20}}
          />
        <Text style={{fontFamily:'appFontSemiBold', textAlign:'center', fontSize:15}}>Sign In With Google</Text>
      </TouchableOpacity> 

        <View style ={[styles.button, {backgroundColor:Colors.PRIMARY}]}>
        <Text style={{fontFamily:'appFontSemiBold', textAlign:'center', fontSize:15, color:'white'}}>Skip</Text>
      </View>
      </View>
    <StatusBar hidden/>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.PRIMARY,
    height: '100%'
  },
  heading: {
    color:Colors.WHITE,
    fontSize: 25,
    fontFamily: 'appFontBold',
    textAlign: 'center',
  },
  button:{
    borderWidth:1,
    borderRadius:99,
    padding:4,
    marginTop:15
  }
})
