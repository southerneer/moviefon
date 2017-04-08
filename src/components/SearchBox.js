// @flow

import React from 'react'
import { SearchBar } from 'react-native-elements'

type Props = {
  search: Function,
  pending: boolean,
  changeText: Function,
  searchText: string,
}

const SearchBox = ({pending, changeText, search, searchText,}: Props) => (
  <SearchBar
    containerStyle={{flex: 1}}
    clearButtonMode="always"
    editable={!pending}
    lightTheme
    onChangeText={changeText}
    onEndEditing={search}
    placeholder="Search by title"
    showLoadingIcon={pending}
    value={searchText}
  />
)

export default SearchBox
