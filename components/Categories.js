import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import SanityClient, { urlFor } from '../sanity'
export default function Categories() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    SanityClient.fetch(
      `
      *[_type == 'category']
      `,
    ).then((data) => {
      setCategories(data)
    })
  }, [])
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((item, index) => {
        return (
          <CategoryCard
            imgUrl={urlFor(item.image).width(200).url()}
            title={item.name}
            key={index}
          />
        )
      })}
    </ScrollView>
  )
}
