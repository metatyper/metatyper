import { ValidatorArgsType } from '../metatypes'

/** Validator ensuring value has a non-zero `length`. */
export const NotEmptyValidator = {
    name: 'NotEmpty',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) return true

        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

        return !lengthDescriptor || lengthDescriptor.enumerable || lengthDescriptor.value > 0
    }
}

/** Creates a validator ensuring value length is at least `length`. */
export const MinLengthValidatorBuilder = (length: number) => ({
    name: 'MinLength',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) return true

        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

        return !lengthDescriptor || lengthDescriptor.enumerable || lengthDescriptor.value >= length
    }
})

/** Creates a validator ensuring value length does not exceed `length`. */
export const MaxLengthValidatorBuilder = (length: number) => ({
    name: 'MaxLength',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) return true

        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

        return !lengthDescriptor || lengthDescriptor.enumerable || lengthDescriptor.value <= length
    }
})
