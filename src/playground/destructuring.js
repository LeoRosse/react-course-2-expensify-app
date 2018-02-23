const person = {
    // name: 'Leonardo',
    age: 30,
    location: {
        city: 'Firenze',
        temp: 1
    }
}

const { name: firstName = 'Leonardo', age } = person;
/* 
la linea sopra è equivalente a queste due!!
const name = person.name;
const age = person.age; */

console.log(`${firstName} is ${age}`);

const { city, temp: temperature } = person.location; //posso anche rinominarle in questo modo
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`)
}


const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}


const { name: publisherName = 'Self-Published' } = book.publisher; //la variabile publisherName va a prendere in principio il valore di book.publisher.name, se non trova nulla mi ritorna 'Self Published'

console.log(publisherName); // Penguin, Self-Published


// Array destructuring 

const address = ['Via Guelfa', 'Firenze', 'Toscana', '50100'];

const [, città, state = 'Toscana'] = address;

console.log(`You are ${città} in ${state}`)

const item = ['Coffe (hot)', '$2.00', '$2.50', '$2.75'];

const [nameCoffe, smallPrice, mediumPrice, largePrice] = item;

console.log(`A medium ${nameCoffe} costs ${mediumPrice}`)