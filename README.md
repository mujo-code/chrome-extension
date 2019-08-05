# Mujō

Mujō is a Chrome Extension built in React. It slow gets rid of items that you use until you take a break. Slowly trying to get you to do a breathing exercise.

## Technology

- [React](https://github.com/facebook/react)
- [Create React App](https://github.com/facebook/create-react-app)
- [EmotionJS](https://emotion.sh/docs/)
- [Box](https://github.com/mujo-code/box)

## Setup

Install then start-up the dev server.

```shell
git clone <repository-url>
cd Mujō-extension # or folder name you give it
npm install
```

## Running

To start and build the application.

```shell
npm start
```

## Installing into Chrome

- Go to [chrome://extensions/](chrome://extensions/) and turn on developer mode
- Click Load unpacked and select `/build` directory from this app
- Enjoy the extension!

> Each change will be rebuilt automatically if your server is running, you will need to refresh and changes to the public folder require a reload of the chrome application.

## Releases

For the [Chrome Webstore](https://chrome.google.com/webstore/category/extensions) all you have to upload is a zip file of the build. This is somewhat automated using the dist script.

```shell
npm run dist
```

Running `dist` should output a file like **`Mujo-1.3.0.zip`** which is `${shortname}-${version}.zip`. This is the zip file you would upload to the store.

### BETA

To build the dist for BETA run.

```shell
npm run dist:beta
```

Running `dist:beta` has some additional logic to change the icon, and name to be different then production, and also produces a zip file like `BETAMujo-1.3.0.0001.zip` so that way a BETA zip is not accidentally uploaded to production.
