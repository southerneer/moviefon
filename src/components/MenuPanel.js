// @flow

import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

type Props = {

}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      {/* <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={[styles.scrollView]}
        > */}
        <Text>Hello</Text>
      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
