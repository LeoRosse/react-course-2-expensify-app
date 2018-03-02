import authReducer from '../../reducers/auth';


//should add an expense
test('should add user id', () => {
    const action = {
        type: 'LOGIN',
        uid: '123'
    }
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid)
});

test('should remove user id', () => {
    const action = {
        type: 'LOGOUT',
    }
    const state = authReducer({ uid: 'anithing' }, action);
    expect(state).toEqual({})
});