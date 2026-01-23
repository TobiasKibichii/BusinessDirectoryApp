import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking, Share } from 'react-native'
import { BusinessType } from '../Homescreen/PopularBusinessList'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/services/Colors';

type Props ={
    business:BusinessType
}

export default function ActionButtonSection({business}: Props) {

  const onNavigateClick = async () =>{
    const nativeUrl = Platform.OS == 'ios'? `maps:0,0?q=${business.address}` : `geo:0,0?q=${business.address}`

    await Linking.openURL(nativeUrl)
  }

  const onCallClick = async () =>{
    const callUrl = `tel:${business.phone}`

    await Linking.openURL(callUrl)
  }

  const onWebsiteClick = async () =>{
    const websiteUrl = business?.website.startsWith('http')?business?.website : `https:${business?.website}`

    await Linking.openURL(websiteUrl)
  }
  
  const onShareClick = async () =>{
    const result = await Share.share({
        message:'Check Out This Local Business: \n' +
        'Business Name:' + business?.name
    })  
  }

  return (
    <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:10,
            
        }}>

        <TouchableOpacity onPress={() => onNavigateClick()}>
            <View style={styles.container}>
                <Ionicons name="navigate" size={24} color={Colors.YELLOW} />
            </View>
            <Text style={styles.actionText}>Navigate</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onWebsiteClick()}>
            <View style={styles.container}>
                <Ionicons name="globe" size={24} color={Colors.YELLOW}/>
            </View> 
            <Text style={styles.actionText}>Website</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCallClick}>
            <View style={styles.container}>
                <Ionicons name="call" size={24} color={Colors.YELLOW} />
            </View>
            <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onShareClick}>
            <View style={styles.container}>
                <Ionicons name="share-social" size={24} color={Colors.YELLOW} />
            </View>
            <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15
    },
    actionText:{
        fontFamily:'appFontSemiBold',
        textAlign:'center',
        marginTop:2
    }
})