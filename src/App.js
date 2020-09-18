import React, { useState, useEffect } from 'react'
import { Route, Link, Switch, useHistory } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import schema from './validation/formSchema'
import Home from './components/Home'
import OrderForm from './components/OrderForm'
import OrderConfirmation from './components/OrderConfirmation'

const initialFormValues = {
  name: '',
  size: '',
}
const initialFormErrors = {
  name: '',
  size: '',
}
const initialOrder = {name:'', size:''}
const initialDisabled = true

export default function App() {

  const [order, setOrder] = useState(initialOrder)

  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  const history = useHistory()

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/users', newOrder)
      .then(res => {
        console.log(res)
        setOrder(res.data)
        setFormValues(initialFormValues)
      })
      .catch(err => {
        debugger // eslint-disable-line
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => { // eslint-disable-line
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name,
      size: formValues.size,
    }
    postNewOrder(newOrder)
    history.push('/orderform/orderconfirmation')
  }

  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <div className='App'>
      <nav>
        <h1 className='store-header'>Lambda Eats</h1>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/'>Help</Link>
        </div>
      </nav>

      <Switch>
        <Route path='/orderform/orderconfirmation'>
          <OrderConfirmation 
            order={order}
          />
        </Route>

        <Route path='/orderform'>
          <OrderForm         
            values={formValues}
            change={inputChange} 
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>

        <Route path='/'>
          <Home />
        </Route>
      </Switch>
  </div>
  );
};
