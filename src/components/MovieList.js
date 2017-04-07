import React from 'react'
import { ListView, StyleSheet, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { compose, withHandlers, withState, withPropsOnChange } from 'recompose'

type Props = {
  dataSource: Object,
  getMore: Function,
  renderFooter: Function,
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
    onEndReachedThreshold={100}
    renderFooter={props.renderFooter}
  />
)

const getNewDataSource = () => (new ListView.DataSource({rowHasChanged: (m1, m2) => m1.imdbID !== m2.imdbID}))

const enhance = compose(
  withState('nextPage', 'setNextPage', 2),
  withState('dataSource', 'setDataSource', getNewDataSource()),
  withPropsOnChange(['movies'], (props) => {
    const {dataSource, movies} = props
    console.log('withPropsOnChange', movies.length)
    let newDS = movies.length ? dataSource.cloneWithRows(movies) : getNewDataSource()
    return {
      ...props,
      dataSource: newDS
    }
  }),
  withHandlers({
    renderFooter: ({isGettingMore}) => () => {
      return (
        <Text>{isGettingMore ? 'Retrieving!' : 'no more'}</Text>
      )
    }
  }),
)

export default enhance(MovieList)

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 0,
  }
})
