import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="mr-2 relative ">
      <Image source={{ uri: imgUrl }} className="w-16 h-16 rounded" />
      <Text className="absolute bottom-0 left-1 text-white font-bold text-xs">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
