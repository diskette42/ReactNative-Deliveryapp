import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function MyCartIcon({ restaurantName }) {
  const navigation = useNavigation()
  const basket = useSelector((state) => state.basket.basket)
  const count = useMemo(() => {
    return basket.reduce((acc, item) => acc + item.count, 0)
  }, [basket])
  const price = useMemo(() => {
    return basket.reduce((acc, item) => acc + item.count * item.price, 0)
  }, [basket])

  if (count == 0) return

  return (
    <View className="p-4 w-full absolute bottom-0 pb-[80px]">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Basket', {
            restaurantName,
          })
        }
        className="w-full bg-green-700 rounded-lg  p-4"
      >
        <View className="flex flex-row justify-between items-center">
          <Text className="bg-white text-green-700 py-1 px-2 rounded">
            {count}
          </Text>
          <Text className="text-white font-bold text-lg">My Cart</Text>
          <Text className="text-white font-bold text-lg">฿{price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
