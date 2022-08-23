import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { XIcon } from 'react-native-heroicons/solid'
import * as Progress from 'react-native-progress'
import { useDispatch, useSelector } from 'react-redux'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { clearBasket } from '../redux/actions/basketAction'
export default function DeliveryScreen() {
  const basket = useSelector((state) => state.basket.basket)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cancelOrder = () => {
    navigation.navigate('Home')
    dispatch(clearBasket())
  }
  return (
    <View className="bg-green-700 flex-1">
      <SafeAreaView>
        <View className="flex-row justify-between p-4 items-center">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XIcon size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-light">Order Help</Text>
        </View>

        <View className="bg-white p-4 m-4 rounded-lg">
          <View className="flex-row">
            <View className="flex-1">
              <Text className="text-gray-400">Estimated Arrival</Text>
              <Text className="font-bold text-3xl mt-1">30-60 Minutes</Text>
            </View>
            <Image
              source={require('../images/cooking.gif')}
              className="w-[50px] h-[50px]"
            />
          </View>
          <Progress.Bar indeterminate={true} color="green" className="mt-2" />
          <Text className="mt-2 font-bold text-gray-400">
            you order at {basket[0].restaurantName}.
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: -6.219739,
          longitude: 106.827156,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 mt-10 z-0"
        mapType="muteStandard"
      >
        <Marker
          coordinate={{
            latitude: -6.219739,
            longitude: 106.827156,
          }}
          title={basket[0].restaurantName}
          description={basket[0].restaurantName}
          identifier="origin"
          pinColor="green"
        ></Marker>
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-2 h-28 ">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">Diskette42</Text>
          <Text className="text-gray-400">Your Driver</Text>
        </View>
        <TouchableOpacity onPress={cancelOrder}>
          <Text className="text-lg font-bold text-green-700 p-4 ">Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}
