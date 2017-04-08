// @flow

import React from 'react'
import { Icon } from 'react-native-elements'

type Props = {
  isFavorite: boolean,
  favorite: Function,
}

export default ({isFavorite, favorite}: Props) => {
  const iconName = isFavorite ? 'heart' : 'heart-o'
  return (
    <Icon
      name={iconName}
      type="font-awesome"
      color="red"
      onPress={favorite}
      containerStyle={{marginHorizontal: 5}}
    />
  )
}
