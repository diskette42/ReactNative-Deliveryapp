import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
export default function PreparingOrderScreen() {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 4000)
  }, [])
  return (
    <SafeAreaView className="bg-green-700 flex-1 justify-center items-center">
      <Animatable.Image
        source={require('../images/loading.gif')}
        className="w-66 h-66"
        animation={'bounceIn'}
        iterationCount={1}
      />
      <Animatable.Text
        className="text-xl font-bold text-white mb-8"
        animation="slideInUp"
        iterationCount={1}
      >
        Loading...
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  )
}
