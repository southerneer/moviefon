// @flow

import React from 'react'
import { ActivityIndicator, ListView, StyleSheet, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { compose, withHandlers, withState, withPropsOnChange } from 'recompose'

type Props = {
  dataSource: Object,
  getMore: Function,
  movies: Object[],
  renderFooter: Function,
  isGettingMore: boolean,
}

const MovieList = (props: Props) => (
  <ListView
    dataSource={props.dataSource}
    renderRow={movie => (
      <ListItem
        key={movie.imdbID}
        title={movie.Title}
        avatar={{uri:movie.Poster}}
        subtitle={`Release Year: ${movie.Year}`}
        hideChevron
      />
    )}
    automaticallyAdjustContentInsets={false} // this is iOS only
    keyboardDismissMode="on-drag"
    keyboardShouldPersistTaps="always"
    showsVerticalScrollIndicator={false}
    initialListSize={20}
    pageSize={10}
    style={styles.list}
    enableEmptySections
    onEndReached={props.getMore}
    onEndReachedThreshold={500}
    renderFooter={props.renderFooter}
  />
)

const getNewDataSource = () => (new ListView.DataSource({rowHasChanged: (m1, m2) => m1.imdbID !== m2.imdbID}))

const enhance = compose(
  withState('dataSource', 'setDataSource', getNewDataSource()),
  withPropsOnChange(['movies'], (props: Props) => {
    const {dataSource, movies} = props
    let newDS = movies.length ? dataSource.cloneWithRows(movies) : getNewDataSource()
    return {
      ...props,
      dataSource: newDS
    }
  }),
  withHandlers({
    renderFooter: ({isGettingMore, movies}: Props) => () => {
      if (!movies.length) {
        return (<Text style={styles.placeholder}>Movies will show here after a search</Text>)
        // return (<ActivityIndicator style={styles.activity} size="large" />)
      } else {
        if (isGettingMore) return (<ActivityIndicator size="small" />)
        else return null
      }
    }
  }),
)

export default enhance(MovieList)

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 0,
  },
  placeholder: {
    marginVertical: 30,
    color: '#DCDDDF',
    alignSelf: 'center'
  },
  activity: {
    marginVertical: 10
  }
})
