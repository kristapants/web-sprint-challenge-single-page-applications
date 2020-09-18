import React from 'react'

export default function OrderConfirmation(props) {
    
    return <div>{props.order.name}{props.order.size}</div>
}