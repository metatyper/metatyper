import { ValidatorArgsType, type ValidatorType } from '../metatypes'

/** Validator ensuring value has a non-zero `length`. */
export const NotEmptyValidator = {
    name: 'NotEmpty',
    context: {
        minLength: 1
    },
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) return true

        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

        return !lengthDescriptor || lengthDescriptor.enumerable || lengthDescriptor.value > 0
    }
} as ValidatorType

/** Creates a validator ensuring value length is at least `length`. */
export const MinLengthValidatorBuilder = (minLength: number) =>
    ({
        name: 'MinLength',
        context: { minLength },
        validate: ({ value }: ValidatorArgsType) => {
            if (value == null) return true

            const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

            return (
                !lengthDescriptor ||
                lengthDescriptor.enumerable ||
                lengthDescriptor.value >= minLength
            )
        }
    }) as ValidatorType

/** Creates a validator ensuring value length does not exceed `length`. */
export const MaxLengthValidatorBuilder = (maxLength: number) =>
    ({
        name: 'MaxLength',
        context: { maxLength },
        validate: ({ value }: ValidatorArgsType) => {
            if (value == null) return true

            const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

            return (
                !lengthDescriptor ||
                lengthDescriptor.enumerable ||
                lengthDescriptor.value <= maxLength
            )
        }
    }) as ValidatorType
