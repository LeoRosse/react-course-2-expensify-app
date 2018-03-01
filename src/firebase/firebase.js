import * as firebase from 'firebase';
import { setTimeout } from 'timers';
import moment from 'moment';

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

/* const firebaseExpenses = {
  expenses: {
    1: { //l'id fa da chiave
      description: 'Gum',
      note: '',
      amount: 195,
      createdAt: 0
    },
    2: {
      description: 'Rent',
      note: '',
      amount: 109500,
      createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    3: {
      description: 'Credit Card',
      note: '',
      amount: 4500,
      createdAt: moment(0).add(4, 'days').valueOf()
    }
  }
}

database.ref('expenses').push(firebaseExpenses); */

// database.ref('notes/L6QzuQlstGowPldUXcp').remove();

//IN QUESTO MODO MI RITORNA INDIETRO UN ARRAY DI OGGETTI CON FIREBASE
/* database.ref('expenses')
  .once('value')
  .then((snapshot) => {
    const expenses = [];
    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    console.log(expenses)
  }); */

/* //COSI' POSSO MODIFICARE I VALORI DELL'OGGETTO DENTRO L'ARRAY
database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];
  snapshot.forEach((childShapshot) => {
    expenses.push({
      id: childShapshot.key,
      ...childShapshot.val()
    });
  });
  console.log(expenses)
}); */

/* //COSI' RIMUOVO UN FIGLIO
database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val())
});

//COSI' MODIFICO UN FIGLIO
database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val())
});

//COSI' AGGIUNGO UN FIGLIO
database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val())
}); */

/* database.ref('expenses').push({
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0
}) */

/* database.ref('expenses').push({
  description: 'Rent',
  note: '',
  amount: 109500,
  createdAt: moment(0).subtract(4, 'days').valueOf()
})
database.ref('expenses').push({
  description: 'Credit Card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf()
}) */

/* 
con il metodo push!!
database.ref('notes').push({
  title: 'To do',
  body: 'Go for a sex sessions!'
}) */

/* 
const firebaseNotes = {
  notes: {
    asdasf: { //l'id fa da chiave
      title: 'First Note',
      body: 'This is my note'
    },
    asdsafdsg:{
      title: 'Second Note',
      body: 'This is my note'
    }
  }
}
//purtroppo firebase non lavora con gli array, dobbiamo pensarla in un altra maniera
const notes = [{
  id: 12,
  title: 'First Note',
  body: 'This is my note'
},
{
  id: 13,
  title: 'Second Note',
  body: 'This is my note'
}]

database.ref('notes').set(notes); */

/* database.ref() //se non ci metto niente dentro ref mi ritorna tutto l'oggetto nel db.. se mettessi ad esempio location/city mi ritorna la stringa Firenze
  .once('value')
  .then((snapshot) => {
    const val = snapshot.val();
    console.log(val)
  }).catch((e) => {
    console.log('Error fetching data', e)
  }) */

//con questo metodo invece viene renderizzato ogni volta che il dato cambia
/* database.ref().on('value', (snapshot) => {
  console.log(snapshot.val());
}) */

/* 
setTimeout(() => {
  database.ref('age').set(31)
}, 3500)

setTimeout(() => {
  database.ref('age').off() //questo metodo non fa più sovrascrivere il parametro
}, 3500)

setTimeout(() => {
  database.ref('age').set(32)
}, 3500) */

/*  database.ref().on('value', (snapshot) => {
  console.log(snapshot.val());
  console.log(`${snapshot.val().name} is a ${snapshot.val().job.title} at ${snapshot.val().job.company}`);
}) */

/* setTimeout(() => {
  database.ref('job/company').set('Google')
}, 6000) */

//per settare parametri nel database 
/* database.ref().set({
  name: 'Leonardo Rosseti',
  age: 30,
  isSingle: false,
  stressLevel: 6,
  job: {
    title: 'Web Developer',
    company: 'Namaqua'
  },
  location: {
    city: 'Firenze',
    country: 'Italia'
  }
}).then(() => {
  console.log('Data is saved!')
}).catch((e) => {
  console.log('This failed.', e)
})
 */

/* //per rimuovere un paramatro
var isSingle = database.ref('isSingle');

isSingle.remove().then(() => {
  console.log('Remove Succeeded')
}).catch((e) => {
  console.log('Remove failed; ', e)
}) */


/* //per aggiornare un parametro
database.ref().update({
  name: 'Gheorgh Inviluppo',
  age: 31,
  job: 'Keyborder',
  isSingle: null,
  'location/city':'New York' //per aggiornare parametri innestati dentro a oggetti
});
 */

/* database.ref().update({
  stressLevel: 9,
  'job/company': 'Google',
  'location/city': 'New York'
}); */

// database.ref().set('This is my data.')

/*così facendo riscrivo tutto il db
database.ref().set({
  age: 31
}) */

/* //così cambio solo il parametro age
database.ref('age').set(31);
database.ref('location/city').set('New York') */


/* database.ref('attributes').set({
  height: 170,
  weight: 65
}).then(() => {
  console.log('Second set call worked.')
}).catch((e)=>{
  console.log('Thigs didnt for the second error.', e)
}) */

// console.log('I made a request to change the data');