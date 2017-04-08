# MovieFōn

## Installation
* Clone the git repo locally
* `npm install`
* `npm run ios` - runs the app in an iOS simulator (requires XCode on a Mac)
* `npm run android` - runs the app in an Android simulator
* ...or download [the Expo app](https://expo.io/), `npm start`, and use the app to snap the QR code displayed in the terminal

## The app
* Type your movie title search in the bar and hit return to run it
* The list scrolls "infinitely". Since [OMDB API](http://www.omdbapi.com/) calls only return 10 results at a time it's a bit clunky, but the app should continuously pull results as you scroll until the query runs out or it reaches 1000 results (the API limit)
* Pressing the heart icon saves the query in your favorites list
* Access your favorites and history list by swiping from the left side of the screen
