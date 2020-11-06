Last updated: Nov 6 2020

# Firebase Functions Directory `./functions`

This folder contains cloud functions that will be deployed to firebase. It has its own `package.json`, and so should have its own `node_modules`, which should automatically be populated by running `npm install` in root directory.

Make sure `node_modules` exists before testing or emulating. Also note, any packages you need should be described in *this* `package.json` file, and not in the root file.

## Common Commands

These should be all run from the root folder

* Start firebase emulator: `npm run-script emulate`
* Run tests: `npm test` or `npm t`
* Deploy functions to firebase: `firebase deploy --only functions` or `npx firebase deploy --only functions` if you don't want firebase tools polluting your namespace

## Structure Explained 

* `index.js` exports the main firebase object containing the functions
* `src/` contains source for functions
* `src/firebase/` contains firebase functions. NOTE, these are not inlined because it is impossible to run tests without mocking them
* `src/utils/` contains other utility functions, such as generate-survey
* `__mocks__/` directories are present to hold mock files to ease testing
