import { Tabs, useNavigation } from 'expo-router'
import { useEffect } from 'react';
import { View, Text } from 'react-native'
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/services/Colors';

export default function TabLayout() {

  const navigation = useNavigation();

  useEffect(() =>{
    navigation.setOptions({headerShown: false})
  })

  return (
    <Tabs screenOptions ={{
      headerShown:false,
      tabBarActiveTintColor: Colors.PRIMARY
      }}>
      <Tabs.Screen name ='Home'
       options={{
        tabBarIcon: ({color,size}) => <Octicons name="home" size={size} color={color} />
       }}
      />
      <Tabs.Screen name ='Explore' 
        options={{
        tabBarIcon: ({color,size}) => <Octicons name="search" size={24} color={color} />
       }}
      />
      <Tabs.Screen name ='Favorite'
        options={{
        tabBarIcon: ({color,size}) => <MaterialIcons name="favorite-border" size={24} color={color} />
       }}
      />
      <Tabs.Screen name ='Profile'
        options={{
        tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="face-woman-profile" size={24} color={color} />
       }}
      />
    </Tabs>
  )
}