import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = (
    { description = '',
        note = '',
        amount = 0,
        createdAt = 0 } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})
//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})
//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})
//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})
//Default State
const expensesReducerDefaultState = [];
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
//Expenses Reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            /*             return state.concat(action.expense) //così non sostituisce l'oggetto nell'array
             */
            return [...state, action.expense];//SPREAD OPERATOR
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) =>
                id !== action.id //mi ritorna true o false, quindi qua gli sto dicendo di ritornarmi false tutte le volte che l'id da cancellare è diverso dall'id che trova durante il filtraggio
            );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates // voglio sovrascrivere tutto così, quello che gli passo sotto
                    }
                }
                else { return expense };
            });
        default:
            return state;
    }
}
//Filters Reducer
const filtersReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state, //così gli dico che lo voglio sovrascrivere, non rimpiazzare con un'altro
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}

//Get Visible Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => { //così facendo li ordino in ordine temporale!!!!
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        }
        else if (sortBy === 'amount') { //così li ordino in base al prezzo
            return a.amount < b.amount ? 1 : -1
        }
    })
};

const store = createStore(
    combineReducers({ //si aspetta un'oggetto chiave valore, la chiave è la state root in questo caso expenses, il valore è il riduttore che deve manipolare le state
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffe', amount: 300, createdAt: -1000 }));
/*
store.dispatch(removeExpense({ id: expenseOne.expense.id }))
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
*/

// store.dispatch(setTextFilter('rent'));
/*
store.dispatch(setTextFilter(''));
*/
store.dispatch(sortByAmount()); //amout
// store.dispatch(sortByDate()); //date 

// store.dispatch(setStartDate(0))

// store.dispatch(setStartDate())

// store.dispatch(setEndDate(999))



const demoState = {
    expenses: [{
        id: 'jdhjshdsa',
        description: 'January Rent',
        note: 'This was the finale payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

/* const user = {
    name: 'Jen',
    age: 24
};

console.log({
    ...user,
    location:'Firenze',
    age:'30' // qui lo sovrascrive ED E' SEQUENZIALE PERCHE' E LO METTESSI PRIMA DEL ...user non sovrascrive un cazzo!!!!
});


 */