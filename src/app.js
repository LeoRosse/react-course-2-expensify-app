import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
// import { setTextFilter } from './actions/filters'
import {login,logout} from './actions/auth'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { setTimeout } from 'timers';
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase';
// import './playground/promises';

import LoadingPage from './components/LoadingPage';

const store = configureStore();
/* store.dispatch(addExpense({ description: 'Water Bill', amount: 100}));
store.dispatch(addExpense({ description: 'Gas Bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500}));
/* store.dispatch(setTextFilter('Water'));

setTimeout(()=>{
    store.dispatch(setTextFilter('Bill'));

},3000)

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses); */

/* in parentesi graffa a linea 24 il nome dello store che vado a dichiarare a linea 13 */

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

//logica per la autenticazione e per il logout
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid)); //così ho settato l'id dell'utente che fa il login
        store.dispatch(startSetExpenses()).then(() => {
            ReactDOM.render(jsx, document.getElementById('app'))
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        })
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});