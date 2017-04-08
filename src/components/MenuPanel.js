// @flow

import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-elements'

type Props = {
  favorites: string[],
  history: string[],
  loadSearch: Function,
}

const TextLink = ({loadSearch, text}) => (
  <TouchableOpacity  onPress={() => loadSearch(text)}>
    <Text>{text}</Text>
  </TouchableOpacity>
)

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <Text h3>Favorites</Text>
      {props.favorites.map(f => (
        <TextLink loadSearch={props.loadSearch} text={f} key={'k' + f} />
      ))}

      <View style={{marginTop: 20}}>
        <Text h3>History</Text>
        {props.history.map(h => (
          <TextLink loadSearch={props.loadSearch} text={h} key={'h' + h} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    // borderColor: LIGHT_GREY,
    // borderWidth: 1,
  },
  footer: {
    height: 40,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  scrollView: {
    // justifyContent: 'space-between',
  },
})
