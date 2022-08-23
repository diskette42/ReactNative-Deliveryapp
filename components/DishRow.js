import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function DishRow({
  dish,
  name,
  short_description,
  price,
  image,
}) {
  const [count, setCount] = useState(0)
  const navigation = useNavigation()
  const basket = useSelector((state) => state.basket.basket)

  const dishCount = useMemo(() => {
    if (basket.length == 0) return 0
    let count = 0
    for (let i = 0; i < basket.length; i++) {
      if (basket[i]._id == dish._id) {
        count += parseInt(basket[i].count)
      }
    }
    return parseInt(count)
  }, [basket, basket.length])

  return (
    <View className="flex flex-row p-4">
      <View className="flex-1">
        <View className="flex-row space-x-1">
          <Text className="text-xl">{name}</Text>
          <View className="bg-green-700 rounded flex-row items-center">
            <Text className={` ${dishCount > 0 && 'px-2'}`}>
              {dishCount > 0 && dishCount}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-gray-500">{short_description}</Text>
        <Text className="text-xs text-gray-500 mt-2">{price} ฿</Text>
      </View>
      <Image
        source={{ uri: urlFor(image).url() }}
        className="w-16 h-16 border border-gray-400"
      />
    </View>
  )
}
