// @flow

import React from 'react'
import { SearchBar } from 'react-native-elements'

type Props = {
  search: Function,
  pending: boolean,
  setSearchText: Function,
  searchText: string,
}

const SearchBox = ({pending, setSearchText, search, searchText,}: Props) => (
  <SearchBar
    containerStyle={{flex: 1}}
    clearButtonMode="always"
    editable={!pending}
    lightTheme
    onChangeText={setSearchText}
    onEndEditing={search}
    placeholder="Search"
    showLoadingIcon={pending}
    value={searchText}
  />
)

export default SearchBox
