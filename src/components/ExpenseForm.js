import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
//const date = new Date(); "the API is orrible"

/* const now = moment();
console.log(now.format('DD MM YY')) */

export default class ExpenseForm extends React.Component {
    constructor(props) {
        //così facendo sto settando contemporaneamente il form per l'add e l'edit... 
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({
            description
        }));
    };
    /*  così funziona il metodo dopo è shorthand.. utilizza il metodo persist per non far spaccare l'evento e.target che viene utilizzato in callback
    onNoteChange = (e) => {
            const note = e.target.value;
            this.setState(()=>({
                note
            }))
        } */
    onNoteChange = (e) => {
        e.persist();
        this.setState(() => ({ note: e.target.value }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { // questo per avere fino a due cifre decimali dopo la virgola e non avere lettere nella digitazione!
            this.setState(() => ({ amount }))
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            // Set error state equal to 'Please provide description and amount.'
            this.setState(() => ({ error: 'Please provide description and amount.' }))
        } else {
            //clear the error
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //perché abbiamo settato l'amount come stringa, così ottengo un numero
                createdAt: this.state.createdAt.valueOf(), //per rappresentarlo in millisecondi, js lavora così
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus //questo feature punta subito il selettore quando si visita la pagina in questo input!
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false} //questo fa si che ogni giorno nel calendario sia selezionabile
                />
                <textarea
                    className="textarea"
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}