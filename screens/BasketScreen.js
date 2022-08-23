import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native'
import React, { useMemo } from 'react'
import { XIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { clearBasket, removeFromBasket } from '../redux/actions/basketAction'
import { urlFor } from '../sanity'

export default function BasketScreen() {
  const {
    params: { restaurantName },
  } = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket.basket)

  const subtotal = useMemo(() => {
    return basket.reduce((acc, item) => acc + item.count * item.price, 0)
  }, [basket])

  const clearTheBasket = () => {
    dispatch(clearBasket())
    navigation.navigate('Home')
  }
  const removeItemFormBasket = (dish) => {
    dispatch(removeFromBasket(basket, dish))
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full p-4 flex-col items-center relative bg-white">
        <Text className="text-lg font-bold">Basket</Text>
        <Text className="text-gray-500">{restaurantName}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute bg-green-700 p-1 rounded-full  right-2 top-4"
        >
          <XIcon color="white" size={25} />
        </TouchableOpacity>
      </View>
      <View className="py-5">
        <View className="bg-white p-4 flex-row items-center">
          <View className="flex-row items-center space-x-2 flex-1">
            <Image
              source={{
                uri: 'https://links.papareact.com/wru',
              }}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <Text className=" font-bold">Delivery in 30-60 min</Text>
          </View>
          <TouchableOpacity onPress={clearTheBasket}>
            <Text className="font-bold text-green-700">Clear Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="">
        {basket.map((item, index) => (
          <View key={index} className="bg-white p-4 flex-row items-center">
            <View className="flex-row items-center space-x-2 flex-1">
              <Text className="text-green-700">x{item.count}</Text>
              <Image
                source={{
                  uri: urlFor(item.image).url(),
                }}
                className="h-7 w-7 bg-gray-300 p-4 rounded-full"
              />
              <View>
                <Text className=" font-bold">{item.name}</Text>
                <Text className=" text-gray-500">{item.requestMessage}</Text>
              </View>
            </View>
            <View>
              <Text>฿ {item.count * item.price}</Text>
              <TouchableOpacity onPress={() => removeItemFormBasket(item)}>
                <Text className="font-bold text-green-700">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="p-4  bg-white w-full flex-col space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-500">SubTotal</Text>
          <Text className="text-gray-500">฿ {subtotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Delivery Fees</Text>
          <Text className="text-gray-500">฿ 25</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-lg font-bold">Order Total</Text>
          <Text className="text-lg font-bold">฿ {subtotal + 25}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PreparingOrder')}
          className="w-full bg-green-700 p-4 rounded"
        >
          <Text className="font-bold text-lg text-white text-center">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
