import moment from 'moment';

//Get Visible Expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        /*         const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
                const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate; */
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
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