import { ValidatorArgsType, type ValidatorType } from '../metatypes'

/** Creates a validator enforcing `value >= min`. */
export const MinValidatorBuilder = (min: any) =>
    ({
        name: 'Min',
        context: { min },
        validate: ({ value }: ValidatorArgsType) => {
            if (value == null) {
                return true
            }

            return value >= min
        }
    }) as ValidatorType

/** Creates a validator enforcing `value <= max`. */
export const MaxValidatorBuilder = (max: any) =>
    ({
        name: 'Max',
        context: { max },
        validate: ({ value }: ValidatorArgsType) => {
            if (value == null) {
                return true
            }

            return value <= max
        }
    }) as ValidatorType

/** Creates a validator enforcing `value > greater`. */
export const GreaterValidatorBuilder = (greater: any) =>
    ({
        name: 'Greater',
        context: { greater },
        validate: ({ value }: ValidatorArgsType) => {
            if (value == null) {
                return true
            }

            return value > greater
        }
    }) as ValidatorType

/** Creates a validator enforcing `value < less`. */
export const LessValidatorBuilder = (less: any) =>
    ({
        name: 'Less',
        context: { less },
        validate: ({ value }: ValidatorArgsType) => {
            if (value == null) {
                return true
            }

            return value < less
        }
    }) as ValidatorType
