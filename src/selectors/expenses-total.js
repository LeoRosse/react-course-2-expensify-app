export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)//così mi trasforma un array di oggetti in un array di numeri
        .reduce((sum, value) => sum + value, 0);

};