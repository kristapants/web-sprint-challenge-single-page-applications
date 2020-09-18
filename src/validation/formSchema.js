import * as yup from 'yup'

export default yup.object().shape({
    name: yup.string()
        .required('A name is required')
        .min(2, 'Name must be longer.'),
    size: yup.string()
        .required('Your pizza needs a size.'),
    pepperoni: yup.boolean(),
    extraCheese: yup.boolean(),
    chicken: yup.boolean(),
    anchovies: yup.boolean(),
    additionalInstructions: yup.string()
        .optional(),
})
