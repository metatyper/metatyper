import { ValidatorArgsType } from '../metatypes'

/** Creates a validator enforcing `value >= min`. */
export const MinValidatorBuilder = (min: any) => ({
    name: 'Min',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value >= min
    }
})

/** Creates a validator enforcing `value <= max`. */
export const MaxValidatorBuilder = (max: any) => ({
    name: 'Max',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value <= max
    }
})

/** Creates a validator enforcing `value > greater`. */
export const GreaterValidatorBuilder = (greater: any) => ({
    name: 'Greater',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value > greater
    }
})

/** Creates a validator enforcing `value < less`. */
export const LessValidatorBuilder = (less: any) => ({
    name: 'Less',
    validate: ({ value }: ValidatorArgsType) => {
        if (value == null) {
            return true
        }

        return value < less
    }
})
