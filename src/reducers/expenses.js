//Default State
const expensesReducerDefaultState = [];

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
};

export default expensesReducer;