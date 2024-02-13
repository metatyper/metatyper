import { ValidatorArgsType } from '../metatypes'

export const NotEmptyValidator = {
    name: 'NotEmpty',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) return true

        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

        return !lengthDescriptor || lengthDescriptor.enumerable || lengthDescriptor.value > 0
    }
}

export const MinLengthValidatorBuilder = (length: number) => ({
    name: 'MinLength',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) return true

        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

        return !lengthDescriptor || lengthDescriptor.enumerable || lengthDescriptor.value >= length
    }
})

export const MaxLengthValidatorBuilder = (length: number) => ({
    name: 'MaxLength',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) return true

        const lengthDescriptor = Object.getOwnPropertyDescriptor(value, 'length')

        return !lengthDescriptor || lengthDescriptor.enumerable || lengthDescriptor.value <= length
    }
})
