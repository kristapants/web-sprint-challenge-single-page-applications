import React from 'react'

export default function OrderConfirmation(props) {
    
    return <div>{props.order.name}
        <br></br>{props.order.size}
        <ul>
            {props.order.toppings.map((value, index) => {
                return <li key={index}>{value}</li>
             })}
        </ul>
        {props.order.additionalInstructions}
    </div>
}