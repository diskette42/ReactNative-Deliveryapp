import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { XIcon } from 'react-native-heroicons/solid'
import { TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToBasket,
  clearBasket,
  removeFromBasket,
} from '../redux/actions/basketAction'

export default function DishScreen() {
  const navigation = useNavigation()
  const {
    params: {
      restaurantName,
      dish,
      name,
      short_description,
      price,
      image,
      editDish,
    },
  } = useRoute()
  console.log({ restaurantName })
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket.basket)
  // const dishCount = Object.keys(basket.basket) && basket.basket[dish._id].count
  const [count, setCount] = useState(editDish ? editDish?.count : 1)
  const [requestMessage, setRequestMessage] = useState(
    editDish ? editDish?.requestMessage : '',
  )
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  const removeDishToBasket = () => {
    setCount((prevCount) => (prevCount != 0 ? prevCount - 1 : 0))
    // dispatch(removeFromBasket(basket, dish))
  }
  const addDishToBasket = () => {
    setCount((prevCount) => prevCount + 1)

    // dispatch(addToBasket(dish))
  }

  const handleRequestChange = (text) => {
    setRequestMessage(text)
  }
  const alertShouldClear = () => {
    Alert.alert('You are on another restaurant', 'Clear the basket first', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearBasket())
          navigation.goBack()
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ])
  }
  const addCart = async () => {
    try {
      // const id = dish._id + '-' + requestMessage.replace(/[\. ,:-]+/g, '-')
      const dishOrder = {
        ...dish,
        count: count,
        requestMessage: requestMessage,
        restaurantName,
      }
      let key = ''
      if (editDish) {
        key = 'updated'
      } else {
        key = 'added'
      }
      const res = await dispatch(addToBasket(basket, dishOrder, key))
      console.log(res)
      if (res.message == 'clear') {
        await alertShouldClear()
      } else {
        return navigation.goBack()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <ScrollView className="relative">
        <View className=" min-h-full flex flex-col justify-between pb-[130px]">
          <View>
            <View className="relative flex-1">
              <Image
                source={{ uri: urlFor(image).url() }}
                className="w-full h-56"
              />
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="absolute top-12 left-5 bg-gray-100 rounded-full p-2"
              >
                <XIcon color="green" />
              </TouchableOpacity>
            </View>
            <View className="flex flex-col">
              <View>
                <View className=" border-b border-gray-500">
                  <Text className="p-4 font-bold text-2xl">{name}</Text>
                </View>
                <View>
                  <View className="p-4 flex flex-col space-y-2">
                    <Text>Additional Request</Text>
                    <TextInput
                      placeholder="Eg.No meat,No cheese"
                      keyboardType="default"
                      className="border border-gray-500 p-2 rounded placeholder:!text-gray-500"
                      onChangeText={handleRequestChange}
                      value={requestMessage}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="px-4 w-full ">
            <View className=" flex flex-row justify-center items-center  space-x-2">
              <TouchableOpacity onPress={removeDishToBasket}>
                <MinusCircleIcon color="gray" size={40} />
              </TouchableOpacity>
              <Text className="text-xl">{count}</Text>
              <TouchableOpacity onPress={addDishToBasket}>
                <PlusCircleIcon color="gray" size={40} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="rounded p-4 absolute bottom-10 w-full "
        onPress={addCart}
      >
        <View className="bg-green-700  rounded-lg flex flex-row justify-between p-4 !shadow-2xl">
          <Text className="font-bold text-white text-lg">
            {editDish ? 'Update Cart' : 'Add to Cart'}
          </Text>
          <Text className="font-bold text-white text-lg">
            ฿ {price * count}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}
