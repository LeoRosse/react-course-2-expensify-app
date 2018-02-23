import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount',()=>{
    const state = filtersReducer(undefined,{type:'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date',()=>{
    const state = filtersReducer(undefined,{type:'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

/* test('should set set text filter by set text value',()=>{
    const state = filtersReducer(undefined,{type:'SET_TEXT_FILTER'});
    expect(state.text).toBe(undefined)
}); */

test('should set set text filter by set text value',()=>{
    const text = "This is my filter";
    const action = {
        type:'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(undefined,action);
    expect(state.text).toBe(text)
});

/* test('should set set start date filter by set startDate',()=>{
    const state = filtersReducer(undefined,{type:'SET_START_DATE'});
    expect(state.startDate).toBe(undefined)
});

test('should set set end date filter by set endDate',()=>{
    const state = filtersReducer(undefined,{type:'SET_END_DATE'});
    expect(state.endDate).toBe(undefined)
}); */

test('should set set start date filter by set startDate',()=>{
    const startDate=moment();
    const action = {
        type:'SET_START_DATE',
        startDate
    }
    const state = filtersReducer(undefined,action);
    expect(state.startDate).toEqual(startDate)
});

test('should set set start date filter by set startDate',()=>{
    const endDate=moment();
    const action = {
        type:'SET_END_DATE',
        endDate
    }
    const state = filtersReducer(undefined,action);
    expect(state.endDate).toEqual(endDate)
});