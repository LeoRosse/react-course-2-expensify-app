import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense, editExpense,
    RemoveExpense, removeExpense,
    setExpenses, startSetExpenses,
    startRemoveExpense, startEditExpense
} from '../../actions/expenses';
import uuid from 'uuid';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisIsMyTestUserID'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk]);

//create dummy date in database test
beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({ id, description, amount, createdAt, note }) => {
        expenseData[id] = { description, note, amount, createdAt };
    })
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    })
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore({defaultAuthState});
    const id = expenses[0].id;
    const updates = {
        amount: 21045
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
            expect(snapshot.val().amount).toBe(updates.amount);
            done();
        })
    })
})

test('should setup add expense action object with provided values', () => {
    /*     const expenseData = {
            description: 'Rent',
            amount: 109500,
            createdAt: 1000,
            note: 'This was last month rent'
        }; */
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        /*         expense: {
                    ...expenseData,
                    id: expect.any(String)
                } */
        expense: expenses[2]
    })
});

test('should add expense to database and store', () => {
    const store = createMockStore({defaultAuthState});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expenses.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({defaultAuthState});
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expenses.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
    })
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('should fetch data from firebase', () => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const store = store.getActions();
        expect(actions[0]).toEqual({
            tipe: 'SET_EXPENSES',
            expenses
        });
        done();
    })
});

/* test('should setup add expense action object with default values', () => {
    const expense = {
        id:'',
        description: '',
        amount: 0,
        createdAt: 0,
        note: ''
    };
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id:expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
}); */