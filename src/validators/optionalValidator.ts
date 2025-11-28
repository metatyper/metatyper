import { ValidatorArgsType, type ValidatorType } from '../metatypes'

/** Validator that rejects `undefined` values. */
export const OptionalValidator = {
    name: 'Optional',
    validate: ({ value }: ValidatorArgsType) => {
        if (value === undefined) {
            return false
        }

        return true
    }
} as ValidatorType
