// @flow

import React from 'react'
import { Icon } from 'react-native-elements'

type Props = {
  isFavorite: boolean,
  favorite: Function,
  searchText: string,
}

export default ({isFavorite, favorite, searchText}: Props) => {
  const iconName = isFavorite ? 'heart' : 'heart-o'
  return searchText ? (
    <Icon
      name={iconName}
      type="font-awesome"
      color="red"
      onPress={favorite}
      containerStyle={{marginHorizontal: 10}}
    />
  ) : null
}
