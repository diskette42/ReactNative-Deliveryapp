import {
  View,
  Text,
  ScrollView,
  ViewBase,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import RestaurantCard from './RestaurantCard'

export default function FeaturedRow({ title, description, restaurants }) {
  return (
    <View className="mt-2">
      <View className="mx-4">
        <Text className="text-xl font-bold">{title}</Text>
        <Text className="text-xs font-light">{description}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {restaurants.map((item, index) => {
          return <RestaurantCard item={item} key={index} />
        })}
      </ScrollView>
    </View>
  )
}
