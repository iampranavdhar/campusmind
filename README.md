## Campus Mind 📚

A Univeristy Manager App to manage all the daily activities of the university. It is a mobile application built using React Native and Expo. It has a backend built using NodeJs and ExpressJs. The database used is MongoDB Atlas. The app is deployed on Azure. The images are stored in Cloudinary. The app is built for both Android and iOS.

![1](https://user-images.githubusercontent.com/73348574/220139423-ff6520dd-1675-456a-9eb5-151d4e61c22c.png)

### Video Demo

[Demo Link]()

Show some ❤️ and 🌟 the repo to support the project

## Index ✏️

- [Campus Mind 📚](#campus-mind-)
  - [Video Demo](#video-demo)
- [Index ✏️](#index-️)
- [Features Of Campus Mind 🚀](#features-of-campus-mind-)
  - [Admin Features](#admin-features)
  - [Student Features](#student-features)
  - [Disclaimer](#disclaimer)
- [Setup 🔥](#setup-)
  - [Frontend Setup 🍧](#frontend-setup-)
    - [Troubleshooting](#troubleshooting)
  - [Backend Setup 🍿](#backend-setup-)
  - [Releasing the app](#releasing-the-app)
  - [FYI 📌](#fyi-)
- [Technologies 🛠](#technologies-)
- [Screenshots](#screenshots)
- [References 💻](#references-)
- [Author 📝](#author-)
- [Connect Me On 🌍](#connect-me-on-)
- [License 🏆](#license-)

## Features Of Campus Mind 🚀

### Admin Features

- Add a new student
- Add Assignments to the students with a deadline
- Add an event in the university
- Add an announcement to the students
- See the list of students
- Add Courses
- Add the images to the gallery

### Student Features

- To view the timetable for the day
- See and submit the assignments
- See the list of events
- See the list of announcements
- Get the details of the course
- Get Notifications for the assignments,event and announcements
- See the fee details
- Message your friends and teachers in the university
- Placement related details
- Gallery of the university

### Disclaimer

- The app is still under development and many features are yet to be added. And some screens are just for the UI purpose and are not connected to the backend yet. You are free to contribute to this project and make it better. If you want to contribute to this project, please read the [Contributing Guidelines](CONTRIBUTING.md) first.
- Feel free to raise an issue if you find any bug in the application
- Feel free to raise a feature request if you think any feature is missing in the application
- Feel free to fork the repository and make your own changes if you want to make the app better and use it for your own purpose

## Setup 🔥

- Fork the Repo

- Clone the repo to your local machine
  `git clone <repo-url>`

### Frontend Setup 🍧

1. Get into the chatapp directory
   `cd frontend`

2. Run `yarn` to install dependencies

3. Create a `.env` file and create variables as mentioned in the `.env.example` with the values
4. Set up a new project in firebase and get the `google-services.json` file and place it in the `android/app` directory and follow the instructions of firebase while generating the file [ For Notifications ]

5. Run `yarn andorid` to start the application in android emulator

#### Troubleshooting

- If you are getting an error null is not an object error, then you react-native-webview package might be not installed properly. To fix this, run `yarn add react-native-webview` and then run `yarn android` again.
- If you are facing the ViewPropTypes error, then might will be the react-native version problem. To fix this, run `yarn add deprecated-react-native-prop-types` and then go to `node_modules/react-native/index.js` replace from line 436 to four functions

with this:

```js
// Deprecated Prop Types
get ColorPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ColorPropType;
},

get EdgeInsetsPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
},

get PointPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').PointPropType;
},

get ViewPropTypes(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ViewPropTypes;
},
```

- In case of any other error try deleting the .gradle folder from the andorid and then run `yarn android` again

### Backend Setup 🍿

1. Get into backend directory `cd backend`

2. Run `yarn` to install dependencies

3. Create a MongoDB account and get the MONOGO_URL for connecting the server and the Database

4. Create a `.env` file and create variables as mentioned in the `.env.example` with the values

5. Run `nodemon server.js` to start the server [Should have installed nodemon globally]

### Releasing the app

1. Run `cd android && ./gradlew assembleRelease` to generate the release build of the app
2. You are done with the release build of the app 🎉🥳
3. Download your apk from `android/app/build/outputs/apk/release` which will be named as `app-release.apk`
4. Great! Now you can distribute this apk to anyone and they can install it on their android device, now its time to celebrate 🎉🎉. Please consider giving a star to this repo if you want me to make more such projects 😁

### FYI 📌

- The app is build using Expo and React Native and then ejected to use the native modules and better control over the app

## Technologies 🛠

- ReactNative
- NodeJs
- ExpressJs
- MongoDB Atlas
- Cloudinary
- AWS EC2
- Azure

## Screenshots

## References 💻

- [NodeJs Documentation](https://nodejs.org/en/docs/)
- [React Native Documentation](https://reactnative.dev/)
- [React Native Firebase Cloud Messaging](https://rnfirebase.io/messaging/usage)

## Author 📝

- [@iampranavdhar](https://www.github.com/iampranavdhar)

## Connect Me On 🌍

[![twitter badge](https://img.shields.io/badge/twitter-Pranavdhar-0077b5?style=social&logo=twitter)](https://twitter.com/iampranavdhar)<br/>
[![linkedin badge](https://img.shields.io/badge/linkedin-Pranavdhar-0077b5?style=social&logo=linkedin)](https://in.linkedin.com/in/sai-pranavdhar-reddy-nalamalapu-038104206)

## License 🏆

This repository is licensed under MIT License. Find [LICENSE](LICENSE) to know more
