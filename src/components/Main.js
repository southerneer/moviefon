// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { compose, withState, withHandlers, withProps, } from 'recompose'
import _ from 'lodash'
import { SideMenu } from 'react-native-elements'

import MovieList from './MovieList'
import SearchBox from './SearchBox'
import MenuPanel from './MenuPanel'
import FavoriteButton from './FavoriteButton'

type Props = {
  favorite: Function,
  favoriteList: string[],
  getMore: Function,
  history: string[],
  loadSearch: Function,
  isFavorite: boolean,
  pending: boolean,
  search: Function,
  searchText: string,
  setSearchText: Function,
  movies: Object[],
  isGettingMore: boolean,
}

const App = (props: Props) => {
  const {favoriteList, history, loadSearch} = props
  return (
    <SideMenu menu={<MenuPanel favorites={favoriteList} history={history} loadSearch={loadSearch} />}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <SearchBox {..._.pick(props, ['search', 'pending', 'setSearchText', 'searchText'])} />
          <FavoriteButton {..._.pick(props, ['isFavorite', 'favorite'])} />
        </View>
        <MovieList {..._.pick(props, ['getMore', 'movies', 'isGettingMore'])} />
      </View>
    </SideMenu>
  )
}

const enhance = compose(
  withState('pending', 'setPending', false),
  withState('listState', 'setListState', {hasMore: true, isGettingMore: false}),
  withState('searchText', 'setSearchText', ''),
  withState('movies', 'setMovies', []),
  withState('nextPage', 'setNextPage', 2),
  withState('favoriteList', 'setFavoriteList', []),
  withState('history', 'setHistory', []),
  withProps((props) => ({
    ...props,
    isFavorite: props.searchText !== '' && props.favoriteList.includes(props.searchText)
  })),
  withHandlers({
    search: (props) => async () => {
      const {history, searchText, setHistory, setPending, setNextPage, setMovies, setListState} = props
      if (searchText === '') return
      setPending(true)
      setListState({hasMore: true, isGettingMore: false})
      setMovies([])
      setNextPage(2)
      const results = await searchMovies(searchText, 1)
      if (results) {
        setMovies(results)
        setHistory(_.union(history, [searchText]))
      }
      setPending(false)
    },
    getMore: (props) => async () => {
      const {listState, movies, setMovies, searchText, nextPage, setListState, setNextPage} = props
      const {isGettingMore, hasMore} = listState

      if (!movies.length || isGettingMore || !hasMore) return

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
      search()
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
  topRow: {
    flexDirection: 'row'
  }
})
