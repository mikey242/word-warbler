# Word Warbler

![logo](https://github.com/user-attachments/assets/55c1a70a-5b79-45dc-9c58-364e6150435d)

Word Warbler is a word guessing game built using [Tailwind CSS](https://tailwindcss.com) and [Create React App](https://create-react-app.dev/). Localization is provided by [i18next](https://www.i18next.com/).

## Languages

At the moment this project contains English and Dutch word lists which can both be found in `/src/constants/words.js`. Localization for the UI can be found in `/public/locales`.

## Word lists

Each language contains two lists `guessable` and `hidden`. The `hidden` list contains much more common words, whereas the `guessable` list contains as many valid 5-letter words as I could find. The game takes the hidden word from the `hidden` list but allows you to guess any word in the `guessable` list ensuring that the hidden word is not too obscure.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
