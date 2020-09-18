import React from 'react'

export default function OrderForm(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props
    
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Make a Pizza, MF</h2>
            <button id='submitBtn' disabled={disabled}>Submit</button>

            <div>
                <div>{errors.name}</div>

            </div>

            <div>
                <label>Name&nbsp;
                    <input 
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                        placeholder='Name'
                    />
                </label>
                <label>Size
                    <select name='size' value={values.size} onChange={onChange}>
                        <option value=''>---Select Size---</option>
                        <option value='small'>Small - 10"</option>
                        <option value='medium'>Medium - 14"</option>
                        <option value='large'>Large - 20"</option>
                    </select>
                </label>
                <div>
                    <h4>Optional toppings</h4>
                    <label>Pepperoni
                        <input
                            type="checkbox"
                            name='pepperoni'
                            checked={values.pepperoni}
                            onChange={onChange}
                        />
                    </label>

                    <label>Extra cheese
                        <input
                            type="checkbox"
                            name="extraCheese"
                            checked={values.extraCheese}
                            onChange={onChange}
                        />
                    </label>

                    <label>Chicken
                        <input
                            type="checkbox"
                            name="chicken"
                            checked={values.chicken}
                            onChange={onChange}
                        />
                    </label>
                    <label>Anchovies
                        <input
                            type="checkbox"
                            name="anchovies"
                            checked={values.anchovies}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <label>Additional instructions?
                <input 
                        value={values.additionalInstructions}
                        onChange={onChange}
                        name='additionalInstructions'
                        type='text'
                        placeholder='Let us know anything else here. . .'
                    />
                </label>
            </div>
        </form>
    );
}