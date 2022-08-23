import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

export default function RestaurantCard({ item }) {
  const navigation = useNavigation()
  const {
    image,
    name,
    short_description,
    rating,
    type: { name: typeName },
    address,
    dishes,
  } = item
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Restaurant', {
          image,
          name,
          short_description,
          rating,
          typeName,
          address,
          dishes,
        })
      }
      className="mr-2 shadow-sm rounded-lg bg-white"
    >
      <Image
        source={{
          uri: urlFor(image).url(),
        }}
        className="w-56 h-40 rounded-t-lg"
      />
      <View className=" flex-col space-y-2 py-2 ">
        <View>
          <Text className="font-bold">{name}</Text>
          <Text className="text-xs font-light text-gray-500">
            {short_description}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <StarIcon size={15} color="green" />
          <Text className="text-gray-500 text-xs">
            <Text className="text-green-500">{rating}</Text>. {typeName}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <LocationMarkerIcon size={15} color="gray" />
          <Text className="text-xs text-gray-500 ml-0.5">
            Nearby: {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
