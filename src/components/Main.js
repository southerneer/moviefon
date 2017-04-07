// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { compose, withState, withHandlers } from 'recompose'

import MovieList from './MovieList'

type Props = {
  getMore: Function,
  pending: boolean,
  search: Function,
  searchText: string,
  setSearchText: Function,
  movies: Object[],
  isGettingMore: boolean,
}

const App = (props: Props) => {
  const {getMore, search, searchText, setSearchText, movies, pending, isGettingMore} = props

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.search}
        clearButtonMode="always"
        editable={!pending}
        lightTheme
        onChangeText={setSearchText}
        onEndEditing={search}
        placeholder="Search"
        showLoadingIcon={pending}
        value={searchText}
      />
      <MovieList getMore={getMore} movies={movies} isGettingMore={isGettingMore} />
    </View>
  )
}

const enhance = compose(
  withState('pending', 'setPending', false),
  withState('listState', 'setListState', {hasMore: true, isGettingMore: false}),
  // withState('isGettingMore', 'setIsGettingMore', false),
  // withState('hasMore', 'setHasMore', true),
  withState('searchText', 'setSearchText', ''),
  withState('movies', 'setMovies', []),
  withState('nextPage', 'setNextPage', 2),
  withHandlers({
    search: (props) => async () => {
      const {searchText, setPending, setNextPage, movies, setMovies, setListState} = props
      setPending(true)
      setListState({hasMore: true, isGettingMore: false})
      setMovies([])
      setNextPage(2)
      const results = await searchMovies(searchText, 1)
      if (results) {
        setMovies(results)
      }
      setPending(false)
    },
    getMore: (props) => async () => {
      const {listState, movies, setMovies, searchText, nextPage, setListState, setNextPage} = props
      const {isGettingMore, hasMore} = listState

      if (!movies.length || isGettingMore || !hasMore) return

      // setIsGettingMore(true)
      setListState({...listState, isGettingMore: true})
      const results = await searchMovies(searchText, nextPage)
      if (results && results.length) {
        setMovies([...movies, ...results])
        setNextPage(nextPage + 1)
        setListState({hasMore: true, isGettingMore: false})
      } else {
        setListState({hasMore: false, isGettingMore: false})
      }
    },
  }),
)

const searchMovies = async (text, page) => {
  const params = [
    'type=movie',
    `s=${encodeURIComponent(text.trim())}`,
    `page=${page}`
  ]
  try {
    console.log('fetching', text, page)
    let result = await fetch(`http://www.omdbapi.com/?${params.join('&')}`, {
      method: 'GET',
    })
    result = await result.json()
    console.log('result', result.Search && result.Search.length)
    return result.Search
  } catch (err) {
    console.log('error', err)
    return null
  }
}

export default enhance(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  search: {

  },
  list: {
    flex: 1,
    marginTop: 0,
  }
})
