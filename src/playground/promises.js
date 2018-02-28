const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('This is my resolved data');
        // resolve('This is my other resolved data'); questo me lo ignora, passare solo una volta resolve o reject.. più di una vengono ignorati completamente
        /*         resolve({
                    name: 'Leonardo',
                    age: 30
                }); */
        reject('Something was wrong')
    }, 4000)
});

console.log('before')

promise.then((data) => {
    console.log('1', data)
}).catch((error) => {
    console.log('error: ', error)
});


/* SHORT CUT 
promise.then((data) => {
    console.log('1', data)
}, (error) => {
    console.log('error: ', error)
}) */

console.log('after')