import React from 'react';
import { Link } from 'react-router-dom';

/* 
così va bene ma vediamo la sua soluzione!
const ExpenseListItem = (props) => (<div>
    <div>
        <p>{props.value.description} - {props.value.amount} - {props.value.createdAt}</p>
    </div>
</div>
) */

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`} >
        <h3>{description}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
)



export default ExpenseListItem;

//importare la giusta azione da actions/expenses