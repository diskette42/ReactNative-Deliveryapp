import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  StarIcon,
  XIcon,
} from 'react-native-heroicons/solid'
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import { useSelector } from 'react-redux'
import MyCartIcon from '../components/MyCartIcon'

export default function RestaurantScreen() {
  const {
    params: {
      image,
      name,
      short_description,
      rating,
      typeName,
      address,
      dishes,
    },
  } = useRoute()

  const navigation = useNavigation()
  const basket = useSelector((state) => state.basket.basket)
  console.log({ basket })
  const initEditDish = {
    dishes: [],
    isOpen: false,
  }
  const [openEditDish, setOpenEditDish] = useState(initEditDish)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const chooseDish = (dish) => {
    const countOfthisDish = basket.filter((item) => item._id == dish._id)
    if (countOfthisDish.length > 0) {
      return setOpenEditDish({
        dishes: [...countOfthisDish],
        isOpen: true,
      })
    }
    const { name: dishName, short_description, price, image } = dish
    navigation.navigate('Dish', {
      restaurantName: name,
      dish,
      name: dishName,
      short_description,
      price,
      image,
    })
  }

  return (
    <>
      <ScrollView className="flex-1 ">
        <View className="relative">
          <View className=" z-80 h-full absolute top-0 lef-0"></View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="w-full h-56 "
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-5 bg-gray-100 rounded-full p-2"
          >
            <ArrowLeftIcon size={20} color="green" />
          </TouchableOpacity>

          <View className="bg-white pt-4 ">
            <View className="px-4">
              <Text className="text-3xl font-bold">{name}</Text>
              <View className="flex flex-row space-x-2">
                <View className="flex-row items-center space-x-1">
                  <StarIcon size={15} color="green" />
                  <Text className="text-gray-500 text-xs">{rating}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <LocationMarkerIcon size={15} color="gray" />
                  <Text className="text-gray-500 text-xs">{address}</Text>
                </View>
              </View>
              <Text className="mt-2 text-xs font-light text-gray-500">
                {short_description}
              </Text>
            </View>
            <TouchableOpacity className=" mt-4 border-y border-gray-400">
              <View className="p-4 flex-row justify-between items-center ">
                <View className="flex-row items-center space-x-2">
                  <QuestionMarkCircleIcon size={25} color="gray" />
                  <Text className="text-xl font-bold">
                    Have a food allergy?
                  </Text>
                </View>
                <ChevronRightIcon size={25} color="green" />
              </View>
            </TouchableOpacity>
          </View>
          {/* Menu */}
          <View className="pb-[160px]">
            <Text className="text-2xl font-bold p-4">Menu</Text>
            <View className="bg-white">
              {dishes.map((dish, index) => (
                <TouchableOpacity key={index} onPress={() => chooseDish(dish)}>
                  <DishRow
                    dish={dish}
                    name={dish.name}
                    short_description={dish.short_description}
                    price={dish.price}
                    image={dish.image}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <MyCartIcon restaurantName={name} />
      {openEditDish.isOpen && (
        <View className="bg-gray-300 absolute bottom-0 pb-[60px] w-full rounded-t-lg ">
          <TouchableOpacity
            className="w-full flex-row justify-between px-4 pt-4"
            onPress={() => setOpenEditDish(initEditDish)}
          >
            <Text className="text-xl font-bold">
              {openEditDish.dishes[0].name}
            </Text>
            <XIcon size={20} color="gray" />
          </TouchableOpacity>
          {openEditDish.dishes.map((dish, index) => (
            <View key={index} className="p-4 ">
              <View>
                <View className="flex-row mt-3">
                  <View className="flex-row space-x-1 flex-1">
                    <Text>{dish.count}</Text>
                    <View>
                      <Text>
                        {!dish.requestMessage
                          ? 'No Additional Request'
                          : dish.requestMessage}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Dish', {
                            restaurantName: name,
                            dish,
                            name: dish.name,
                            short_description: dish.short_description,
                            price: dish.price,
                            image: dish.image,
                            editDish: dish,
                          })
                          setOpenEditDish(initEditDish)
                        }}
                      >
                        <Text className="text-green-700 font-bold">Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text>{dish.count * dish.price}</Text>
                </View>
              </View>
            </View>
          ))}

          <View className="px-4 mt-5">
            <TouchableOpacity
              onPress={() => {
                const findedDish = dishes.find(
                  (item) => item._id == openEditDish.dishes[0]._id,
                )
                navigation.navigate('Dish', {
                  restaurantName: name,
                  dish: findedDish,
                  name: findedDish.name,
                  short_description: findedDish.short_description,
                  price: findedDish.price,
                  image: findedDish.image,
                })
                setOpenEditDish(initEditDish)
              }}
              className="bg-green-700 w-full p-4  rounded-lg flex-row justify-center "
            >
              <Text className=" font-bold text-white text-lg">Add Another</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}
