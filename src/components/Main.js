// @flow

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { compose, withState, withHandlers } from 'recompose'
import _ from 'lodash'
import { Icon } from 'react-native-elements'
import SideMenu from 'react-native-side-menu'

import MovieList from './MovieList'
import SearchBox from './SearchBox'
import MenuPanel from './MenuPanel'
import FavoriteButton from './FavoriteButton'

type Props = {
  favorite: Function,
  getMore: Function,
  isFavorite: boolean,
  pending: boolean,
  search: Function,
  searchText: string,
  setSearchText: Function,
  movies: Object[],
  isGettingMore: boolean,
  // menuOpen: boolean,
  // toggleMenu: Function,
}

const App = (props: Props) => {
  return (
    <SideMenu
      // disableGestures
      // isOpen={props.menuOpen}
      menu={<MenuPanel />}
      // onChange={isOpen => actions.setMenuPanel(isOpen ? OPEN : CLOSED)}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          {/* <Icon name="bars" type="font-awesome" onPress={() => {
            console.log('pressed')
            props.toggleMenu(!props.menuOpen)
          }} /> */}
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
  // withState('menuOpen', 'toggleMenu', false),
  withState('isFavorite', 'setFavorite', false),
  withHandlers({
    search: (props) => async () => {
      const {searchText, setPending, setNextPage, setMovies, setListState} = props
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
    favorite: ({isFavorite, setFavorite}) => () => {
      setFavorite(!isFavorite)
      // @TODO: finish logic here
    }
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
  topRow: {
    flexDirection: 'row'
  }
})
