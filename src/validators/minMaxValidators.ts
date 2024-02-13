import { ValidatorArgsType } from '../metatypes'

export const MinValidatorBuilder = (min: any) => ({
    name: 'Min',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value >= min
    }
})

export const MaxValidatorBuilder = (max: any) => ({
    name: 'Max',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value <= max
    }
})

export const GreaterValidatorBuilder = (greater: any) => ({
    name: 'Greater',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value > greater
    }
})

export const LessValidatorBuilder = (less: any) => ({
    name: 'Less',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value < less
    }
})
