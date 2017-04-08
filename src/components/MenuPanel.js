// @flow

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

type Props = {
  favorites: string[],
}

export default (props: Props) => {
  console.log('menupanl props', props)
  return (
    <View style={styles.container}>
      <Text>f</Text>
      {props.favorites.map(f => (
        <Text key={f}>{f}</Text>
      ))}

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
