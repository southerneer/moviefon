// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { compose, withState, withHandlers, withProps, } from 'recompose'
import _ from 'lodash'
import { SideMenu, Text } from 'react-native-elements'

import MovieList from './MovieList'
import SearchBox from './SearchBox'
import MenuPanel from './MenuPanel'
import FavoriteButton from './FavoriteButton'

type Props = {
  changeText: Function,
  favorite: Function,
  favoriteList: string[],
  getMore: Function,
  history: string[],
  loadSearch: Function,
  isFavorite: boolean,
  pending: boolean,
  search: Function,
  searchText: string,
  movies: Object[],
  listState: Object,
}

const App = (props: Props) => {
  const {changeText, favorite, favoriteList, getMore, isFavorite, history, listState, loadSearch, movies, pending, search, searchText} = props
  return (
    <SideMenu menu={<MenuPanel favorites={favoriteList} history={history} loadSearch={loadSearch} />}>
      <View style={styles.container}>
        <Text h2 style={styles.heading}>MovieFōn</Text>
        <View style={styles.topRow}>
          <SearchBox search={search} pending={pending} changeText={changeText} searchText={searchText} />
          <FavoriteButton isFavorite={isFavorite} favorite={favorite} searchText={searchText} />
        </View>
        <MovieList getMore={getMore} movies={movies} isGettingMore={listState.isGettingMore} />
      </View>
    </SideMenu>
  )
}

const enhance = compose(
  withState('pending', 'setPending', false),
  withState('listState', 'setListState', {hasMore: true, isGettingMore: false, nextPage: 2}),
  withState('searchText', 'setSearchText', ''),
  withState('movies', 'setMovies', []),
  withState('favoriteList', 'setFavoriteList', []),
  withState('history', 'setHistory', []),
  withProps((props) => ({
    ...props,
    isFavorite: props.searchText !== '' && props.favoriteList.includes(props.searchText)
  })),
  withHandlers({
    changeText: ({setSearchText, setMovies}) => (text) => {
      if (text === '') setMovies([])
      setSearchText(text)
    },
    search: (props) => async () => {
      const {history, searchText, setHistory, setPending, setMovies, setListState} = props
      if (searchText === '') return
      setPending(true)
      setListState({hasMore: true, isGettingMore: false, nextPage: 2})
      const results = await searchMovies(searchText, 1)
      if (results) {
        setMovies(results)
        setHistory(_.union(history, [searchText]))
      }
      setPending(false)
    },
    getMore: (props) => async () => {
      const {listState, movies, setMovies, searchText, setListState} = props
      const {isGettingMore, hasMore} = listState

      if (!movies.length || isGettingMore || !hasMore) return

      setListState({...listState, isGettingMore: true})
      const results = await searchMovies(searchText, listState.nextPage)
      if (results && results.length) {
        setMovies([...movies, ...results])
        setListState({hasMore: true, isGettingMore: false, nextPage: listState.nextPage + 1})
      } else {
        setListState({hasMore: false, isGettingMore: false})
      }
    },
    favorite: ({isFavorite, setFavoriteList, favoriteList, searchText}) => () => {
      if (searchText === '') return
      if (isFavorite) {
        setFavoriteList(favoriteList.filter(f => f !== searchText))
      } else {
        setFavoriteList([
          ...favoriteList,
          searchText
        ])
      }
    },
  }),
  withHandlers({
    loadSearch: ({search, setSearchText}) => (text) => {
      setSearchText(text)
      // @HACK
      setTimeout(search, 200)
    }
  })
)

const searchMovies = async (text, page) => {
  const params = [
    'type=movie',
    `s=${encodeURIComponent(text.trim())}`,
    `page=${page}`
  ]
  try {
    let result = await fetch(`http://www.omdbapi.com/?${params.join('&')}`, {
      method: 'GET',
    })
    result = await result.json()
    return result.Search
  } catch (err) {
    console.error('error', err)
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
  heading: {
    alignSelf: 'center',
    marginVertical: 10,
    color: 'pink',
  },
  topRow: {
    flexDirection: 'row'
  }
})
