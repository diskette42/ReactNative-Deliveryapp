import {
  View,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsIcon,
  SearchIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'
export default function HomeScreen() {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == 'featured']{
          ...,
          restaurants[]->{
          ..., 
          dishes[]->,
          type->{
            name
          }
          
          }
        }
     `,
      )
      .then((data) => {
        setFeaturedCategories(
          data.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt)),
        )
      })
  }, [])

  return (
    <>
      <SafeAreaView className="bg-white" />
      <View className="bg-white fixed top-0">
        <View className="flex flex-row items-center justify-between w-full px-4 pt-2 pb-2">
          <View className="flex flex-row space-x-3 items-center ">
            <Image
              source={{
                uri: 'https://links.papareact.com/wru',
              }}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <View>
              <Text className="font-bold text-gray-500 text-xs">
                Deliver Now
              </Text>
              <Text className="font-bold text-xl">
                Currnt Location
                <ChevronDownIcon size={20} color="green" />
              </Text>
            </View>
          </View>
          <UserIcon size={30} color="green" />
        </View>

        {/* Search */}
        <View className="flex-row h-[40px] px-4 mb-2">
          <View className="flex flex-row space-x-2 bg-gray-200 flex-1 items-center">
            <SearchIcon color="gray" />
            <TextInput placeholder="Restaurant" keyboardType="default" />
          </View>
          <View className="flex items-center flex-row">
            <AdjustmentsIcon color="gray" />
          </View>
        </View>
      </View>
      <ScrollView className="bg-white">
        {/* Body */}
        <View className="bg-gray-100 pb-[85px]">
          {/* Header */}
          <ScrollView className="">
            <Categories />
          </ScrollView>

          {/* Featured */}

          {featuredCategories.map((category, index) => (
            <FeaturedRow
              key={index}
              title={category.title}
              description={category.short_description}
              restaurants={category.restaurants}
            />
          ))}
        </View>
      </ScrollView>
    </>
  )
}
