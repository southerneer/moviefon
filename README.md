# MovieFōn

## Installation
* Clone the git repo locally
* `npm install`
* `npm run ios` - runs the app in an iOS simulator (requires XCode on a Mac)
* `npm run android` - runs the app in an Android simulator
* ...or download [the Expo app](https://expo.io/), `npm start`, and use the app to snap the QR code displayed in the terminal

## The app
![moviefon](https://cloud.githubusercontent.com/assets/3681859/24831586/6cbdda4a-1c51-11e7-9028-e50c963af6e4.gif)

* Type your movie title search in the bar and hit return to run it
* The list scrolls "infinitely". Since [OMDB API](http://www.omdbapi.com/) calls only return 10 results at a time it's a bit clunky, but the app should continuously pull results as you scroll until the query runs out or it reaches 1000 results (the API limit)
* Pressing the heart icon saves the query in your favorites list
* Access your favorites and history list by swiping from the left side of the screen

## The code
* [Create React Native App](https://github.com/react-community/create-react-native-app): ever since I heard about this at [React Conf 2017](https://www.youtube.com/watch?v=S8HXkEnA48g) I've been wanting to try it out for myself. Being able to dive in and start writing React components with minimal setup/configuration is a huge win.
* [Recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops): The concept of higher-order components makes writing and maintaining React codebases a lot easier. It cleanly separates functionality from presentation.
* [React Native Elements](https://github.com/react-native-training/react-native-elements): Design is definitely not my forté so any help I can get in that domain is welcome. For an MVP-type app this library provides a nice UI foundation quickly.

## TODOs
* I really wanted to try out [the new and improved ListView variants](https://facebook.github.io/react-native/blog/2017/03/13/better-list-views.html) in react-native 0.43. I would have gone with [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) for this demo, but Expo and create-react-app haven't quite had time to update to the new RN release yet.
* As mentioned above, I'm no designer so this demo could use some better styling. A nice shadow effect on the right edge of the side menu, a little more color and accents here and there. But hey, it's just a demo.
* The scale of this app didn't really necessitate a full-on navigation solution, but if I did come back to it I'd probably try out [React Navigation](https://reactnavigation.org/), [React Native Navigation](https://github.com/wix/react-native-navigation), or even cook up something with the native flavor of [React Router v4](https://reacttraining.com/react-router/native/guides/quick-start) if I got really ambitious.
