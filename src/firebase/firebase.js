import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDvRuTL81lKJ-vd6Mv91R4qVgO2WFs6qcQ",
    authDomain: "expensify-leo.firebaseapp.com",
    databaseURL: "https://expensify-leo.firebaseio.com",
    projectId: "expensify-leo",
    storageBucket: "expensify-leo.appspot.com",
    messagingSenderId: "856755925768"
  };

  firebase.initializeApp(config);

  firebase.database().ref().set({
    name: 'Leonardo Rosseti'
  });