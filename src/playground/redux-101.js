import { createStore } from 'redux';

// Action generators - functions that return action objects

const add = ({a,b},c)=> {
    return a + b + c ;
}
console.log(add({a:1,b:12},100));


/* const incrementCount = ({payload}={}) => ({
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy: 1
})
  */
  const incrementCount = ({incrementBy=1}={}) => ({
    type: 'INCREMENT',
    incrementBy
})
 

const decrementCount = ({decrementBy=-1}={}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount =({count}) => ({
    type:'SET',
    count
})

const resetCount= ()=> ({
    type:'RESET',
})

//Reducers
//1. Reducers are pure functions gli output sono completamente determinati dagli input

/* let a = 10;
const add = (a, b)=> {
    return a+b
} 
se invece scrivessi 
let result;
const add = (a,b)=> {
    result = a+b
}
non avrei una funzione pura perché dipende da qualcosa (result) che è definito fuori dagli input a,b

2. Never change state or action

*/


const countReducer = (state={count:0},action)=>{
    switch (action.type){
        case 'INCREMENT':
        // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
        return {
            count: state.count +action.incrementBy
        };
        case 'DECREMENT':
        // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
        return {
            count: state.count -action.decrementBy
        }
        case 'SET':
        return {
            count : action.count
        }
        case 'RESET':
        return {
            count: 0
        }
        default:
        return state;
    }

/*     if(action.type==='INCREMENT'){
        return {
            count: state.count +1
        }
    }else{
        return state;
    }
    return state; */
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
}) //questa funzione è chiamata ogni singola volta che lo store cambia!


//adesso cambiamo il valore con actions

// Actions - than an object that gets sent to the store
/* store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
}); */
store.dispatch(incrementCount({incrementBy:5}));
/* unsubscribe(); //è sequenziale, così facendo annullo l'effetto degli ultimi tre dispatch
 */

store.dispatch(incrementCount());

store.dispatch(decrementCount({decrementBy:10}));

store.dispatch(resetCount());

store.dispatch(setCount({count:101}));

